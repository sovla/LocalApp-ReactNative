import {geoLanguage} from '@/Util/Util';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

function useGeocoding(region: {latitude: number; longitude: number}) {
  const {i18n} = useTranslation();
  const [timer, setTimer] = useState<any>(0);
  const [location, setLocation] = useState<null | {
    results: Array<any> | undefined;
  }>(null);
  const onSearchLocation = useCallback(() => {
    const config: any = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${region.latitude},${region.longitude}&key=AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704&language=${geoLanguage(
        'br', //i18n.language
      )}&result_type=street_address|political|country`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        if (response.data.status === 'OK') {
          setLocation(response.data);
          console.log(response.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [region]);
  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(async () => {
      try {
        onSearchLocation();
      } catch (e) {
        console.error('error', e);
      }
    }, 1000);
    setTimer(newTimer);
  }, [region]);

  let city = '';
  let locationName = '';
  let detail = '';

  if (location !== null && Array.isArray(location.results)) {
    let find = false;
    const length = location?.results?.length;

    locationName = location?.results ? location.results[length - 3].formatted_address : '';
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

  return {location, detail, city, locationName};
}

export default useGeocoding;
