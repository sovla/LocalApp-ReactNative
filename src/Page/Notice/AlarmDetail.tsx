import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {GrayText, Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import AutoHeightImage from 'react-native-auto-height-image';
import Line from '@/Components/Global/Line';

import Header from '@/Components/Profile/Header';
import TrashBlackIcon from '@assets/image/trash_black.png';
import useApi from '@/Hooks/useApi';
import {AlarmDetailProps} from '@/Types/Screen/Screen';
import {AlarmDetailApi} from '@/Types/API/NoticeTypes';
import {productTimeSetting} from '@/Util/Util';
import Loading from '@/Components/Global/Loading';
import RenderHTML from 'react-native-render-html';

export default function AlarmDetail({
    route: {
        params: {al_idx},
    },
}: AlarmDetailProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {user} = useAppSelector(state => state);

    const {data, isLoading} = useApi<AlarmDetailApi['T'], AlarmDetailApi['D']>(null, 'member_alarm_info.php', {
        mt_idx: user.mt_idx as string,
        al_idx: al_idx,
    });

    if (isLoading || !data) {
        return <Loading />;
    }

    const date = productTimeSetting(data.al_time, data.al_time_type);
    const title = data.al_title;

    const content = `${data.al_content}`;

    return (
        <View style={{flex: 1}}>
            <Header isBlack title={t('AlarmListTitle')} isBack>
                <View style={styles.row}>
                    <TouchableOpacity>
                        <AutoHeightImage source={TrashBlackIcon} width={getPixel(18)} />
                    </TouchableOpacity>
                </View>
            </Header>
            <View style={styles.contentView}>
                <GrayText fontSize={`${12 * fontSize}`}>{date}</GrayText>
                <Text fontSize={`${22 * fontSize}`}>{title}</Text>
                <Line style={styles.line} isGray />
                <RenderHTML
                    contentWidth={0}
                    source={{
                        html: content,
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    contentView: {
        width: getPixel(328),
        marginHorizontal: getPixel(16),
        paddingTop: getHeightPixel(35),
    },
    line: {
        marginTop: getHeightPixel(15),
        marginBottom: getHeightPixel(30),
    },
});
