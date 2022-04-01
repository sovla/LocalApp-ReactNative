import {KeyboardAvoidingView, StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import Header from '@/Components/LoginSignUp/Header';
import {MediumText, Text} from '@/Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import Photo from '@/Components/LoginSignUp/Photo';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import Input from '@/Components/Global/input';
import {Button} from '@/Components/Global/button';

export default function SignUpForm() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <KeyboardAvoidingView style={styles.mainContainer} behavior="padding">
      <Header />
      <MediumText fontSize={`${20 * fontSize}px`} style={{marginTop: getHeightPixel(10)}}>
        {t('signUpFormTitle')}
      </MediumText>
      <Text fontSize={`${14 * fontSize}px`} color={Theme.color.gray} style={{marginVertical: getHeightPixel(20)}}>
        {t('signUpFormSubTitle')}
      </Text>
      <Photo />
      <View style={{height: getHeightPixel(50)}} />
      <Input
        value=""
        onChange={() => {}}
        PlaceHolderComponent={() => {
          return (
            <>
              <Text color={Theme.color.gray}>{t('signUpFormPhone')}</Text>
              <Text color={Theme.color.red}> * </Text>
            </>
          );
        }}
        errorText={t('signUpErrorPhone')}
      />

      <Input
        value=""
        onChange={() => {}}
        PlaceHolderComponent={() => {
          return (
            <>
              <Text color={Theme.color.gray}>{t('signUpFormDate')}</Text>
              <Text color={Theme.color.red}> * </Text>
              <Text color={Theme.color.gray}>{t('signUpFormDateGuide')}</Text>
            </>
          );
        }}
      />
      <Input
        value=""
        onChange={() => {}}
        PlaceHolderComponent={() => {
          return (
            <>
              <Text color={Theme.color.gray}>{t('signUpFormSex')}</Text>
              <Text color={Theme.color.red}> * </Text>
            </>
          );
        }}
      />
      <Input
        value=""
        onChange={() => {}}
        PlaceHolderComponent={() => {
          return (
            <>
              <Text color={Theme.color.gray}>{t('signUpFormEmail')}</Text>
              <Text color={Theme.color.red}> * </Text>
            </>
          );
        }}
        errorText={t('signUpErrorEmail')}
      />
      <Button
        height="48px"
        style={{
          position: 'absolute',
          bottom: getHeightPixel(34),
          left: getPixel(36),
        }}
        content={t('signUp')}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    flex: 1,
  },
});
