import {API, checkData} from '@/API/API';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {check} from 'react-native-permissions';

function useApi<T>(defaultValue: T, apiPath: string) {
  const [data, setData] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    (() => {
      setIsLoading(true);
      API.post(apiPath)
        .then(result => {
          if (checkData(result)) {
            setData(result.data.data);
          } else {
            setErrorMessage(result.data);
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
