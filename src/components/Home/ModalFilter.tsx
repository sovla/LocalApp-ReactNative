import {
  Animated,
  Easing,
  Image,
  PanResponder,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {MediumText} from '@/Components/Global/text';
import Line from '@/Components/Global/Line';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';

import CloseBlackIcon from '@assets/image/close_black.png';
import {ModalFilterProps, ProductState} from '@/Types/Components/HomeTypes';
import {CheckBox} from '../Global/button';

const ModalFilter: React.FC<ModalFilterProps> = ({onClose}) => {
  const [selectFilter, setSelectFilter] = useState<string>(
    'searchModalSortItem1',
  );
  const [productState, setProductState] = useState<ProductState>({
    newProduct: false,
    Reaper: false,
    used: false,
    forParts: false,
  });

  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const xPosition = useRef(new Animated.Value(getPixel(310))).current;

  const menu = [
    'searchModalSortItem1',
    'searchModalSortItem2',
    'searchModalSortItem3',
    'searchModalSortItem4',
  ];
  const menu1: {
    text: string;
    name: keyof ProductState;
  }[] = [
    {
      text: 'searchModalProductState1',
      name: 'newProduct',
    },
    {
      text: 'searchModalProductState2',
      name: 'Reaper',
    },
    {
      text: 'searchModalProductState3',
      name: 'used',
    },
    {
      text: 'searchModalProductState4',
      name: 'forParts',
    },
  ];

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
      },
    ]),

    onPanResponderRelease: (e, g) => {
      if (g.dx > 150) {
        pan.setValue({
          x: getPixel(310),
          y: 0,
        });

        setTimeout(() => {
          onClose();
        }, 5);
      } else {
        Animated.spring(
          pan, // Auto-multiplexed
          {
            toValue: {x: 0, y: 0},
            useNativeDriver: true,
          }, // Back to zero
        ).start();
      }
    },
  });

  useEffect(() => {
    Animated.timing(xPosition, {
      toValue: 0,
      duration: 250,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.dim}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.animatedContainer,
          {
            transform: [{translateX: xPosition}],
          },
          pan.getTranslateTransform(),
        ]}>
        <View style={styles.subContainer}>
          <View style={styles.titleView}>
            <MediumText fontSize={`${20 * fontSize}`}>
              {t('searchModalFilter')}
            </MediumText>
            <TouchableOpacity onPress={onClose}>
              <Image source={CloseBlackIcon} style={styles.titleCloseImage} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: getHeightPixel(40),
            }}>
            <MediumText fontSize={`${18 * fontSize}`}>
              {t('searchModalsort')}
            </MediumText>
            {Array.isArray(menu) &&
              menu.map(v => {
                return (
                  <CheckBox
                    key={v + 'CheckBox'}
                    setIsOn={() => {
                      setSelectFilter(v);
                    }}
                    isOn={selectFilter === v}
                    text={t(v)}
                  />
                );
              })}
          </View>
          <Line backgroundColor={Theme.color.gray} style={styles.lineMargin} />
          <View>
            <MediumText fontSize={`${18 * fontSize}`}>
              {t('searchModalPriceRange')}
            </MediumText>
            <View style={styles.priceText}>
              <TextInput
                keyboardType="numeric"
                placeholder="0"
                style={[
                  styles.priceTextInput,
                  {
                    fontSize: fontSize * 14,
                  },
                ]}
                placeholderTextColor={Theme.color.gray}
              />
              <MediumText fontSize={`${16 * fontSize}`}>~</MediumText>
              <TextInput
                keyboardType="numeric"
                placeholder={t('searchModalTextInputPlaceHolder')}
                style={[
                  styles.priceTextInput,
                  {
                    fontSize: fontSize * 14,
                  },
                ]}
                placeholderTextColor={Theme.color.gray}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: getHeightPixel(40),
            }}>
            <MediumText fontSize={`${18 * fontSize}`}>
              {t('searchModalProductState')}
            </MediumText>
            <View style={styles.checkboxView}>
              {menu1.map(item => {
                return (
                  <View
                    key={item.name}
                    style={{
                      width: getPixel(100),
                    }}>
                    <CheckBox
                      setIsOn={() => {
                        setProductState(p => ({
                          ...p,
                          [item.name]: !p[item.name],
                        }));
                      }}
                      isOn={productState[item.name]}
                      text={t(item.text)}
                      isBox
                    />
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default ModalFilter;

const styles = StyleSheet.create({
  checkboxView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  priceText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceTextInput: {
    width: getPixel(110),
    height: getHeightPixel(40),
    color: Theme.color.black,
    paddingHorizontal: getPixel(10),
    borderBottomColor: Theme.color.gray,
    borderBottomWidth: 0.4,
  },
  lineMargin: {
    marginVertical: getHeightPixel(40),
  },
  dim: {
    backgroundColor: '#0007',
    flex: 1,
  },
  animatedContainer: {
    position: 'absolute',
    right: 0,
    width: getPixel(310),
    height: getHeightPixel(740),
    backgroundColor: Theme.color.white,
    borderTopLeftRadius: getPixel(20),
  },
  subContainer: {
    marginLeft: getPixel(30),
    marginRight: getPixel(16),
    width: getPixel(310 - 46),
  },
  titleCloseImage: {width: getPixel(15), height: getPixel(15)},

  titleView: {
    marginTop: getHeightPixel(47),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});