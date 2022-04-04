import {Dispatch, SetStateAction, useState} from 'react';

function useBoolean(defaultValue?: boolean): any {
  const [value, setValue] = useState(!!defaultValue);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue(x => !x);

  return [value, setValue, setTrue, setFalse, toggle];
}

export default useBoolean;
