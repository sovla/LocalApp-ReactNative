import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {BoldText, GrayText, MediumText} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import SearchIcon from '@assets/image/search.png';
import MyLocationIcon from '@assets/image/my-location.png';

export default function Location({
  setIsModal,
}: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');
  return (
    <View style={{flex: 1, backgroundColor: '#0003'}}>
      <View style={styles.space} />
      <View style={styles.whiteBox}>
        <BoldText fontSize={`${20 * fontSize}`}>{t('locationChange')}</BoldText>

        <View style={{marginTop: getHeightPixel(8)}}>
          <TextInput
            style={[
              styles.textInput,
              {
                fontSize: 11 * fontSize,
              },
            ]}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}>
            {!isFocus && value?.length === 0 && (
              <GrayText fontSize={`${11 * fontSize}`}>
                {t('locationPlaceholder')}
              </GrayText>
            )}
          </TextInput>
          <Image source={SearchIcon} style={styles.searchImage} />
        </View>
        <View style={styles.locationView}>
          <Image source={MyLocationIcon} style={styles.locationImage} />
          <MediumText fontSize={`${12 * fontSize}`}>
            {t('nowLocation')}
          </MediumText>
        </View>
        <View style={styles.line} />
        <BoldText fontSize={`${14 * fontSize}`}>{t('areaUsed')}</BoldText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  locationImage: {
    width: getPixel(13.2),
    height: getPixel(13.2),
  },
  line: {
    backgroundColor: Theme.color.gray,
    height: 0.4,
    marginTop: getHeightPixel(8.7),
  },
  locationView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: getHeightPixel(10),
  },
  space: {
    height: getHeightPixel(230),
  },
  searchImage: {
    position: 'absolute',
    left: getPixel(10),
    top: getHeightPixel(10),
    width: getPixel(15),
    height: getPixel(15),
  },
  textInput: {
    width: getPixel(328),
    height: getHeightPixel(35),
    backgroundColor: Theme.color.gray_F5,
    borderRadius: getPixel(20),
    paddingVertical: getHeightPixel(10),
    paddingLeft: getPixel(31),
    paddingRight: getPixel(10),
    color: Theme.color.darkBlue_0F,
    fontFamily: Theme.fontWeight.medium,
  },
  whiteBox: {
    width: getPixel(360),
    height: getHeightPixel(510),
    backgroundColor: Theme.color.white,
    borderTopLeftRadius: getPixel(20),
    borderTopRightRadius: getPixel(20),
    paddingTop: getHeightPixel(36),
    paddingHorizontal: getHeightPixel(16),
  },
});
