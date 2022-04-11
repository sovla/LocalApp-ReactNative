import {
  View,
  ImageBackground,
  StyleSheet,
  Image,
  ViewStyle,
} from 'react-native';
import React from 'react';
import ProfileBGImage from '@assets/image/profile_bg.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import Header from '@/Components/Profile/Header';
import {Shadow} from 'react-native-shadow-2';
import Line from '@/Components/Global/Line';
import dummy from '@assets/image/dummy.png';
import {BoldText, GrayText, MediumText, Text} from '@/Components/Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import StarIcon from '@assets/image/star.png';
import LikeIcon from '@assets/image/like.png';
import TelIcon from '@assets/image/tel.png';
import joinDateIcon from '@assets/image/join_date.png';
import BagIcon from '@assets/image/bag.png';
import ChatOffIcon from '@assets/image/chat.png';
import MultiStarIcon from '@assets/image/review.png';

export default function ProfileHome() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const name = 'Leandro';
  const stateMessage = 'Love what you have.';
  const star = '4.3';
  const reviewCount = 15;
  const likeCount = 999;
  const hp = '(11) 99999-9999';
  const date = '2020년 09월';

  return (
    <View>
      <ProfileBackground />
      <Header title={t('profileHomeTitle')} />
      <View style={{marginHorizontal: getPixel(16)}}>
        <Shadow distance={10}>
          <View style={styles.whiteBoxView}>
            <View style={styles.whiteBoxTopView}>
              <View style={styles.row}>
                <View style={styles.profileContentView}>
                  <Image source={dummy} style={styles.profileImage} />
                  <View>
                    <BoldText fontSize={`${16 * fontSize}`}>{name}</BoldText>
                    <GrayText fontSize={`${12 * fontSize}`}>
                      {stateMessage}
                    </GrayText>
                  </View>
                </View>
                <View style={styles.starView}>
                  <Image source={StarIcon} style={styles.starImage} />
                  <Text medium fontSize={`${16 * fontSize}`}>
                    {star.toString()}
                  </Text>
                </View>
              </View>
              <View style={styles.sellerView}>
                <View style={styles.row}>
                  <Text fontSize={`${16 * fontSize}`}>
                    {t('profileHomeSellerReviews')}
                  </Text>
                  <MediumText
                    style={styles.reviewCountText}
                    fontSize={`${16 * fontSize}`}>
                    {reviewCount.toString() + ' ' + t('profileHomeCount')}
                  </MediumText>
                </View>
                <View style={styles.likeView}>
                  <Image source={LikeIcon} style={styles.likeImage} />
                  <GrayText fontSize={`${14 * fontSize}`}>
                    {likeCount.toString()}
                  </GrayText>
                </View>
              </View>
              <View style={styles.betweenRow}>
                <View style={styles.telView}>
                  <Image source={TelIcon} style={styles.telImage} />
                  <Text fontSize={`${14 * fontSize}`}>
                    {t('profileHomeHp')}
                  </Text>
                </View>
                <Text fontSize={`${14 * fontSize}`}>{hp}</Text>
              </View>
              <View style={styles.betweenRow}>
                <View style={styles.telView}>
                  <Image source={joinDateIcon} style={styles.telImage} />
                  <Text fontSize={`${14 * fontSize}`}>
                    {t('profileHomeJoinDate')}
                  </Text>
                </View>
                <Text fontSize={`${14 * fontSize}`}>{date}</Text>
              </View>
            </View>
            <Line
              backgroundColor={Theme.color.gray_E9}
              height={1}
              width={getPixel(328)}
            />
            <View style={styles.bottomContainer}>
              <View style={styles.bottomView}>
                <Image source={BagIcon} style={styles.whiteBoxBottomImage} />
                <Text fontSize={`${14 * fontSize}`}>
                  {t('profileHomeSaleProduct')}
                </Text>
              </View>
              <View style={styles.bottomView}>
                <Image
                  source={ChatOffIcon}
                  style={styles.whiteBoxBottomImage}
                />
                <Text fontSize={`${14 * fontSize}`}>
                  {t('profileHomeChat')}
                </Text>
              </View>
              <View style={styles.bottomView}>
                <Image
                  source={MultiStarIcon}
                  style={styles.whiteBoxBottomImage}
                />
                <Text fontSize={`${14 * fontSize}`}>
                  {t('profileHomeSellerReviews')}
                </Text>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    </View>
  );
}
export const ProfileBackground: React.FC<{
  width?: number;
  height?: number;
  style?: ViewStyle;
}> = ({width = getPixel(360), height = getHeightPixel(150), style}) => {
  return (
    <View
      style={[
        styles.headerView,
        style,
        {
          width,
          height,
        },
      ]}>
      <ImageBackground
        style={[styles.headerBackgroundImage, {width, height}]}
        source={ProfileBGImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    height: getHeightPixel(80),
    width: getPixel(328),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  bottomView: {
    width: getPixel(64),
    height: getHeightPixel(64),
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBoxBottomImage: {
    width: getPixel(32),
    height: getPixel(32),
    marginBottom: getHeightPixel(10),
  },
  betweenRow: {flexDirection: 'row', justifyContent: 'space-between'},
  telView: {flexDirection: 'row', alignItems: 'center'},
  telImage: {
    width: getPixel(24),
    height: getPixel(24),
    marginRight: getPixel(6),
  },
  sellerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: getHeightPixel(30),
  },
  reviewCountText: {
    marginLeft: getPixel(10),
    textDecorationLine: 'underline',
  },
  likeView: {
    width: getPixel(57),
    height: getHeightPixel(28),
    borderWidth: 0.6,
    borderColor: Theme.color.blue_B3,
    borderRadius: getPixel(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeImage: {
    width: getPixel(20),
    height: getPixel(20),
  },
  starView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImage: {
    width: getPixel(18),
    height: getPixel(18),
    marginRight: getPixel(3),
  },
  profileContentView: {flexDirection: 'row', alignItems: 'flex-end'},
  profileImage: {
    width: getPixel(46),
    height: getPixel(46),
    marginRight: getPixel(16),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  whiteBoxTopView: {
    paddingHorizontal: getPixel(20),
    paddingVertical: getHeightPixel(20),
  },
  whiteBoxView: {
    width: getPixel(328),
    height: getHeightPixel(323),
    backgroundColor: Theme.color.white,
    borderRadius: getPixel(15),
  },
  headerBackgroundImage: {
    backgroundColor: Theme.color.blue,
  },
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
});
