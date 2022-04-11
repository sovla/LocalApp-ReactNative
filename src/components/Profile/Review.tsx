import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {ReviewProps} from '@/Types/Components/ProfileTypes';
import {GrayText, Text} from '../Global/text';
import StarIcon from './StarIcon';

const Review: React.FC<ReviewProps> = ({image, name, star, date, review}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const starArray = new Array(5).fill(1);
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.profileView}>
        <Image source={image} style={styles.profileImage} />
      </View>
      <View style={styles.contentView}>
        <View style={styles.infoView}>
          <Text fontSize={`${16 * fontSize}`} medium>
            {name}
          </Text>
          <GrayText fontSize={`${12 * fontSize}`}>{date}</GrayText>
        </View>
        <View style={styles.starView}>
          {starArray.map((item, index) => {
            return (
              <StarIcon
                width={getPixel(10)}
                height={getPixel(10)}
                isEmpty={index + 1 > +star.toFixed()}
              />
            );
          })}
        </View>
        <Text fontSize={`${14 * fontSize}`}>{review}</Text>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  infoView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  contentView: {
    width: getPixel(328 - 48), // 48 이미지 40 - 마진 8
  },
  profileImage: {width: getPixel(40), height: getPixel(40)},
  profileView: {
    width: getPixel(40),
    height: getPixel(40),
    borderRadius: getPixel(15),
    marginRight: getPixel(8),
    overflow: 'hidden',
  },
  reviewContainer: {
    flexDirection: 'row',
    width: getPixel(328),
    marginBottom: getHeightPixel(30),
  },
  starView: {
    flexDirection: 'row',
    marginTop: getHeightPixel(4),
    marginBottom: getHeightPixel(10),
  },
});
