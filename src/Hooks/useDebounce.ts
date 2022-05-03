import {useEffect, useRef} from 'react';

const useDebounce = (data: any, func: any, wait: number) => {
  const ref = useRef<any | null>(null);

  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
      ref.current = null;
    } else {
      ref.current = setTimeout(() => {
        func();
      }, wait);
    }
  }, [data]);
  return;
};

export default useDebounce;
