import {API} from '@/API/API';
import {useIsFocused} from '@react-navigation/native';
import {Axios, AxiosResponse} from 'axios';
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {check, RESULTS} from 'react-native-permissions';
import useBoolean from './useBoolean';
interface optionTypes {
    isFirst?: boolean; // isFocused 로 실행 여부
    focusRetry?: boolean; // 해당 페이지에 접근할때마다 실행여부
    firstLoading?: boolean; // 처음에 로딩 true 여부
    isList?: boolean; // 페이징 여부
    listField?: string; // 페이징 리스트
}

function useApi<T, D>(defaultValue: T, apiPath: string, axiosData?: D, option?: optionTypes) {
    const defaultOption: optionTypes = {
        isFirst: true,
        focusRetry: false,
        firstLoading: false,
        isList: false,
        listField: 'list',
        ...option,
    };
    const [data, setData] = useState<T>(defaultValue);
    const [isLoading, setIsLoading] = useState(defaultOption.firstLoading);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isComplete, setisComplete] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const isFocused = useIsFocused();

    const getData = async (_data?: any) => {
        if (defaultOption.isList && page > totalPage) {
            return;
        }
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
        >(apiPath, {...axiosData, ..._data, page})
            .then(result => {
                console.log(apiPath + '::::', result);
                // console.log(
                //   'first if',
                //   data !== defaultValue && defaultOption.isList && page !== 1,
                // );
                if (result.data?.result === 'true') {
                    if (data !== defaultValue && defaultOption.isList && page !== 1) {
                        // 리스트 인경우
                        const {listField} = defaultOption;
                        if (result?.data?.data?.data && typeof defaultOption?.listField === 'string' && listField && listField in data && listField in result.data.data.data) {
                            setData((prev: any) => {
                                if (prev)
                                    return {
                                        ...prev,
                                        [listField]: [...prev[listField], ...result.data?.data?.data[listField]],
                                    };
                            });
                        } else if (result?.data?.data) {
                            setData(result.data.data);
                        }
                    } else {
                        if (result?.data?.data?.data) {
                            setData(result.data.data.data);
                        } else if (result?.data?.data) {
                            setData(result.data.data);
                        }
                    }
                    if (defaultOption.isList) {
                        setPage(prev => prev + 1);
                        setTotalPage(result?.data?.data?.data?.total_page);
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
    };

    useEffect(() => {
        if ((defaultOption?.isFirst && isFocused && data === defaultValue) || (defaultOption.focusRetry && isFocused)) {
            getData();
        }
    }, [isFocused]);

    const reset = async () => {
        await setPage(1);
        await setTotalPage(1);
        await setisComplete(false);
        await setData(defaultValue);
        await setErrorMessage('');
        await setIsLoading(false);
        await setIsError(false);
    };

    return {
        data,
        isLoading,
        isError,
        errorMessage,
        getData,
        isComplete,
        setData,
        reset,
    };
}

export default useApi;

export const usePostSend = <D>(apiPath: string, apiData: NonNullable<D>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const PostAPI = useCallback(
        async (
            data?: Partial<D>,
        ): Promise<{
            result: 'true' | 'false' | null;
            data: any;
            msg: null | string;
        }> => {
            setIsLoading(true);
            console.log(apiPath + ':::', apiData);
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
                return res.data.data as any;
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
