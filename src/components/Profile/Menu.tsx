import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {Text} from '../Global/text';
import {MenuProps} from '@/Types/Components/ProfileTypes';

const Menu: React.FC<MenuProps> = ({menuList, selectMenu, setSelectMenu}) => {
  return (
    <View
      style={{
        width: getPixel(360),
        height: getHeightPixel(50),
        flexDirection: 'row',
      }}>
      {menuList.map(item => {
        return (
          <TouchableOpacity
            onPress={() => {
              setSelectMenu(item);
            }}
            style={{
              width: getPixel(360 / menuList.length),
              borderBottomColor:
                selectMenu === item ? Theme.color.blue_3D : Theme.color.gray,
              borderBottomWidth: selectMenu === item ? 2 : 1,
              height: getHeightPixel(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              color={
                selectMenu === item ? Theme.color.blue_3D : Theme.color.gray
              }>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Menu;
