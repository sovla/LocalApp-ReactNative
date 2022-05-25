import Theme from '@/assets/global/Theme';
import ChatOnIcon from '@/assets/image/chat_color.png';
import ChatOffIcon from '@/assets/image/chat_gray.png';
import FavoriteOnIcon from '@/assets/image/favorite_color.png';
import FavoriteOffIcon from '@/assets/image/favorite_gray.png';
import HomeOnIcon from '@/assets/image/home_color.png';
import HomeOffIcon from '@/assets/image/home_gray.png';
import ProfileOnIcon from '@/assets/image/profile_color.png';
import ProfileOffIcon from '@/assets/image/profile_gray.png';
import {useAppNavigation, useAppSelector} from '@/Hooks/CustomHook';
import {FooterProps, MenuBoxProps} from '@/Types/Components/HomeTypes';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {Text} from '../Global/text';
import ModalMyPage from './ModalMyPage';

const Footer: React.FC<FooterProps> = ({menu}) => {
    const [isMenu, setisMenu] = useState(false);
    return (
        <>
            <Shadow distance={5} finalColor={'#0000'} startColor={'#0001'}>
                <View style={styles.footerContainer}>
                    <MenuBox OffImage={HomeOffIcon} onImage={HomeOnIcon} name="home" selectMenu={menu} />
                    <MenuBox OffImage={FavoriteOffIcon} onImage={FavoriteOnIcon} name="favorite" selectMenu={menu} />
                    <MenuBox OffImage={ChatOffIcon} onImage={ChatOnIcon} name="chat" selectMenu={menu} />
                    <MenuBox OffImage={ProfileOffIcon} onImage={ProfileOnIcon} name="profile" selectMenu={menu} onPressMenu={() => setisMenu(true)} />
                </View>
            </Shadow>
            {isMenu && (
                <Modal
                    visible={isMenu}
                    transparent
                    onRequestClose={() => {
                        setisMenu(false);
                    }}>
                    {isMenu && (
                        <ModalMyPage
                            onClose={() => {
                                setisMenu(false);
                            }}
                        />
                    )}
                </Modal>
            )}
        </>
    );
};

const MenuBox: React.FC<MenuBoxProps> = ({onImage, OffImage, selectMenu, name, onPressMenu}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const navigation = useAppNavigation();

    const onPress = () => {
        switch (name) {
            case 'chat':
                navigation.navigate('ChattingHome');
                break;
            case 'favorite':
                navigation.navigate('LikeList');
                break;
            case 'home':
                navigation.navigate('Home');
                break;
            case 'profile':
                if (onPressMenu) onPressMenu();
                break;

            default:
                break;
        }
    };
    return (
        <TouchableOpacity onPress={onPress} style={styles.viewCenter}>
            <Image source={selectMenu === name ? onImage : OffImage} style={styles.image} resizeMode="contain" />
            <Text bold={selectMenu === name} color={selectMenu === name ? Theme.color.blue_3D : Theme.color.black} fontSize={`${12 * fontSize}`}>
                {t(name)}
            </Text>
        </TouchableOpacity>
    );
};

export default Footer;

const styles = StyleSheet.create({
    image: {
        width: getPixel(20),
        height: getPixel(20),
    },
    viewCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        width: getPixel(360),
        height: getHeightPixel(54),
        paddingHorizontal: getPixel(16),
        backgroundColor: Theme.color.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});
