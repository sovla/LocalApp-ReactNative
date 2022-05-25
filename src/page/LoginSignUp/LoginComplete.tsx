import {Button} from '@/Components/Global/button';
import {Box} from '@/Components/Global/container';
import {MediumText, Text} from '@/Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {usePostSend} from '@/Hooks/useApi';
import {changeOptionalUser} from '@/Store/userState';
import {LocationChangeApi} from '@/Types/API/HomeTypes';
import {LoginCompleteProps} from '@/Types/Screen/Screen';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useLayoutEffect} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import {useDispatch} from 'react-redux';
import CheckIcon from '../../assets/image/success.png';

export default function LoginComplete({navigation}: LoginCompleteProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const {PostAPI: LocationChangeSendApi} = usePostSend<LocationChangeApi, any>('mt_location_modify.php', {
        mt_idx: user.mt_idx as string,
    });
    const dispatch = useDispatch();

    const onPressComplete = useCallback(() => {
        return navigation.reset({
            routes: [
                {
                    name: 'Home',
                },
            ],
        });
    }, []);

    useLayoutEffect(() => {
        if (!user.mt_lat || !user.mt_lng || !user.mt_location) {
            // 유저정보중 지역이 없을경우 ?
            (async () => {
                const locationString = await AsyncStorage.getItem('location');
                const location = locationString
                    ? JSON.parse(locationString)
                    : {
                          city: 'Bom Retiro',
                          lat: -23.5279688,
                          lng: -46.6365761,
                      };

                LocationChangeSendApi({
                    mt_location: location.city,
                    mt_lat: location.lat,
                    mt_lng: location.lng,
                    mt_limit: 20,
                });

                dispatch(
                    changeOptionalUser({
                        mt_location: location.city,
                        mt_lat: location.lat,
                        mt_lng: location.lng,
                    }),
                );
            })();
        }
    }, [user]);
    return (
        <View style={styles.mainContainer}>
            <Box>
                <AutoHeightImage source={CheckIcon} width={getPixel(50)} style={styles.image} />
                <MediumText fontSize={`${24 * fontSize}px`} style={styles.mainText}>
                    {t('loginComplete')}
                </MediumText>

                <Text fontSize={`${14 * fontSize}px`}>{t('loginCompleteText')}</Text>
                <Text fontSize={`${14 * fontSize}px`}>{t('loginCompleteText2')}</Text>
            </Box>

            <Button style={styles.button} content={t('startButton')} width="288px" height="48px" onPress={onPressComplete} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: getHeightPixel(34),
        left: getPixel(36),
    },
    mainText: {
        marginBottom: getHeightPixel(10),
    },
    image: {
        marginBottom: getHeightPixel(36),
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
