import {
  View,
  ScrollView,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useState} from 'react';
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

export default function Home({navigation}: HomeProps): JSX.Element {
  const [isList, setIsList] = useState(false);
  const {value: isUpload, on: onUpload, off: offUpload} = useBoolean(false);
  const onPressItem = useCallback(item => {
    navigation.navigate('ProductDetail', item);
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Theme.color.whiteGray_F6}}>
      <Header />
      <ScrollView>
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
