import {
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {categoryMenu} from '@/assets/global/dummy';
import {CategoryCardProps} from '@/Types/Components/HomeTypes';
import {Text} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import Theme from '@/assets/global/Theme';

const CategoryScroll = () => {
  const ref = useRef<FlatList>(null);
  const [dotList, setDotList] = useState(
    new Array(Math.floor(categoryMenu.length / 5 + 1)).fill(0),
  );
  const [dotNumber, setDotNumber] = useState(0);

  const onScrollSlide = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setDotNumber(Math.round(e.nativeEvent.contentOffset.x / getPixel(328)));
  };

  return (
    <View style={styles.scrollContainer}>
      <FlatList
        ref={ref}
        keyExtractor={item => item.name}
        data={categoryMenu}
        horizontal
        renderItem={({item, index}) => {
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
        }}
        pagingEnabled
        onMomentumScrollEnd={e => onScrollSlide(e)}
        ListFooterComponent={
          <View
            style={{
              width: getPixel((5 - (categoryMenu.length % 5)) * 66),
            }}
          />
        }
      />
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

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardImageView}>
        <Image source={image} style={styles.cardImage} />
      </View>
      <Text fontSize={`${10 * fontSize}`}>{t(name)}</Text>
    </View>
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
    marginHorizontal: getPixel(16),
    width: getPixel(328),
  },
});
