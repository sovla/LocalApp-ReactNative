import {Dispatch, SetStateAction, useState} from 'react';

function useObject<T>(defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);

  const onChangeObject = (key: T, value: any) => {
    try {
      if (value[key]) {
        setValue(prev => ({...prev, [key]: value}));
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  return [value, setValue, onChangeObject];
}

export default useObject;
