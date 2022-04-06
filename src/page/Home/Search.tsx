import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import SearchHeader from '@/Components/Home/SearchHeader';
import {BoldText, GrayText, MediumText, Text} from '@/Components/Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {categoryMenu} from '@/assets/global/dummy';
import {CategoryCardProps} from '@/Types/Components/HomeTypes';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

export default function Search(): JSX.Element {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const [popularList, setPopularList] = useState<Array<string>>([
    '자전거',
    '의자',
    '냉장고',
    '노트북',
    '캠핑',
    '가방',
    '에어팟',
    '아이패드',
    '애플워치',
  ]);
  return (
    <View style={styles.mainContainer}>
      <SearchHeader />

      <ScrollView>
        <View style={styles.subContainer}>
          <BoldText fontSize={`${24 * fontSize}`}>{t('searchTitle')}</BoldText>
          <GrayText fontSize={`${14 * fontSize}`}>
            {t('searchSubTitle')}
          </GrayText>
          <View style={styles.categoryView}>
            {categoryMenu.map((item, index) => {
              return (
                <Fragment>
                  <CategoryCard name={item.name} image={item.image} />
                </Fragment>
              );
            })}
          </View>
        </View>
        <View style={styles.popularContainer}>
          <BoldText fontSize={`${16 * fontSize}`}>
            {t('popularSearch')}
          </BoldText>
          <View style={styles.popularListContainer}>
            {popularList.map(item => (
              <TouchableOpacity style={styles.popularListView}>
                <MediumText fontSize={`${12 * fontSize}`} letterSpacing="0px">
                  {item}
                </MediumText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const CategoryCard: React.FC<CategoryCardProps> = ({name, image}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <TouchableOpacity style={styles.categoryCardContainer}>
      <View style={styles.categoryCardView}>
        <AutoHeightImage source={image} width={getPixel(33)} />
      </View>
      <Text fontSize={`${12 * fontSize}`}>{t(name)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCardView: {
    width: getPixel(46),
    height: getPixel(46),
    backgroundColor: Theme.color.whiteGray_F6,
    borderRadius: getPixel(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCardContainer: {
    width: getPixel(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeightPixel(20),
  },
  mainContainer: {flex: 1, backgroundColor: Theme.color.whiteGray_F6},
  subContainer: {
    width: getPixel(360),
    paddingHorizontal: getPixel(20),
    paddingTop: getHeightPixel(26),
    borderBottomLeftRadius: getPixel(20),
    borderBottomRightRadius: getPixel(20),

    backgroundColor: Theme.color.white,
  },
  categoryView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: getPixel(320),
    marginBottom: getHeightPixel(30),
  },
  popularContainer: {
    width: getPixel(328),
    marginHorizontal: getPixel(16),
    marginTop: getHeightPixel(35),
  },
  popularListContainer: {
    marginTop: getHeightPixel(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: getPixel(328),
  },
  popularListView: {
    paddingHorizontal: getPixel(8),
    paddingVertical: getHeightPixel(6),
    backgroundColor: Theme.color.white,
    borderRadius: getPixel(15),
    marginRight: getPixel(8),
    marginBottom: getHeightPixel(8),
  },
});
