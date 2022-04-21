import {
  FlatList,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/LoginSignUp/Header';
import Line from '@/Components/Global/Line';
import LocationGrayIcon from '@assets/image/location_gray.png';
import MyLocationIcon from '@assets/image/my_location.png';
import {useCallback} from 'react';
import axios from 'axios';
import {useState} from 'react';

const ProductLocation = () => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [locationList, setLocationList] = useState<any>([]);
  const onSubmit = useCallback(
    (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      const config: any = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.nativeEvent.text}&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704`,
        headers: {},
      };
      axios(config)
        .then(function (response) {
          if (response.data.status === 'OK') {
            setLocationList(response.data.predictions);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    [],
  );
  const onPress = useCallback(main_text => {
    const config: any = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${main_text}&inputtype=textquery&locationbias=circle%3A2000%4047.6918452%2C-122.2226413&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Header title={t('tradingLocationUpdate')} />
      <FlatList
        data={locationList}
        ListHeaderComponent={
          <>
            <View style={styles.headerView}>
              {/* <GooglePlacesAutocomplete
                placeholder="Search"
                debounce={2000}
                onFail={v => console.log(v)}
                styles={{
                  textInput: {
                    color: Theme.color.black,
                  },
                }}
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
              
                query={{
                  key: 'AIzaSyAbfTo68JkJSdEi9emDHyMfGl7vxjYD704',
                  language: 'en',
                }}
              /> */}
              <Text
                medium
                fontSize={`${20 * fontSize}`}
                style={styles.headerText}>
                {t('locationUpdateGuide1')}
              </Text>
              <View>
                <TextInput
                  onSubmitEditing={onSubmit}
                  style={[
                    styles.textInput,
                    {
                      fontSize: fontSize * 16,
                    },
                  ]}
                  placeholder="Run Tres Rios"
                  placeholderTextColor={Theme.color.gray_BB}
                />
              </View>
              <TouchableOpacity style={styles.headerLocationTouch}>
                <AutoHeightImage source={MyLocationIcon} width={getPixel(20)} />
                <Text fontSize={`${14 * fontSize}`}>{t('myLocation')}</Text>
              </TouchableOpacity>
            </View>
            <Line height={getHeightPixel(10)} />
          </>
        }
        renderItem={({item, index}) => {
          return (
            <LocationSelect
              onPress={() => onPress(item.structured_formatting.main_text)}
              locationTitle={item.structured_formatting.main_text}
              locationSubTitle={item.structured_formatting.secondary_text}
            />
          );
        }}
        ListFooterComponent={
          <View
            style={{
              height: getHeightPixel(110),
            }}
          />
        }
      />
    </View>
  );
};

export default ProductLocation;

const LocationSelect: React.FC<{
  onPress?: () => void;
  locationTitle: string;
  locationSubTitle: string;
}> = ({locationTitle, locationSubTitle, onPress}) => {
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.locationTouch}>
        <AutoHeightImage
          source={LocationGrayIcon}
          width={getPixel(14)}
          style={{
            marginTop: getHeightPixel(5),
          }}
        />
        <View
          style={{
            marginLeft: getPixel(16),
          }}>
          <Text fontSize={`${16 * fontSize}`}>{locationTitle}</Text>
          <GrayText fontSize={`${12 * fontSize}`}>{locationSubTitle}</GrayText>
        </View>
      </TouchableOpacity>
      <Line isGray />
    </>
  );
};

const styles = StyleSheet.create({
  headerText: {
    marginTop: getHeightPixel(30),
    marginBottom: getHeightPixel(20),
  },
  locationTouch: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    paddingVertical: getHeightPixel(20),
    flexDirection: 'row',
    paddingTop: getHeightPixel(14),
    alignItems: 'flex-start',
  },
  headerView: {
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
  textInput: {
    width: getPixel(328),
    height: getHeightPixel(40),
    backgroundColor: Theme.color.gray_F1,
    borderRadius: getPixel(4),
    color: Theme.color.black,
  },
  headerLocationTouch: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: getHeightPixel(20),
  },
  tierImageView: {
    position: 'absolute',
    bottom: getHeightPixel(0),
    right: getPixel(5),
    width: getPixel(60),
    height: getHeightPixel(60),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  tierImage: {
    width: getPixel(60),
    height: getHeightPixel(67.8),
  },
  boxContainer: {
    marginHorizontal: getPixel(16),
    marginBottom: getHeightPixel(16),
  },
  contentText: {
    width: getPixel(221),
  },
  boxView: {
    width: getPixel(328),
    height: getHeightPixel(100),
    borderRadius: getPixel(10),
    paddingTop: getHeightPixel(16),
    paddingLeft: getPixel(18),
  },
});
