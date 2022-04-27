import {API, checkData} from '@/API/API';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {check} from 'react-native-permissions';

function useApi<T, D>(defaultValue: T, apiPath: string, axiosData: D) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    (() => {
      setIsLoading(true);
      API.post<any, any, D>(apiPath, axiosData)
        .then(result => {
          if (checkData(result)) {
            setData(result.data.data);
          } else {
            setErrorMessage(result.data.msg);
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
    })();
  }, []);

  return {data, isLoading, isError, errorMessage};
}

export default useApi;