import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

const useGeoLocation = (
    initValue?:
        | {
              latitude: number;
              longitude: number;
          }
        | undefined,
) => {
    // 위치 받아오는 Hook
    // initValue가 있다면 해당 값을 넣고 없다면
    // geolocation 에서 현재 위치값으로
    const [region, setRegion] = useState(
        initValue ?? {
            latitude: -23.5279688,
            longitude: -46.6365761,
        },
    );
    const [isLoading, setIsLoading] = useState(true);
    useLayoutEffect(() => {
        if (!initValue)
            Geolocation.getCurrentPosition(info => {
                setRegion({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                });
                setIsLoading(false);
            });

        if (initValue) {
            setIsLoading(false);
        }

        return () => {};
    }, []);
    return {isLoading, region, setRegion};
};

export default useGeoLocation;

const styles = StyleSheet.create({});
