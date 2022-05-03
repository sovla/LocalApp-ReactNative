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
interface optionTypes {
  isFirst?: boolean;
  focusRetry?: boolean;
}

function useApi<T, D>(
  defaultValue: T,
  apiPath: string,
  axiosData?: D,
  option?: optionTypes,
) {
  const defaultOption: optionTypes = {
    isFirst: true,
    focusRetry: false,
    ...option,
  };
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isComplete, setisComplete] = useState(false);

  const isFocused = useIsFocused();

  const getData = useCallback(
    async (_data?: any) => {
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
      >(apiPath, {...axiosData, ..._data})
        .then(result => {
          console.log(apiPath + '::::', result);
          if (result.data?.result === 'true') {
            if (result?.data?.data?.data) {
              setData(result.data.data.data);
            } else if (result?.data?.data) {
              setData(result.data.data);
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
          setisComplete(true);
        });
    },
    [axiosData, apiPath, defaultOption?.isFirst],
  );

  useEffect(() => {
    if (
      (defaultOption?.isFirst &&
        isFocused &&
        !isLoading &&
        data === defaultValue) ||
      defaultOption.focusRetry
    ) {
      getData();
    }
  }, [isFocused]);

  return {data, isLoading, isError, errorMessage, getData, isComplete, setData};
}

export default useApi;

export const usePostSend = <D>(apiPath: string, apiData: D) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const PostAPI = useCallback(
    async (
      data?: any,
    ): Promise<{
      result: 'true' | 'false' | null;
      data: any;
      msg: null | string;
    }> => {
      setIsLoading(true);
      const res = await API.post<
        any,
        AxiosResponse<
          {
            result: 'true' | 'false' | null;
            data: any;
            msg: null | string;
          },
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
        return res.data;
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
