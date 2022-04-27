import {Dispatch, SetStateAction, useCallback, useState} from 'react';

function useObject<T>(defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  const onChangeObject = (key: keyof T, value: any) => {
    setValue(prev => ({...prev, [key]: value}));
  };

  return [value, setValue, onChangeObject] as const;
}

export default useObject;
