import React, {useCallback, useState} from 'react';

import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import {SignUpAuthProps} from '@/Types/Screen/Screen';

import useInterval from '@/Hooks/useInterval';
import AuthNumber from '@/Components/LoginSignUp/AuthNumber';
import {AlertButton} from '@/Util/Util';
import {API} from '@/API/API';

export default function SignUpAuth({
  navigation,
  route: {params},
}: SignUpAuthProps) {
  const {t, i18n} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const tel = params.selectNum + ' ' + params.tel;
  const [authNum, setAuthNum] = useState('');
  const [count, setCount] = useState(120);

  const onPressNext = useCallback(async () => {
    if (count === 0) {
      return AlertButton(t('authAlert1'));
    }
    if (authNum.length !== 6) {
      return AlertButton(t('authAlert2'));
    }

    const result = await API.post('member_join_hp_certi_check.php', {
      jct_country: params.selectNum.replace('+', ''),
      jct_hp: params.tel,
      lang: i18n.language,
      passcode: authNum,
    });
    if (result.data.result === 'true') {
      navigation.navigate('SignUpForm', {
        ...params,
      });
    } else {
      AlertButton(result.data?.msg);
    }
  }, [count, authNum, i18n]);
  const onPressRetry = useCallback(async () => {
    const result = await API.post('member_join_hp_certi.php', {
      jct_country: params.selectNum.replace('+', ''),
      jct_hp: params.tel,
      lang: i18n.language,
    });

    if (result.data.result === 'true') {
      setCount(120);
    } else {
      AlertButton(result.data?.msg);
    }
  }, []);

  useInterval(() => {
    if (count > 0) setCount(prev => prev - 1);
  }, 1000);

  return (
    <AuthNumber
      authNum={authNum}
      count={count}
      onPressNext={onPressNext}
      setAuthNum={setAuthNum}
      tel={tel}
      onPressRetry={onPressRetry}
    />
  );
}
