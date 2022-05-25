import {Dispatch, SetStateAction, useState} from 'react';

function useObject<T>(defaultValue: T): [T, Dispatch<SetStateAction<T>>, <K extends keyof T>(key: K, value: T[K]) => void] {
    const [value, setValue] = useState<T>(defaultValue);

    const onChangeObject = <K extends keyof T>(key: K, value: T[K]) => {
        setValue(prev => ({...prev, [key]: value}));
    };

    return [value, setValue, onChangeObject];
}

export default useObject;
