import {geoLanguage, refDebounce} from '@/Util/Util';
import axios, {AxiosRequestConfig} from 'axios';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

function useGeocoding(region: {latitude: number; longitude: number} | null) {
    const {i18n} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<null | {
        results: {
            address_components: {
                long_name: string;
                short_name: string;
                types: string[];
            }[];
            formatted_address: string;
            geometry: {
                location: {
                    lat: number;
                    lng: number;
                };
            };
            place_id: string;
            types: string[];
        }[];
    }>(null);

    const refTimer = useRef<any>(null);
    const onSearchLocation = useCallback(() => {
        if (region) {
            console.log('onSearchLocation', region);
            setIsLoading(true);
            const config: any = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/geocode/json`,
                params: {
                    latlng: `${region.latitude},${region.longitude}`,
                    key: 'AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704',
                    language: geoLanguage(
                        'kr', //i18n.language
                    ),
                    result_type: '',
                },
                headers: {},
            };
            axios(config)
                .then(function (response) {
                    console.log('geocoder Revers :::', response?.data);
                    // return;
                    if (response.data.status === 'OK') {
                        setLocation(response.data);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(() => setIsLoading(false));
        }
    }, [region]);
    useEffect(() => {
        refDebounce(refTimer, 100, onSearchLocation);
    }, [region]);
    useEffect(() => {}, [location]);

    let city = '';
    let locationName = '';
    let detail = '';

    if (location !== null && Array.isArray(location.results)) {
        interface locationDataKey {
            route: string;
            sublocality_level_1: string;
            administrative_area_level_4: string;
            administrative_area_level_3: string;
            administrative_area_level_2: string;
            administrative_area_level_1: string;
            country: string;
            locality: string;
            sublocality: string;
            sublocality_level_2: string;
            sublocality_level_3: string;
        }

        const findItemList: Array<keyof locationDataKey> = [
            'route',
            'sublocality_level_1',
            'administrative_area_level_4',
            'administrative_area_level_3',
            'administrative_area_level_2',
            'administrative_area_level_1',
            'country',
            'locality',
            'sublocality',
            'sublocality_level_2',
            'sublocality_level_3',
        ];
        const locationData: locationDataKey = {
            route: '',
            sublocality_level_1: '',
            administrative_area_level_4: '',
            administrative_area_level_3: '',
            administrative_area_level_2: '',
            administrative_area_level_1: '',
            country: '',
            locality: '',
            sublocality: '',
            sublocality_level_2: '',
            sublocality_level_3: '',
        };

        for (const result of location.results) {
            for (const address of result.address_components) {
                for (const type of address.types) {
                    if (findItemList.find(v => type === v)) {
                        locationData[type as keyof locationDataKey] = type !== 'administrative_area_level_1' ? address.long_name + ' ' : address.short_name;
                    }
                }
            }
        }
        locationName = locationData.sublocality_level_1 + locationData.administrative_area_level_2 + locationData.administrative_area_level_1 + locationData.country;
        detail = locationData.route + locationData.sublocality_level_1 + locationData.administrative_area_level_2 + locationData.administrative_area_level_1;
        city = locationData?.sublocality_level_1?.length > 0 ? locationData.sublocality_level_1 : locationData.locality;
        console.log(locationData);
    }

    return {location, detail, city, locationName, isLoading};
}

export default useGeocoding;

export async function getReverseGeoCoding(region: {latitude: number; longitude: number}) {
    const config: AxiosRequestConfig = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json`,
        params: {
            latlng: `${region.latitude},${region.longitude}`,
            key: 'AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704',
            language: geoLanguage(
                'kr', //i18n.language
            ),
            result_type: 'street_address',
        },
        headers: {},
    };
    const location = await axios(config)
        .then(function (response) {
            console.log('geocoder Revers :::', response?.data);
            // return;
            if (response.data.status === 'OK') {
                return response.data;
            }
        })
        .catch(function (error) {
            console.log(error);
        });

    let city = '';
    let locationName = '';
    let detail = '';

    if (location !== null && Array.isArray(location.results)) {
        type locationDataKey = 'route' | 'sublocality_level_1' | 'administrative_area_level_2' | 'administrative_area_level_1' | 'country';
        const findItemList: locationDataKey[] = ['route', 'sublocality_level_1', 'administrative_area_level_2', 'administrative_area_level_1', 'country'];
        const locationData = {
            route: '',
            sublocality_level_1: '',
            administrative_area_level_2: '',
            administrative_area_level_1: '',
            country: '',
        };

        for (const result of location.results) {
            for (const address of result.address_components) {
                for (const type of address.types) {
                    if (findItemList.find(v => type === v)) {
                        locationData[type as locationDataKey] = type !== 'administrative_area_level_1' ? address.long_name + ' ' : address.short_name;
                    }
                }
            }
        }
        locationName = locationData.sublocality_level_1 + locationData.administrative_area_level_2 + locationData.administrative_area_level_1 + locationData.country;
        detail = locationData.route + locationData.sublocality_level_1 + locationData.administrative_area_level_2 + locationData.administrative_area_level_1;
        city = locationData.sublocality_level_1;
    }
    return {
        city,
        detail,
        locationName,
    };
}
