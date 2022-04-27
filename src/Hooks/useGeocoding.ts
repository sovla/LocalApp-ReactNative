import {geoLanguage} from '@/Util/Util';
import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

function useGeocoding(region: {latitude: number; longitude: number}) {
  const {i18n} = useTranslation();
  const [timer, setTimer] = useState<any>(0);
  const [location, setLocation] = useState(null);
  const onSearchLocation = useCallback(() => {
    const config: any = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
        region.latitude
      },${
        region.longitude
      }&key=AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704&language=${geoLanguage(
        i18n.language,
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
  const length = location?.results?.length;

  const locationName =
    location !== null ? location.results[length - 2].formatted_address : '';
  const detail = location !== null ? location.results[0].formatted_address : '';
  let city = '';

  if (location !== null && Array.isArray(location.results)) {
    let find = false;
    for (const result of location.results) {
      if (Array.isArray(result.address_components)) {
        for (const address of result.address_components) {
          if (Array.isArray(address.types)) {
            for (const type of address.types) {
              if (type === 'administrative_area_level_1') {
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
