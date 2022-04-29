import {API} from '@/API/API';
import {useIsFocused} from '@react-navigation/native';
import {Axios, AxiosResponse} from 'axios';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {check, RESULTS} from 'react-native-permissions';
import useBoolean from './useBoolean';

function useApi<T, D>(
  defaultValue: T,
  apiPath: string,
  axiosData?: D,
  isFirst: boolean = true,
) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFirst && isFocused && !isLoading && data === defaultValue) {
      getData();
    }
  }, [isFocused]);

  const getData = useCallback(async () => {
    setIsLoading(true);
    await API.post<
      any,
      AxiosResponse<
        {
          result: 'true' | 'false' | null;
          data: any | T;
          msg: null | string;
        } | null,
        any
      >
    >(apiPath, axiosData)
      .then(result => {
        if (result.data?.result === 'true') {
          if (result?.data?.data?.data) {
            setData(result.data.data.data);
          }
        } else {
          if (result.data?.msg) {
            setErrorMessage(result.data.msg);
          }
          setIsError(true);
        }
      })
      .catch(err => {
        setIsError(true);
        setErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [axiosData, apiPath, isFirst]);

  return {data, isLoading, isError, errorMessage, getData};
}

export default useApi;

export const usePostSend = <T, D>(apiPath: string, apiData: D) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const PostAPI = useCallback(
    async (data?: any) => {
      setIsLoading(true);
      const res = await API.post<
        any,
        AxiosResponse<
          {
            result: 'true' | 'false' | null;
            data: T | any;
            msg: null | string;
          } | null,
          any
        >
      >(apiPath, {...apiData, ...data});

      if (res.data?.result === 'true') {
        setIsLoading(false);
        return res.data.data;
      } else if (res.data?.result === 'false') {
        setIsLoading(false);
        setIsError(true);
        if (res.data.msg) {
          setErrorMessage(res.data.msg);
        }
        return res.data;
      } else {
        setIsLoading(false);
        return null;
      }
    },
    [apiPath, apiData],
  );

  return {
    PostAPI,
    isLoading,
    isError,
    errorMessage,
  };
};
