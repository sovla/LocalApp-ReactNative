import {geoLanguage, refDebounce} from '@/Util/Util';
import axios from 'axios';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

function useGeocoding(region: {latitude: number; longitude: number} | null) {
    const {i18n} = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [location, setLocation] = useState<null | {
        results: Array<any> | undefined;
    }>(null);

    const refTimer = useRef<any>(null);
    const onSearchLocation = useCallback(() => {
        if (region) {
            console.log('onSearchLocation', region);
            setIsLoading(true);
            const config: any = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704&language=${geoLanguage(
                    'br', //i18n.language
                )}&result_type=street_address|political|country`,
                headers: {},
            };
            axios(config)
                .then(function (response) {
                    console.log(response?.data);
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
        refDebounce(refTimer, 50, onSearchLocation);
    }, [region]);
    useEffect(() => {}, [location]);

    let city = '';
    let locationName = '';
    let detail = '';

    if (location !== null && Array.isArray(location.results)) {
        let find = false;
        const length = location.results.length;

        locationName = location.results ? location.results[length - 3].formatted_address : '';
        detail = location !== null ? location.results[1].formatted_address : '';

        for (const result of location.results) {
            if (Array.isArray(result.address_components)) {
                for (const address of result.address_components) {
                    if (Array.isArray(address.types)) {
                        for (const type of address.types) {
                            if (type === 'sublocality_level_1') {
                                city = address.long_name;
                                find = true;
                            }
                            if (find) break;
                        }
                    }
                    if (find) break;
                }
            }
            if (find) break;
        }
    }

    return {location, detail, city, locationName, isLoading};
}

export default useGeocoding;
