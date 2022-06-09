import {View, ImageBackground, StyleSheet, Image, ViewStyle, TouchableOpacity} from 'react-native';
import React, {useCallback} from 'react';
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
import BagIcon from '@assets/image/handbag.png';
import ChatOffIcon from '@assets/image/chat.png';
import MultiStarIcon from '@assets/image/review.png';
import useApi from '@/Hooks/useApi';
import {BusinessProfileAPi} from '@/Types/API/BusinessTypes';
import {ProfileHomeProps} from '@/Types/Screen/Screen';
import {ProfileApi} from '@/Types/API/ProfileTypes';
import {viewCountCheck} from '@/Util/Util';
import Loading from '@/Components/Global/Loading';

export default function ProfileHome({route: {params}, navigation}: ProfileHomeProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const {data, getData, setData, isLoading} = useApi<ProfileApi['T'], ProfileApi['D']>(null, 'sell_member_profile.php', {
        mt_idx: user.mt_idx as string,
        sell_idx: params.sell_idx,
    });

    const name = data?.mt_name;
    const stateMessage = data?.mt_memo;
    const star = data?.mt_rate;
    const reviewCount = data?.mt_review;
    const likeCount = viewCountCheck(data?.mt_like);
    const hp = `(${data?.mt_hp.substring(0, 2)}) ${data?.mt_hp.substring(2)}`;
    const date = `${data?.mt_regdate_year}${t('profileYear')} ${data?.mt_regdate_month}${t('profileMonth')}`;

    const onPressProductSale = useCallback(() => {
        navigation.navigate('ProfileSellProduct', {
            sell_idx: params.sell_idx,
            sell_type: '0',
        });
    }, []);

    const onPressChatting = useCallback(() => {
        navigation.navigate('ChattingDetail');
    }, []);

    const onPressReviews = useCallback(() => {
        navigation.navigate('ProfileSellerReview', {
            sell_idx: params.sell_idx,
            sell_type: '0',
        });
    }, []);
    if (isLoading) {
        return <Loading />;
    }
    return (
        <View>
            <ProfileBackground />
            <Header title={t('profileHomeTitle')} isOnPressBack />
            <View style={{marginHorizontal: getPixel(16)}}>
                <Shadow distance={10}>
                    <View style={styles.whiteBoxView}>
                        <View style={styles.whiteBoxTopView}>
                            <View style={styles.row}>
                                <View style={styles.profileContentView}>
                                    <View
                                        style={{
                                            ...styles.profileImage,
                                            ...styles.imageView,
                                        }}>
                                        <Image source={data?.mt_profile ? {uri: data.mt_profile} : require('@assets/image/none_image_s.png')} style={styles.profileImage} />
                                    </View>
                                    <View>
                                        <BoldText fontSize={`${16 * fontSize}`}>{name}</BoldText>
                                        <GrayText fontSize={`${12 * fontSize}`}>{stateMessage}</GrayText>
                                    </View>
                                </View>
                                <View style={styles.starView}>
                                    <Image source={StarIcon} style={styles.starImage} />
                                    <Text medium fontSize={`${16 * fontSize}`}>
                                        {star}
                                    </Text>
                                </View>
                            </View>
                            <Line
                                isGray
                                height={0.5}
                                style={{
                                    marginTop: getHeightPixel(15),
                                    marginBottom: getHeightPixel(20),
                                }}
                            />
                            <View style={styles.betweenRow}>
                                <View style={styles.telView}>
                                    <Image source={TelIcon} style={styles.telImage} />
                                    <Text fontSize={`${14 * fontSize}`}>{t('profileHomeHp')}</Text>
                                </View>
                                <Text fontSize={`${14 * fontSize}`}>{hp}</Text>
                            </View>
                            <View style={styles.betweenRow}>
                                <View style={styles.telView}>
                                    <Image source={joinDateIcon} style={styles.telImage} />
                                    <Text fontSize={`${14 * fontSize}`}>{t('profileHomeJoinDate')}</Text>
                                </View>
                                <Text fontSize={`${14 * fontSize}`}>{date}</Text>
                            </View>
                            <View style={styles.sellerView}>
                                <View style={styles.likeView}>
                                    <Image source={LikeIcon} style={styles.likeImage} />
                                    <GrayText fontSize={`${14 * fontSize}`}>{likeCount.toString()}</GrayText>
                                </View>
                            </View>
                        </View>
                        <Line backgroundColor={Theme.color.gray_E9} height={1} width={getPixel(328)} />
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity onPress={onPressProductSale} style={styles.bottomView}>
                                <Image source={BagIcon} style={styles.whiteBoxBottomImage} />
                                <Text fontSize={`${14 * fontSize}`}>{t('profileHomeSaleProduct')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressChatting} style={styles.bottomView}>
                                <Image source={ChatOffIcon} style={styles.whiteBoxBottomImage} />
                                <Text fontSize={`${14 * fontSize}`}>{t('profileHomeChat')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onPressReviews} style={styles.bottomView}>
                                <Image source={MultiStarIcon} style={styles.whiteBoxBottomImage} />
                                <Text fontSize={`${14 * fontSize}`}>{t('profileHomeSellerReviews')}</Text>
                            </TouchableOpacity>
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
            <ImageBackground style={[styles.headerBackgroundImage, {width, height}]} source={ProfileBGImage} />
        </View>
    );
};

const styles = StyleSheet.create({
    imageView: {
        marginRight: getPixel(16),
        borderRadius: 10,
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
    betweenRow: {flexDirection: 'row', justifyContent: 'space-between', marginBottom: getHeightPixel(8)},
    telView: {flexDirection: 'row', alignItems: 'center'},
    telImage: {
        width: getPixel(24),
        height: getPixel(24),
        marginRight: getPixel(6),
    },
    sellerView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginVertical: getHeightPixel(16),
        marginTop: getHeightPixel(8),
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
        alignSelf: 'flex-end',
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
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    whiteBoxTopView: {
        paddingHorizontal: getPixel(20),
        paddingTop: getHeightPixel(20),
    },
    whiteBoxView: {
        width: getPixel(328),
        height: getHeightPixel(323),
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
