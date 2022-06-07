import {API} from '@/API/API';
import {useIsFocused} from '@react-navigation/native';
import {AxiosResponse} from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {unstable_batchedUpdates} from 'react-native';
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
    const [data, setData] = useState<T>(defaultValue); // 데이터
    const [isLoading, setIsLoading] = useState(defaultOption.firstLoading); // 로딩
    const [isError, setIsError] = useState(false); //에러
    const [errorMessage, setErrorMessage] = useState(''); // 에러메시지
    const [isComplete, setisComplete] = useState(false); // 처음 성공 여부
    const [page, setPage] = useState(1); // 페이지
    const [totalPage, setTotalPage] = useState(1); // 토탈페이지

    const isFocused = useIsFocused();

    const getData = async (_data?: any) => {
        if (defaultOption.isList && page > totalPage) {
            // isList < 배열 형식으로 데이터가 들어올때 페이지가 넘기면
            if (_data?.page) {
                // 근데 getData에 page 값이 따로 존재하면 return 안시키기
            } else {
                return;
            }
        }
        setIsLoading(true);
        console.log('apiPath :::', apiPath);

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
        >(apiPath, {page: page, ...axiosData, ..._data})
            .then(result => {
                if (result.data?.result === 'true') {
                    if (data !== defaultValue && defaultOption.isList && page !== 1 && (_data?.page ? _data?.page !== 1 : true)) {
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
                    if (defaultOption.isList && !_data?.page) {
                        setPage(prev => prev + 1);
                        setTotalPage(result?.data?.data?.data?.total_page ?? result?.data?.data?.data?.tptal_page);
                    } else if (defaultOption.isList && _data?.page) {
                        setPage(_data.page + 1);
                        setTotalPage(result?.data?.data?.data?.total_page ?? result?.data?.data?.data?.tptal_page);
                    }
                } else {
                    if (result.data?.msg) {
                        setIsError(true);
                        setErrorMessage(result.data.msg);
                    }
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

    const reset = () => {
        unstable_batchedUpdates(() => {
            setPage(1);
            setTotalPage(1);
            setisComplete(false);
            setData(defaultValue);
            setErrorMessage('');
            setIsLoading(false);
            setIsError(false);
        });
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

export const usePostSend = <D, T = any>(apiPath: string, apiData: NonNullable<D>) => {
    // useApi랑 차이
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const PostAPI = useCallback(
        async (
            data?: Partial<D>,
        ): Promise<
            | {
                  result: 'true' | null;
                  data: T | any;
                  msg: null | string;
              }
            | {
                  result: 'false';
                  data: any | T;
                  msg: string;
              }
        > => {
            setIsLoading(true);
            console.log(apiPath + ':::', apiData);
            const res = await API.post<
                any,
                AxiosResponse<
                    | {
                          result: 'true' | null;
                          data: any;
                          msg: null | string;
                      }
                    | {
                          result: 'false';
                          data: any;
                          msg: string;
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
