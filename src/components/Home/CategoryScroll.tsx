import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {categoryMenu} from '@/assets/global/dummy';
import {CategoryCardProps} from '@/Types/Components/HomeTypes';
import {Text} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import Theme from '@/assets/global/Theme';
import {onScrollSlide} from '@/Util/Util';

const CategoryScroll = () => {
  const ref = useRef<ScrollView>(null);
  const [dotList, setDotList] = useState<Array<number>>(
    new Array(Math.floor(categoryMenu.length / 5 + 1)).fill(0),
  );
  const [dotNumber, setDotNumber] = useState<number>(0);

  return (
    <View style={styles.scrollContainer}>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        onMomentumScrollEnd={e => onScrollSlide(e, setDotNumber)}>
        {categoryMenu.map((item, index) => {
          return (
            <>
              <CategoryCard name={item.name} image={item.image} />
              <View
                style={{
                  marginRight: getPixel((index + 1) % 5 === 0 ? 0 : 2), // 카드사이 2px  마진
                }}
              />
            </>
          );
        })}
        <View
          style={{
            width: getPixel((5 - (categoryMenu.length % 5)) * 66),
          }}
        />
      </ScrollView>
      <View style={styles.dotContainer}>
        {dotList.map((item, index) => {
          return <Dot isOn={dotNumber === index} />;
        })}
      </View>
    </View>
  );
};

const CategoryCard: React.FC<CategoryCardProps> = ({name, image}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const navigation = useAppNavigation();

  const onPressItem = useCallback(() => {
    navigation.navigate('Search', {
      category: name,
    });
  }, []);

  return (
    <TouchableOpacity onPress={onPressItem} style={styles.cardContainer}>
      <View style={styles.cardImageView}>
        <Image source={image} style={styles.cardImage} />
      </View>
      <Text fontSize={`${10 * fontSize}`}>{t(name)}</Text>
    </TouchableOpacity>
  );
};

const Dot: React.FC<{isOn: boolean}> = ({isOn}) => {
  return (
    <View
      style={{
        width: getPixel(7),
        height: getPixel(7),
        borderColor: Theme.color.gray,
        borderWidth: getPixel(1.5),
        borderRadius: 100,
        backgroundColor: isOn ? Theme.color.gray : Theme.color.white,
        marginRight: getPixel(5),
      }}
    />
  );
};
export default CategoryScroll;

const styles = StyleSheet.create({
  dotContainer: {
    marginTop: getHeightPixel(20),
    width: getPixel(328),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageView: {
    width: getPixel(46),
    height: getPixel(46),
    marginTop: getHeightPixel(9),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.color.white,
    borderRadius: 100,
  },
  cardImage: {width: getPixel(25), height: getPixel(25)},
  cardContainer: {
    width: getPixel(64),
    height: 'auto',
    minHeight: getHeightPixel(83),
    alignItems: 'center',
  },
  scrollContainer: {
    marginTop: getHeightPixel(20),
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
});
