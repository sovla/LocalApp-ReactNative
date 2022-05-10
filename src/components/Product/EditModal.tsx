import {Dimensions, FlatList, Image, ImageBackground, Modal, ScrollView, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';

import BackGroundImage from '@assets/image/BG.png';
import {fontSizeChange, getHeightPixel, getPixel} from '@/Util/pixelChange';
import LocationWhiteIcon from '@assets/image/location_white.png';
import SearchIcon from '@assets/image/search_white.png';
import MenuIcon from '@assets/image/bar_white.png';
import AlarmIcon from '@assets/image/notice_white.png';
import {DarkBlueText, GrayText, Text, WhiteText} from '@Components/Global/text';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import TrianglePinkIcon from '@assets/image/triangle_pink.png';
import {HeaderProps, ModalMyPageProps, ModalUploadModalProps} from '@/Types/Components/HomeTypes';
import useBoolean from '@/Hooks/useBoolean';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BackBlackBoxIcon from '@assets/image/back_black_box.png';
import AutoHeightImage from 'react-native-auto-height-image';
import DummyProfileImage from '@assets/image/dummy_profile.png';

import AnnouncementIcon from '@assets/image/announcement.png';
import NoticeColorIcon from '@assets/image/notice_color.png';
import StoreIcon from '@assets/image/store.png';
import WriteIcon from '@assets/image/write.png';
import ProductListIcon from '@assets/image/product_list.png';
import UploadWhiteIcon from '@assets/image/upload_white.png';
import NoticeOn from '@assets/image/notice_on.png';
import SettingsIcon from '@assets/image/settings.png';
import ServiceCenterIcon from '@assets/image/service_center.png';
import Header from '@/Components/LoginSignUp/Header';
import {Button, CheckBox, CheckBoxImage, Toggle} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {Shadow} from 'react-native-shadow-2';
import {useDispatch} from 'react-redux';
import {fontChange, fontSizeState} from '@/Store/fontSizeState';
import i18next from 'i18next';
import {languageList} from '@/assets/global/dummy';
import Menu from '@/Components/Profile/Menu';
import ProductWhiteBox from '@/Components/Product/ProductWhiteBox';
import {EditModalProps} from '@/Types/Components/ProductTypes';
import {TextInput} from 'react-native-gesture-handler';
import {brPrice} from '@Util/Util';
import {usePostSend} from '@/Hooks/useApi';
import {AlertButton, getHitSlop} from '@/Util/Util';

const EditModal: React.FC<EditModalProps> = ({onClose, isBump, item}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);
    const [isBumpUp, setIsBumpUp] = useState(false);
    const [bumpPrice, setBumpPrice] = useState('');
    const navigation = useAppNavigation();
    const onPressUpdate = () => {
        onClose();
        navigation.navigate('ProductUpdate', {isEdit: true, pt_idx: item.pt_idx});
    };

    const {PostAPI: bumpUpApi} = usePostSend('sell_product_bump_up.php', {
        // bump_up
        mt_idx: user.mt_idx as string,
        pt_idx: item.pt_idx,
        pt_price: bumpPrice,
    });
    const {PostAPI: reservationApi} = usePostSend('sell_product_reservation.php', {
        // 예약중
        mt_idx: user.mt_idx as string,
        pt_idx: item.pt_idx,
    });
    const {PostAPI: sellingApi} = usePostSend('sell_product_selling.php', {
        // 판매중
        mt_idx: user.mt_idx as string,
        pt_idx: item.pt_idx,
        pt_price: bumpPrice,
    });
    const {PostAPI: finishApi} = usePostSend('sell_product_finish.php', {
        // 판매 완료
        mt_idx: user.mt_idx as string,
        pt_idx: item.pt_idx,
        pt_price: bumpPrice,
    });
    const {PostAPI: deleteApi} = usePostSend('sell_product_delete_arr.php', {
        // 게시글 삭제
        mt_idx: user.mt_idx as string,
        pt_idx: item.pt_idx,
    });

    const title = item.pt_title;
    const price = brPrice(item.pt_price);

    const onPressDelete = async () => {
        // 제거 api 추가필요
        const res = await deleteApi();
        if (res?.result === 'false' && res?.msg) {
            AlertButton(res.msg);
        } else {
            onClose();
        }
    };

    const onPressBumpUp = () => {
        bumpUpApi().then(res => {
            if (res?.result === 'false' && res?.msg) {
                AlertButton(res.msg);
            } else {
                onClose();
            }
        });
    };
    return (
        <Modal visible transparent animationType="fade" onRequestClose={onClose}>
            <View style={styles.dim}>
                <View
                    style={{
                        flex: 1,
                    }}
                    onStartShouldSetResponder={() => {
                        // 모달끄기
                        onClose();
                        return false;
                    }}></View>
                <View style={styles.absoluteView}>
                    {!isBumpUp ? (
                        <View style={styles.container}>
                            {isBump && (
                                <>
                                    {/* 붐업 */}
                                    <TouchableOpacity
                                        disabled={item.bump_up_check === 'N'}
                                        onPress={() => {
                                            setIsBumpUp(prev => !prev);
                                        }}
                                        style={styles.aquaView}>
                                        <WhiteText medium fontSize={`${16 * fontSize}`}>
                                            {t('bumpUp')}
                                        </WhiteText>
                                    </TouchableOpacity>
                                    {/* 예약중 */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            reservationApi();
                                            onClose();
                                        }}
                                        style={styles.whiteView}>
                                        <Text medium fontSize={`${16 * fontSize}`}>
                                            {t('MyProductMenu1')}
                                        </Text>
                                    </TouchableOpacity>
                                    <Line isGray />
                                    {/* 판매완료 */}
                                    <TouchableOpacity
                                        onPress={() => {
                                            finishApi();
                                            onClose();
                                        }}
                                        style={styles.whiteView}>
                                        <Text medium fontSize={`${16 * fontSize}`}>
                                            {t('MyProductMenu2')}
                                        </Text>
                                    </TouchableOpacity>
                                    <Line isGray />
                                </>
                            )}
                            {/* 게시글 수정 */}
                            <TouchableOpacity onPress={onPressUpdate} style={styles.whiteView}>
                                <Text medium fontSize={`${16 * fontSize}`}>
                                    {t('postUpdate')}
                                </Text>
                            </TouchableOpacity>
                            <Line isGray />
                            {/* 게시글 삭제 */}
                            <TouchableOpacity onPress={onPressDelete} style={styles.whiteView}>
                                <Text medium fontSize={`${16 * fontSize}`}>
                                    {t('postDelete')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={styles.container}>
                            <ScrollView>
                                <View style={styles.bumpView}>
                                    <Text bold fontSize={`${20 * fontSize}`} style={styles.bumpText}>
                                        {t('bumpUp')}
                                    </Text>
                                </View>
                                <View style={styles.contentView}>
                                    <View
                                        style={{
                                            ...styles.image,
                                            ...styles.imageView,
                                        }}>
                                        <Image source={item.pt_file?.length > 0 ? {uri: item.pt_file} : require('@assets/image/none_image_s.png')} style={styles.image} />
                                    </View>
                                    <View>
                                        <Text style={styles.titleText} numberOfLines={2} fontSize={`${14 * fontSize}`}>
                                            {title}
                                        </Text>
                                        <DarkBlueText fontSize={`${16 * fontSize}`} bold>
                                            {price}
                                        </DarkBlueText>
                                    </View>
                                </View>
                                <View style={styles.guideView}>
                                    <Text medium fontSize={`${20 * fontSize}`} style={styles.guideText}>
                                        {t('bumpUpModalGuide1')}
                                    </Text>
                                    <Text fontSize={`${14 * fontSize}`}>{t('bumpUpModalGuide2')}</Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: getHeightPixel(15),
                                        }}>
                                        <DarkBlueText fontSize={`${20 * fontSize}`} medium>
                                            R$
                                        </DarkBlueText>
                                        <TextInput
                                            keyboardType="number-pad"
                                            style={[
                                                styles.textInput,
                                                {
                                                    fontSize: fontSize * 20,
                                                    flex: 1,
                                                },
                                            ]}
                                            value={bumpPrice}
                                            onChangeText={setBumpPrice}
                                        />
                                    </View>
                                </View>
                                <Line isGray />
                                <View style={styles.widthView}>
                                    <View style={styles.guide3View}>
                                        <Text fontSize={`${14 * fontSize}`}>{t('bumpUpModalGuide3')}</Text>
                                        <Text
                                            fontSize={`${14 * fontSize}`}
                                            color={Theme.color.blue_3D}
                                            style={{
                                                marginHorizontal: getPixel(5),
                                            }}>
                                            {item.bump_up_time}
                                        </Text>
                                        <Text fontSize={`${14 * fontSize}`}>{t('bumpUpModalGuide4')}</Text>
                                    </View>
                                    <Button content={t('bumpUp')} width="328px" onPress={onPressBumpUp} />
                                    <View
                                        style={{
                                            height: getHeightPixel(30),
                                        }}
                                    />
                                </View>
                            </ScrollView>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default EditModal;

const styles = StyleSheet.create({
    widthView: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
    },
    guide3View: {
        flexDirection: 'row',
        marginTop: getHeightPixel(25),
        marginBottom: getHeightPixel(35),
    },
    guideView: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        height: getHeightPixel(190),
    },
    guideText: {
        marginTop: getHeightPixel(26),
        marginBottom: getHeightPixel(16),
    },
    textInput: {
        width: getPixel(328),
        height: getHeightPixel(50),
        color: Theme.color.darkBlue,
    },
    bumpView: {
        height: getHeightPixel(80),
        justifyContent: 'flex-end',
    },
    bumpText: {
        marginLeft: getPixel(16),
        marginBottom: getHeightPixel(16),
    },
    contentView: {
        width: getPixel(360),
        height: getHeightPixel(100),
        backgroundColor: Theme.color.whiteBlue_2F,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: getPixel(70),
        height: getPixel(70),
    },
    imageView: {
        overflow: 'hidden',
        borderRadius: 6,
        marginLeft: getPixel(16),
        marginRight: getPixel(14),
    },
    titleText: {
        width: getPixel(244),
        marginBottom: getHeightPixel(7),
    },
    dim: {
        flex: 1,
        backgroundColor: '#0007',
    },
    absoluteView: {position: 'absolute', bottom: 0, left: 0, zIndex: 100},
    container: {
        width: getPixel(360),
        backgroundColor: Theme.color.white,
        borderTopRightRadius: getPixel(20),
        borderTopLeftRadius: getPixel(20),
        overflow: 'hidden',
    },
    aquaView: {
        width: '100%',
        height: getHeightPixel(54),
        backgroundColor: Theme.color.aqua_04,
        justifyContent: 'center',
        alignItems: 'center',
    },

    whiteView: {
        width: '100%',
        height: getHeightPixel(54),
        backgroundColor: Theme.color.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
