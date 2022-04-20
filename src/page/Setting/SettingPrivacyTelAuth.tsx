import React, {useCallback, useState} from 'react';

import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';

import {
  SettingPrivacyTelAuthProps,
  SignUpAuthProps,
} from '@/Types/Screen/Screen';

import useInterval from '@/Hooks/useInterval';
import AuthNumber from '@/Components/LoginSignUp/AuthNumber';

export default function SettingPrivacyTelAuth({
  navigation,
}: SettingPrivacyTelAuthProps) {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);

  const tel = '+55 11 99999-0000';
  const [authNum, setAuthNum] = useState('');
  const [count, setCount] = useState(120);

  const onPressNext = useCallback(() => {
    navigation.navigate('SettingPrivacy');
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
      isChange={false}
    />
  );
}
