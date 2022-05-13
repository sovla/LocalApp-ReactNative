import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

const useGeoLocation = () => {
    // 위치 받아오는 Hook
    const [region, setRegion] = useState({
        latitude: -23.5279688,
        longitude: -46.6365761,
    });
    const [isLoading, setIsLoading] = useState(true);
    useLayoutEffect(() => {
        Geolocation.getCurrentPosition(info => {
            setRegion({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
            });
            setIsLoading(false);
        });

        return () => {};
    }, []);
    return {isLoading, region, setRegion};
};

export default useGeoLocation;

const styles = StyleSheet.create({});
