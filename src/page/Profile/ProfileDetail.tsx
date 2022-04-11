import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Header from '@/Components/Profile/Header';
import {ProfileBackground} from './ProfileHome';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import EditIcon from '@assets/image/edit_ver.png';
import {getHitSlop} from '@/Util/Util';

export default function ProfileDetail() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={{flex: 1}}>
      <ProfileBackground height={getHeightPixel(200)} style={styles.bgView} />
      <Header title={t('profileDetailTitle')}>
        <TouchableOpacity hitSlop={getHitSlop(5)}>
          <Image source={EditIcon} style={styles.editImage} />
        </TouchableOpacity>
      </Header>
    </View>
  );
}

const styles = StyleSheet.create({
  editImage: {width: getPixel(22), height: getPixel(22)},
  bgView: {
    borderBottomLeftRadius: getPixel(15),
    borderBottomRightRadius: getPixel(15),
  },
});
