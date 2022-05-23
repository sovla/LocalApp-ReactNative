import {Animated, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef} from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import Line from '@/Components/Global/Line';
import {Shadow} from 'react-native-shadow-2';
import {ContactType, ModalContactProps} from '@/Types/Components/SettingTypes';
import {PanResponder} from 'react-native';

const ModalContact: React.FC<ModalContactProps> = ({onClose, onPressItem}) => {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);

    const menuList: ContactType[] = ['user', 'ad', 'report', 'error', 'other'];
    const pan = useRef(new Animated.ValueXY({x: 0, y: getHeightPixel(360)})).current;

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, g) => {
            if (g.dy > 0) {
                pan.setValue({x: 0, y: g.dy}); // 거꾸로 가는 거 방지
            }
        },

        onPanResponderRelease: (e, g) => {
            if (g.dy > 100) {
                // 꺼지는 부분
                Animated.timing(
                    pan, // Auto-multiplexed
                    {
                        toValue: {x: 0, y: getHeightPixel(360)},
                        useNativeDriver: true,
                        duration: 150, // 150ms 동안
                    }, // Back to zero
                ).start();
                setTimeout(() => {
                    onClose();
                }, 200);
            } else {
                Animated.spring(
                    // 원상태로 복귀
                    pan, // Auto-multiplexed
                    {
                        toValue: {x: 0, y: 0},
                        useNativeDriver: true,
                        bounciness: 0,
                    }, // Back to zero
                ).start();
            }
        },
    });

    useEffect(() => {
        Animated.spring(
            pan, // Auto-multiplexed
            {
                toValue: {x: 0, y: 0},
                useNativeDriver: true,
                bounciness: 0,
            }, // Back to zero
        ).start();
    }, []);
    return (
        <Modal transparent onRequestClose={onClose}>
            <View
                style={{
                    flex: 1,
                }}>
                <Animated.View style={[styles.whiteView, pan.getTranslateTransform()]} {...panResponder.panHandlers}>
                    <Shadow distance={5} viewStyle={styles.borderRadius}>
                        <>
                            <View style={styles.header}>
                                <View style={styles.headerButton}></View>
                            </View>
                            {menuList.map(v => {
                                return (
                                    <>
                                        <TouchableOpacity onPress={() => onPressItem(v)} style={styles.menuView}>
                                            <Text fontSize={`${16 * fontSize}`}>{t('contact' + v)}</Text>
                                        </TouchableOpacity>
                                        <Line isGray />
                                    </>
                                );
                            })}
                        </>
                    </Shadow>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default ModalContact;

const styles = StyleSheet.create({
    menuView: {
        height: getHeightPixel(54),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButton: {
        width: getPixel(48),
        height: getHeightPixel(5),
        backgroundColor: '#D9D9D9',
        borderRadius: 4,
    },
    header: {
        height: getHeightPixel(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    borderRadius: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    whiteView: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#fff',
    },
});
