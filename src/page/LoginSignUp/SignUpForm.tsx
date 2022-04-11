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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function SignUpForm() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
        }}>
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
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.gray}>
                  {t('signUpFormPhone')}
                </Text>
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.red}>
                  {' '}
                  *{' '}
                </Text>
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
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.gray}>
                  {t('signUpFormDate')}
                </Text>
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.red}>
                  {' '}
                  *{' '}
                </Text>
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.gray}>
                  {t('signUpFormDateGuide')}
                </Text>
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
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.gray}>
                  {t('signUpFormSex')}
                </Text>
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.red}>
                  {' '}
                  *{' '}
                </Text>
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
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.gray}>
                  {t('signUpFormEmail')}
                </Text>
                <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`} color={Theme.color.red}>
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