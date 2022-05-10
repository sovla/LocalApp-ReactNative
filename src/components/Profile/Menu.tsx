import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Theme from '@/assets/global/Theme';
import {Text} from '../Global/text';
import {MenuProps} from '@/Types/Components/ProfileTypes';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

const Menu: React.FC<MenuProps> = ({menuList, selectMenu, setSelectMenu}) => {
    const {t, i18n} = useTranslation();

    const fontSize = useAppSelector(state => state.fontSize.value);
    return (
        <View style={styles.menuContainer}>
            {menuList.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setSelectMenu(item);
                        }}
                        style={[
                            {
                                borderBottomColor: selectMenu === item ? Theme.color.blue_3D : Theme.color.gray,
                                borderBottomWidth: selectMenu === item ? 2 : 1,
                                width: getPixel(360 / menuList.length),
                            },
                            styles.menuTouch,
                        ]}>
                        <Text fontSize={`${16 * fontSize}`} color={selectMenu === item ? Theme.color.blue_3D : Theme.color.gray}>
                            {i18n.hasLoadedNamespace(item) ? t(item) : item}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default React.memo(Menu);

const styles = StyleSheet.create({
    menuContainer: {
        width: getPixel(360),
        height: getHeightPixel(50),
        flexDirection: 'row',
    },
    menuTouch: {
        height: getHeightPixel(50),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
