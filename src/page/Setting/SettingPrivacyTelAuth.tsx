import React, {useCallback, useState} from 'react';

import {useAppDispatch, useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import {SettingPrivacyTelAuthProps} from '@/Types/Screen/Screen';

import useInterval from '@/Hooks/useInterval';
import AuthNumber from '@/Components/LoginSignUp/AuthNumber';
import {usePostSend} from '@/Hooks/useApi';
import {getAuthNumApi, sendAuthNumApi} from '@/Types/API/SettingTypes';
import {apiResult} from '@/Util/Util';
import {changeTell} from '@/Store/userState';

export default function SettingPrivacyTelAuth({navigation, route: {params}}: SettingPrivacyTelAuthProps) {
    const {t} = useTranslation();
    const fontSize = useAppSelector(state => state.fontSize.value);
    const {mt_idx} = useAppSelector(state => state.user);

    const tel = `+${params.jct_country} ${params.jct_hp}`;
    const dispatch = useAppDispatch();
    const [authNum, setAuthNum] = useState('');
    const [count, setCount] = useState(120);

    const {PostAPI: getAuthNum} = usePostSend<getAuthNumApi>('member_hp_change.php', {
        mt_idx: mt_idx as string,
        jct_country: params.jct_country,
        jct_hp: params.jct_hp,
    });

    const {PostAPI: sendAuthNum} = usePostSend<sendAuthNumApi>('member_hp_change_check.php', {
        mt_idx: mt_idx as string,
        jct_country: params.jct_country,
        jct_hp: params.jct_hp,
        passcode: authNum,
    });

    const onPressNext = useCallback(() => {
        sendAuthNum()
            .then(apiResult)
            .then(res => {
                if (res) {
                    dispatch(
                        changeTell({
                            mt_country: params.jct_country,
                            mt_hp: params.jct_hp,
                        }),
                    );
                    navigation.navigate('SettingPrivacy');
                }
            });
    }, [authNum]);

    useInterval(() => {
        if (count > 0) setCount(prev => prev - 1);
    }, 1000);

    return <AuthNumber authNum={authNum} count={count} onPressNext={onPressNext} setAuthNum={setAuthNum} tel={tel} isChange={false} onPressRetry={() => getAuthNum()} />;
}
