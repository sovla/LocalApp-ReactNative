import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import Header from '@/Components/LoginSignUp/Header';
import {Button} from '@/Components/Global/button';
import {productDummy} from '@/assets/global/dummy';
import Input from '@/Components/Global/Input';
import {ProductTagProps} from '@/Types/Screen/Screen';

const ProductTag: React.FC<ProductTagProps> = ({navigation}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [tag, setTag] = useState(productDummy.tag);
  const onPressConfirm = useCallback(() => {
    navigation.navigate('ProductUpdate', {
      tag,
    });
  }, [tag]);

  return (
    <View>
      <Header title={t('tagUpdate')} />
      <View
        style={{
          marginHorizontal: getPixel(16),
        }}>
        <View style={{height: getHeightPixel(30)}} />
        <Input value={tag} onChange={setTag} width={getPixel(328)} />
        <View style={{height: getHeightPixel(30)}} />
        <GrayText fontSize={`${12 * fontSize}`}>
          {'- ' + t('tagGuide1')}
        </GrayText>
        <View style={{height: getHeightPixel(10)}} />
        <GrayText fontSize={`${12 * fontSize}`}>
          {'- ' + t('tagGuide2')}
        </GrayText>
        <View style={{height: getHeightPixel(10)}} />
        <GrayText fontSize={`${12 * fontSize}`}>
          {'- ' + t('tagGuide3')}
        </GrayText>
        <Button
          content={t('confirm')}
          width="328px"
          style={{
            marginTop: getHeightPixel(380),
          }}
          onPress={onPressConfirm}
        />
      </View>
    </View>
  );
};

export default ProductTag;

const styles = StyleSheet.create({
  menuView: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    height: getHeightPixel(70),
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuImage: {
    marginRight: getPixel(10),
  },
  marginRight: {
    marginRight: getPixel(20),
  },
  line: {
    marginHorizontal: getPixel(16),
  },

  touch: {
    width: getPixel(288),
    height: getHeightPixel(50),
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: getPixel(32),
  },
});
