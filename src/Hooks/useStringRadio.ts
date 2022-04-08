import {Dispatch, SetStateAction, useState} from 'react';

function useStringRadio(defaultValue?: string): any {
  const [value, setValue] = useState(defaultValue);

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return [value, onChangeText];
}

export default useStringRadio;
