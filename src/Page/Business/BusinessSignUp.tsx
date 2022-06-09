import Theme from '@/assets/global/Theme';
import {Button} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import {BusinessSignUpProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {AlertButton} from '@/Util/Util';
import BackWhiteIcon from '@assets/image/back_white.png';
import {Text} from '@Components/Global/text';
import React, {useCallback, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';

export default function BusinessSignUp({navigation}: BusinessSignUpProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const [selectNum, setSelectNum] = useState('+55');
    const [tel, setTel] = useState('');
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false);

    const {PostAPI} = usePostSend('member_busi_certi.php', {
        jct_hp: tel,
        jct_country: selectNum.replace('+', ''),
    });

    const onPressLogin = () => {
        PostAPI().then(res => {
            if (res.result === 'false' && res?.msg) {
                return AlertButton(res.msg);
            }

            setIsAuthModal(true);
            navigation.navigate('BusinessSignUpForm');
        });
    };

    const onPressRegister = useCallback(() => {
        navigation.navigate('BusinessSignUpForm');
    }, []);

    return (
        <View style={styles.container}>
            {/* <KeyboardAwareScrollView>
                <ImageBackground source={ProfileBackGroundImage} style={styles.backGroundImage} />
                <Image source={CommunicationImage} style={styles.communicationImage} />
                <Header isBack />
                <View style={styles.titleView}>
                    <WhiteText bold style={styles.title} fontSize={`${20 * fontSize}`}>
                        {t('businessSignUpGuide1')}
                    </WhiteText>
                    <WhiteText style={styles.subTitle} fontSize={`${14 * fontSize}`}>
                        {t('businessSignUpGuide2')}
                    </WhiteText>
                </View>
                <View style={styles.whiteView}>
                    <CountryPicker width={getPixel(270)} setSelectNum={setSelectNum} selectNum={selectNum} isLabelNumber />
                    <Line isGray width={getPixel(270)} />
                    <Input keyboardType="numeric" width={getPixel(270)} height={getHeightPixel(56)} value={tel} onChange={setTel} PlaceHolderComponent={() => <GrayText fontSize={`${14 * fontSize}`}>{t('telPh')}</GrayText>} />

                    <Button
                        content={t('confirmationRequest')}
                        onPress={onPressLogin}
                        width="270px"
                        fontColor={Theme.color.black}
                        style={{
                            backgroundColor: Theme.color.whiteBlue_F0,
                            marginTop: getHeightPixel(70),
                        }}
                    />
                </View>
            </KeyboardAwareScrollView>
            {isAuthModal && <ModalAuth onPressRetry={onPressLogin} tel={tel} selectNum={selectNum} onClose={() => setIsAuthModal(false)} isBusiness />} */}
            <Image source={require('@assets/image/business_header.png')} style={styles.headerImage} />
            <View style={styles.headerSpaceView}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBackImageView}>
                    <AutoHeightImage source={BackWhiteIcon} width={getPixel(30)} />
                </TouchableOpacity>
            </View>
            <View style={styles.whiteBox}>
                <Text fontSize={`${24 * fontSize}`} bold style={{marginTop: getHeightPixel(53), marginBottom: getHeightPixel(8)}}>
                    {t('modalMyPageBusiness')}
                </Text>
                <Text fontSize={`${14 * fontSize}`} medium>
                    {t('businessSignUpGuide1')}
                </Text>
                <Text fontSize={`${16 * fontSize}`} bold style={{marginTop: getHeightPixel(55)}}>
                    {t('businessSignUpGuide2')}
                </Text>
                <View style={styles.imageWithTextView}>
                    <AutoHeightImage source={require('@assets/image/rocket.png')} width={getPixel(24)} />
                    <Text style={styles.innerText} fontSize={`${14 * fontSize}`}>
                        {t('businessSignUpGuide3')}
                    </Text>
                </View>
                <Line isGray height={0.5} width={getPixel(288)} />
                <View style={styles.imageWithTextView}>
                    <AutoHeightImage source={require('@assets/image/cash.png')} width={getPixel(24)} />
                    <Text style={styles.innerText} fontSize={`${14 * fontSize}`}>
                        {t('businessSignUpGuide4')}
                    </Text>
                </View>
                <Line isGray height={0.5} width={getPixel(288)} />
                <View style={styles.imageWithTextView}>
                    <AutoHeightImage source={require('@assets/image/diamond.png')} width={getPixel(24)} />
                    <Text style={styles.innerText} fontSize={`${14 * fontSize}`}>
                        {t('businessSignUpGuide5')}
                    </Text>
                </View>
                <Line isGray height={0.5} width={getPixel(288)} />
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                    }}>
                    <Button onPress={() => onPressRegister()} content={t('register')} style={{marginBottom: getHeightPixel(25)}} />
                    <TouchableOpacity style={styles.footerTouch}>
                        <Text
                            medium
                            fontSize={`${12 * fontSize}`}
                            style={{
                                textDecorationLine: 'underline',
                            }}>
                            {t('businessTermsandConditions')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    whiteBox: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Theme.color.white,
        paddingHorizontal: getPixel(32),
    },
    footerTouch: {
        width: getPixel(288),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: getHeightPixel(20),
    },
    innerText: {
        width: getPixel(250),
        marginLeft: getPixel(14),
    },
    imageWithTextView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: getHeightPixel(16),
    },
    headerImage: {
        width: getPixel(360),
        height: getPixel(150),
        position: 'absolute',
        left: 0,
        top: 0,
    },
    headerSpaceView: {height: getHeightPixel(132)},
    headerBackImageView: {
        marginTop: getHeightPixel(10),
        marginLeft: getPixel(16),
    },
    w270: {
        width: getPixel(270),
    },
    marginLeft: {
        marginLeft: getPixel(5),
    },
    button: {
        backgroundColor: Theme.color.whiteBlue_F0,
    },
    viewImageTouch: {
        position: 'absolute',
        right: 0,
        top: getHeightPixel(5),
    },
    rowCenter: {
        width: getPixel(270),
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: getHeightPixel(19),
    },
    container: {
        // backgroundColor: Theme.color.blue_3D,
        flex: 1,
    },
    backGroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: getPixel(360),
        height: getHeightPixel(300),
    },
    communicationImage: {
        position: 'absolute',
        top: getHeightPixel(10),
        right: getPixel(32),
        height: getHeightPixel(360),
        width: getPixel(150),
        zIndex: 100,
    },
    titleView: {
        marginLeft: getPixel(32),
        marginTop: getHeightPixel(50),
    },
    title: {
        width: getPixel(177),
    },
    subTitle: {
        marginTop: getHeightPixel(15),
        width: getPixel(165),
    },
    whiteView: {
        width: getPixel(328),
        height: getHeightPixel(348),
        backgroundColor: Theme.color.white,
        marginHorizontal: getPixel(16),
        marginTop: getHeightPixel(30),
        borderRadius: getPixel(20),

        alignItems: 'center',
        paddingTop: getHeightPixel(40),
    },
});
