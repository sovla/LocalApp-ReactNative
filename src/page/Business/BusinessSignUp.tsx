import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import ProfileBackGroundImage from '@assets/image/profile_bg.png';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, WhiteText} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Button} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {BusinessSignUpProps} from '@/Types/Screen/Screen';

import Header from '@/Components/Profile/Header';
import CommunicationImage from '@assets/image/communication.png';
import Input from '@/Components/Global/Input';
import {AlertButton} from '@/Util/Util';
import CountryPicker from '@/Components/Profile/CountryPicker';
import {usePostSend} from '@/Hooks/useApi';
import ModalAuth from '@/Components/LoginSignUp/ModalAuth';

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

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView>
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
            {isAuthModal && <ModalAuth onPressRetry={onPressLogin} tel={tel} selectNum={selectNum} onClose={() => setIsAuthModal(false)} isBusiness />}
        </View>
    );
}

const styles = StyleSheet.create({
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
        backgroundColor: Theme.color.blue_3D,
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
