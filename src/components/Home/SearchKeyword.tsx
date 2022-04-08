import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {MediumText, Text} from '@/Components/Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import Line from '@/Components/Global/Line';
import BellIcon from '@assets/image/bell.png';
import filterIcon from '@assets/image/filter.png';
import {SearchKeywordProps} from '@/Types/Components/HomeTypes';

const SearchKeyword: React.FC<SearchKeywordProps> = ({
  onPressFilter,
  onPressKeyword,
}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <>
      <View style={styles.searchMainContainer}>
        <TouchableOpacity style={styles.rowView} onPress={onPressKeyword}>
          <Image source={BellIcon} style={styles.bellImage} />
          <View>
            <MediumText
              fontSize={`${14 * fontSize}`}
              letterSpacing={`-${getPixel(0.35)}px`}>
              {t('searchKeyword')}
            </MediumText>
            <View style={styles.keywordAbsoluteView}>
              <Line
                width={getPixel(80)}
                height={7}
                backgroundColor={Theme.color.aqua_04}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressFilter} style={styles.rowView}>
          <Image source={filterIcon} style={styles.filterImage} />
          <Text fontSize={`${14 * fontSize}`}>{t('searchFilter')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default SearchKeyword;

const styles = StyleSheet.create({
  filterImage: {
    width: getPixel(16.5),
    height: getPixel(16.5),
    marginRight: getPixel(6.5),
  },
  keywordAbsoluteView: {
    position: 'absolute',
    bottom: -2,
    zIndex: -10,
  },
  bellImage: {
    width: getPixel(18.5),
    height: getPixel(21.5),
    marginRight: getPixel(8.5),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: getPixel(360),
    height: getHeightPixel(63),
    paddingHorizontal: getPixel(16),
    backgroundColor: Theme.color.white,
  },
});
