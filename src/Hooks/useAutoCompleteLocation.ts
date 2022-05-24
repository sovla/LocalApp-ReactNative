import {StyleSheet} from 'react-native';
import {useCallback, useLayoutEffect, useRef, useState} from 'react';
import axios from 'axios';
import {useAppSelector} from './CustomHook';
import useDebounce from './useDebounce';

const useAutoCompleteLocation = (initValue: string, params?: any | undefined) => {
    const {token} = useAppSelector(state => state.global.data);
    const [text, setText] = useState(initValue);
    const [locationList, setLocationList] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const refDebounce = useRef<NodeJS.Timeout | null>(null);

    const googleApiHandle = useCallback(() => {
        const config: any = {
            method: 'get',
            url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704&sessionToken=${token}`,
            headers: {},
            params: params,
        };
        setIsLoading(true);
        axios(config)
            .then(function (response) {
                console.log(response.data);

                if (response.data.status === 'OK') {
                    setLocationList(response.data.predictions);
                } else if (response.data.status === 'ZERO_RESULTS') {
                    setLocationList([]);
                    setIsError(true);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [text, token]);

    const debounce = useDebounce(
        text,
        () => {
            googleApiHandle();
        },
        50,
    );

    return {isLoading, setText, text, locationList, setLocationList, isError};
};

export default useAutoCompleteLocation;

const styles = StyleSheet.create({});
