import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ProfileBackground} from '../Profile/ProfileHome';
import Header from '@/Components/Profile/Header';
import {useTranslation} from 'react-i18next';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import AutoHeightImage from 'react-native-auto-height-image';
import ShareWhiteIcon from '@assets/image/share_white.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import ImageSwiper from '@/Components/Home/ImageSwiper';
import Theme from '@/assets/global/Theme';
import dummy from '@assets/image/dummy.png';
import {
  AlertButton,
  getOpeningTime,
  onScrollSlide,
  viewCountCheck,
} from '@/Util/Util';
import BannerList from '@/Components/Profile/BannerList';
import StarIcon from '@assets/image/star.png';
import LikeIcon from '@assets/image/like.png';
import TelIcon from '@assets/image/tel.png';
import MobileIcon from '@assets/image/mobile.png';
import BagIcon from '@assets/image/handbag.png';
import ChatOffIcon from '@assets/image/chat.png';
import MultiStarIcon from '@assets/image/review.png';
import {Shadow} from 'react-native-shadow-2';
import {BoldText, DarkBlueText, GrayText, Text} from '@/Components/Global/text';
import Line from '@/Components/Global/Line';
import LocationIcon from '@assets/image/location_ver.png';
import {dayList} from '@/assets/global/dummy';
import InstagramIcon from '@assets/image/instagram.png';
import FacebookIcon from '@assets/image/facebook.png';
import WhatsAppIcon from '@assets/image/whatsapp.png';
import DribbleIcon from '@assets/image/dribbble.png';
import {BusinessProfileProps} from '@/Types/Screen/Screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useApi, {usePostSend} from '@/Hooks/useApi';
import {
  BusinessProfileAPi,
  BusinessProfileLikeApi,
} from '@/Types/API/BusinessTypes';

export default function BusinessProfile({
  navigation,
  route: {params},
}: BusinessProfileProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {user} = useAppSelector(state => state);
  const [isShow, setIsShow] = useState<boolean>(false);

  const {data, getData, setData} = useApi<
    BusinessProfileAPi['T'],
    BusinessProfileAPi['D']
  >(
    null,
    'sell_busi_profile.php',
    {
      mt_idx: user.mt_idx as string,
      sell_idx: params.sell_idx,
    },
    {isFirst: false},
  );

  const {PostAPI: sendLike} = usePostSend<BusinessProfileLikeApi>(
    'sell_profile_like.php',
    {
      mt_idx: user.mt_idx as string,
      sell_type: '1',
      sell_idx: params.sell_idx,
    },
  );

  const name = data?.busi_name;
  const stateMessage = data?.busi_memo;
  const star = data?.busi_rate;
  const likeCount = viewCountCheck(data?.busi_like);
  const hp = `(${data?.busi_tel_country}) ${data?.busi_tel_number}`;
  const mobile = `(${data?.busi_cell_country}) ${data?.busi_cell_number}`;
  const location = `${data?.busi_location} ${data?.busi_location_detail}`;
  const openingTime = getOpeningTime(data?.busi_open_list);
  const onPressProductSale = useCallback(() => {
    navigation.navigate('ProfileSellProduct', {
      sell_idx: params.sell_idx,
      sell_type: '1',
    });
  }, []);

  const onPressChatting = useCallback(() => {
    navigation.navigate('ChattingDetail');
  }, []);

  const onPressReviews = useCallback(() => {
    navigation.navigate('ProfileSellerReview', {
      sell_idx: params.sell_idx,
      sell_type: '1',
    });
  }, []);

  const onPressLike = useCallback(() => {
    sendLike().then(res => {
      if (res?.result === 'false' && res?.msg) {
        return AlertButton(res.msg);
      }

      getData();
    });
  }, []);

  useEffect(() => {
    if (!data) getData();
  }, []);
  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView style={{flex: 1}}>
        <ProfileBackground />
        <Header title={t('businessProfileTitle')} isOnPressBack>
          <ShareIcon />
        </Header>
        <View style={{marginHorizontal: getPixel(16)}}>
          <BannerList imageArray={data?.banner_list} />
        </View>
        <View
          style={{
            marginHorizontal: getPixel(16),
            marginVertical: getHeightPixel(16),
          }}>
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
                      {star}
                    </Text>
                  </View>
                </View>
                {/* 주소 */}
                <View style={styles.locationView}>
                  <Image source={LocationIcon} style={styles.locationImage} />
                  <Text
                    fontSize={`${14 * fontSize}`}
                    style={styles.locationText}>
                    {location}
                  </Text>
                </View>
                {/* 전화번호 */}
                <View style={styles.betweenRow}>
                  <View style={styles.telView}>
                    <Image source={TelIcon} style={styles.telImage} />
                    <Text fontSize={`${14 * fontSize}`}>{hp}</Text>
                  </View>
                  <View style={styles.telView}>
                    <Image source={MobileIcon} style={styles.telImage} />
                    <Text fontSize={`${14 * fontSize}`}>{mobile}</Text>
                  </View>
                </View>
                {/* 영업시간 */}
                <View style={styles.openingView}>
                  <DarkBlueText bold fontSize={`${14 * fontSize}`}>
                    {t('businessProfileOpen')}
                  </DarkBlueText>
                  <TouchableOpacity
                    style={{marginLeft: getPixel(10)}}
                    onPress={() => {
                      setIsShow(prev => !prev);
                    }}>
                    {Array.isArray(openingTime) &&
                      openingTime.map((item, index) => {
                        const transItem = item === '' ? ' 휴무일' : ' ' + item;
                        if (!isShow && index > 0) {
                          return;
                        }
                        return (
                          <View
                            style={{
                              flexDirection: index === 0 ? 'row' : 'column',
                            }}>
                            <Text fontSize={`${14 * fontSize}`}>
                              {t(dayList[index]) + transItem}
                            </Text>
                            {index === 0 && (
                              <AutoHeightImage
                                source={
                                  !isShow
                                    ? require('@assets/image/arrow_down.png')
                                    : require('@assets/image/arrow_up.png')
                                }
                                width={getPixel(10)}
                                style={styles.arrowImage}
                              />
                            )}
                          </View>
                        );
                      })}
                  </TouchableOpacity>
                </View>
                <View style={styles.IconView}>
                  <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity>
                      <AutoHeightImage
                        source={DribbleIcon}
                        width={getPixel(20)}
                        style={{marginRight: getPixel(14)}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <AutoHeightImage
                        source={FacebookIcon}
                        width={getPixel(20)}
                        style={{marginRight: getPixel(14)}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <AutoHeightImage
                        source={InstagramIcon}
                        width={getPixel(20)}
                        style={{marginRight: getPixel(14)}}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <AutoHeightImage
                        source={WhatsAppIcon}
                        width={getPixel(20)}
                      />
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={onPressLike}
                    style={styles.likeView}>
                    <Image source={LikeIcon} style={styles.likeImage} />
                    <GrayText fontSize={`${14 * fontSize}`}>
                      {likeCount.toString()}
                    </GrayText>
                  </TouchableOpacity>
                </View>
              </View>

              <Line
                backgroundColor={Theme.color.gray_E9}
                height={1}
                width={getPixel(328)}
              />
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  onPress={onPressProductSale}
                  style={styles.bottomView}>
                  <Image source={BagIcon} style={styles.whiteBoxBottomImage} />
                  <Text fontSize={`${14 * fontSize}`}>
                    {t('profileHomeSaleProduct')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressChatting}
                  style={styles.bottomView}>
                  <Image
                    source={ChatOffIcon}
                    style={styles.whiteBoxBottomImage}
                  />
                  <Text fontSize={`${14 * fontSize}`}>
                    {t('profileHomeChat')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onPressReviews}
                  style={styles.bottomView}>
                  <Image
                    source={MultiStarIcon}
                    style={styles.whiteBoxBottomImage}
                  />
                  <Text fontSize={`${14 * fontSize}`}>
                    {t('profileHomeSellerReviews')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Shadow>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export const ShareIcon: React.FC = () => {
  return (
    <TouchableOpacity>
      <AutoHeightImage source={ShareWhiteIcon} width={getPixel(19)} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  IconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHeightPixel(20),
    alignItems: 'center',
  },
  openingView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: getHeightPixel(15),
  },
  arrowImage: {
    marginLeft: getPixel(10),
    marginTop: getHeightPixel(8),
  },
  locationView: {
    flexDirection: 'row',
    marginTop: getHeightPixel(28),
    marginBottom: getHeightPixel(7),
  },
  locationImage: {
    width: getPixel(24),
    height: getPixel(24),
  },
  locationText: {
    width: getPixel(257),
    marginLeft: getPixel(7),
  },
  dot: {
    height: getPixel(7),
    borderRadius: 200,
    marginRight: getPixel(5),
    backgroundColor: Theme.color.white,
  },
  dotView: {
    position: 'absolute',
    bottom: getHeightPixel(10),
    right: getPixel(10),
    flexDirection: 'row',
  },
  bannerListImage: {
    width: getPixel(328),
    height: getHeightPixel(200),
  },
  bannerListScrollView: {
    width: getPixel(328),
  },
  bannerListView: {
    width: getPixel(328),
    height: getHeightPixel(200),
    borderRadius: getPixel(10),
    overflow: 'hidden',
  },
  bottomContainer: {
    height: getHeightPixel(80),
    width: getPixel(328 - 80),
    marginLeft: getPixel(40),
    marginBottom: getHeightPixel(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  telView: {flexDirection: 'row', alignItems: 'center', width: '50%'},
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
    minHeight: getHeightPixel(323),
    backgroundColor: Theme.color.white,
    borderRadius: getPixel(15),
  },
  headerBackgroundImage: {
    backgroundColor: Theme.color.blue_3D,
  },
  headerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
});
