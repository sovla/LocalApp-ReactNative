import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {MediumText, Text} from '@/Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import Photo from '@/Components/LoginSignUp/Photo';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Input from '@/Components/Global/Input';
import {Button} from '@/Components/Global/button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignUpFormProps} from '@/Types/Screen/Screen';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {birthDate, checkEmpty} from '@/Util/Util';
import {useIsFocused} from '@react-navigation/native';
import useObject from '@/Hooks/useObject';
import {API} from '@/API/API';

interface userState {
  mt_country?: string;
  mt_hp?: string;
  mt_name?: string;
  mt_birth?: string;
  mt_gender?: string;
  mt_email?: string;
  mt_memo?: string;
  mt_marketing?: string;
}

export default function SignUpForm({
  navigation,
  route: {params},
}: SignUpFormProps) {
  const {t, i18n} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const {token} = useAppSelector(state => state.global.data);
  const isFocused = useIsFocused();

  const [image, setImage] = useState<{
    path: string;
    mime: string;
  } | null>(null);

  const [user, setUser, onChangeUser] = useObject<userState>({
    mt_country: '',
    mt_hp: '',
    mt_name: '',
    mt_birth: '',
    mt_gender: '',
    mt_email: '',
    mt_memo: '',
    mt_marketing: '',
  });

  const inputRefs = useRef<any[]>([]);

  const onPressSignUp = useCallback(async () => {
    const result = await API.post('member_join.php', {
      ...user,
      lang: i18n.language,
      mt_app_token: token,
      mt_file: image,
      imageField: 'mt_file',
    });

    if (result.data?.result === 'true') {
      navigation.replace('SignUpComplete');
    }
  }, [user, image, i18n]);

  useEffect(() => {
    if (params?.image) {
      setImage(params.image);
    }
    if (params?.selectNum && params?.tel) {
      setUser((prev: userState) => ({
        ...prev,
        mt_hp: params.tel,
        mt_country: params.selectNum?.replace('+', ''),
      }));
    }
    if (params?.option) {
      onChangeUser('mt_marketing', 'Y');
    }
  }, [isFocused]);

  const tel = `+${user.mt_country} ${user.mt_hp}`;
  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
        <Header />
        <MediumText
          fontSize={`${20 * fontSize}px`}
          style={{marginTop: getHeightPixel(10)}}>
          {t('signUpFormTitle')}
        </MediumText>
        <Text
          fontSize={`${14 * fontSize}px`}
          color={Theme.color.gray}
          style={{marginVertical: getHeightPixel(20)}}>
          {t('signUpFormSubTitle')}
        </Text>
        <Photo selectImage={checkEmpty(image)} isNavigation />

        <View style={{height: getHeightPixel(50)}} />
        <Input
          ref={inputRefs}
          value={user.mt_name}
          onChange={v => {
            onChangeUser('mt_name', v);
          }}
          PlaceHolderComponent={() => {
            return (
              <>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.gray}>
                  {t('profileDetailName')}
                </Text>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.red}>
                  {' '}
                  *{' '}
                </Text>
              </>
            );
          }}
        />
        <Input
          ref={inputRefs}
          value={user.mt_memo}
          onChange={v => onChangeUser('mt_memo', v)}
          PlaceHolderComponent={() => {
            return (
              <>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.gray}>
                  {t('profileDetailState')}
                </Text>
              </>
            );
          }}
        />
        <Input
          ref={inputRefs}
          value={tel}
          disabled
          PlaceHolderComponent={() => {
            return (
              <>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.gray}>
                  {t('signUpFormPhone')}
                </Text>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.red}>
                  {' '}
                  *{' '}
                </Text>
              </>
            );
          }}
        />

        <Input
          ref={inputRefs}
          value={user.mt_birth}
          onChange={v => onChangeUser('mt_birth', birthDate(v))}
          PlaceHolderComponent={() => {
            return (
              <>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.gray}>
                  {t('signUpFormDate')}
                </Text>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.red}>
                  {' '}
                  *{' '}
                </Text>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.gray}>
                  {t('signUpFormDateGuide')}
                </Text>
              </>
            );
          }}
        />
        <Input
          ref={inputRefs}
          value={user.mt_gender}
          onChange={v => onChangeUser('mt_gender', v)}
          PlaceHolderComponent={() => {
            return (
              <>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.gray}>
                  {t('signUpFormSex')}
                </Text>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.red}>
                  {' '}
                  *{' '}
                </Text>
              </>
            );
          }}
        />
        <Input
          ref={inputRefs}
          value={user.mt_email}
          onChange={v => onChangeUser('mt_email', v)}
          PlaceHolderComponent={() => {
            return (
              <>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.gray}>
                  {t('signUpFormEmail')}
                </Text>
                <Text
                  fontSize={`${Theme.fontSize.fs14 * fontSize}px`}
                  color={Theme.color.red}>
                  {' '}
                  *{' '}
                </Text>
              </>
            );
          }}
          errorText={t('signUpErrorEmail')}
        />
      </KeyboardAwareScrollView>
      <Button
        onPress={onPressSignUp}
        height="48px"
        style={{
          position: 'absolute',
          top: getHeightPixel(640),
          left: getPixel(36),
        }}
        content={t('signUp')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
