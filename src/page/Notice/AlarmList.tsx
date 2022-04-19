import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import useBoolean from '@/Hooks/useBoolean';
import AutoHeightImage from 'react-native-auto-height-image';

import Header from '@/Components/Profile/Header';
import EditBlackIcon from '@assets/image/edit_black.png';
import TrashBlackIcon from '@assets/image/trash_black.png';
import Menu from '@/Components/Profile/Menu';
import Product from '@/Components/Home/Product';
import AlarmContent from '@/Components/Notice/AlarmContent';
import EditIcon from '@assets/image/edit.png';
import {AlarmListProps} from '@/Types/Screen/Screen';
import {useIsFocused} from '@react-navigation/native';

export default function AlarmList({route: {params}}: AlarmListProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();
  const isFocused = useIsFocused();

  const [selectMenu, setSelectMenu] = useState<any>(t('keywordAlarm'));
  const [list, setList] = useState([1, 2, 3, 4, 5]);
  const {value: isDelete, toggle: toggleIsDelete} = useBoolean(false);
  const onPressDelete = useCallback(() => {
    toggleIsDelete();
  }, []);

  const onPressAlarm = useCallback(() => {
    navigation.navigate('AlarmDetail');
  }, []);
  const onPressEditButton = useCallback(() => {
    navigation.navigate('KeywordAlarm');
  }, []);
  useEffect(() => {
    if (params?.menu) setSelectMenu(t(params.menu));
  }, [isFocused]);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity onPress={onPressEditButton} style={styles.editTouch}>
        <Image source={EditIcon} style={styles.editImage} />
      </TouchableOpacity>
      <Header isBlack title={t('AlarmListTitle')} isBack>
        <View
          style={{
            flexDirection: 'row',
          }}>
          {selectMenu === t('keywordAlarm') && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('KeywordAlarm');
              }}
              style={{marginRight: getPixel(20)}}>
              <AutoHeightImage source={EditBlackIcon} width={getPixel(18)} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={onPressDelete}>
            <AutoHeightImage source={TrashBlackIcon} width={getPixel(18)} />
          </TouchableOpacity>
        </View>
      </Header>
      <Menu
        menuList={[t('keywordAlarm'), t('alarm')]}
        selectMenu={selectMenu}
        setSelectMenu={setSelectMenu}
      />

      <FlatList
        data={list}
        renderItem={({item, index}) => {
          return selectMenu === t('keywordAlarm') ? (
            <Product isList />
          ) : (
            <AlarmContent
              title="Paulo 고객님, 비매너 사유로 서비스 이용이 제한되었습니다."
              date="5시간 전"
              isDelete={isDelete}
              onPress={onPressAlarm}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  editTouch: {
    position: 'absolute',
    bottom: getHeightPixel(25),
    right: getPixel(16),
    zIndex: 100,
  },
  editImage: {width: getPixel(70), height: getPixel(70)},
});
