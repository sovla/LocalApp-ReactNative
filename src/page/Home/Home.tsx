import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import React, {useCallback, useLayoutEffect, useState} from 'react';
import Header from '@/Components/Home/Header';
import CategoryScroll from '@/Components/Home/CategoryScroll';
import HomeList from '@/Components/Home/HomeList';
import Theme from '@/assets/global/Theme';
import Footer from '@/Components/Home/Footer';
import Location from '@/Components/Modal/Location';
import ProductList from '@/Components/Home/ProductList';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import AutoHeightImage from 'react-native-auto-height-image';
import useBoolean from '@/Hooks/useBoolean';
import UploadModal from '@/Components/Home/UploadModal';
import {useTranslation} from 'react-i18next';
import {HomeProps} from '@/Types/Screen/Screen';
import ModalPopup from '@/Components/Home/ModalPopup';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home({navigation}: HomeProps): JSX.Element {
  const [isList, setIsList] = useState(false);

  const {value: isUpload, on: onUpload, off: offUpload} = useBoolean(false);
  const {value: isPopup, on: onIsPopup, off: offIsPopup} = useBoolean(false);
  const {value: isChange, on: onIsChange, off: offIsChange} = useBoolean(false);
  const isFocused = useIsFocused();
  useLayoutEffect(() => {
    AsyncStorage.getItem('isPopup').then(result => {
      if (result === 'N') {
        onIsPopup();
      }
    });
  }, []);

  const onPressItem = useCallback(item => {
    navigation.navigate('ProductDetail', item);
  }, []);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (event.nativeEvent.contentOffset.y > getHeightPixel(160)) {
        onIsChange();
      } else {
        offIsChange();
      }
    },
    [],
  );

  return (
    <View style={{flex: 1, backgroundColor: Theme.color.whiteGray_F6}}>
      <Header isChange={isChange} />
      <ScrollView onScroll={onScroll}>
        <CategoryScroll key="CategoryScroll" />
        <HomeList
          key="HomeList"
          location="Bom Retiro"
          isList={isList}
          setIsList={setIsList}
        />

        <ProductList
          isList={isList}
          list={[1, 2, 3, 4, 5]}
          onPressItem={onPressItem}
        />
      </ScrollView>

      <TouchableOpacity onPress={onUpload} style={styles.uploadTouch}>
        {!isUpload && (
          <AutoHeightImage
            source={require('@assets/image/upload_blue.png')}
            width={getPixel(70)}
          />
        )}
      </TouchableOpacity>
      <Footer menu="home" />
      {isUpload && (
        <Modal transparent visible>
          <UploadModal onClose={offUpload} />
        </Modal>
      )}
      {isPopup && <ModalPopup onClose={offIsPopup} />}
    </View>
  );
}

const styles = StyleSheet.create({
  uploadTouch: {
    position: 'absolute',
    right: getPixel(16),
    bottom: getHeightPixel(60),
  },
});
