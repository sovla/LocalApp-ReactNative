import {View, StyleSheet} from 'react-native';
import React from 'react';
import {MediumText, Text} from '@/Components/Global/text';
import Theme from '@/assets/global/Theme';
import {Box} from '@/Components/Global/container';
import CheckIcon from '../../assets/image/success.png';
import AutoHeightImage from 'react-native-auto-height-image';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {useTranslation} from 'react-i18next';
import {Button} from '@/Components/Global/button';
import {useAppSelector} from '@/Hooks/CustomHook';

export default function LoginComplete() {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <View style={styles.mainContainer}>
      <Box>
        <AutoHeightImage source={CheckIcon} width={getPixel(50)} style={styles.image} />
        <MediumText fontSize={`${Theme.fontSize.fs24 * fontSize}px`} style={styles.mainText}>
          {t('loginComplete')}
        </MediumText>

        <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`}>{t('loginCompleteText')}</Text>
        <Text fontSize={`${Theme.fontSize.fs14 * fontSize}px`}>{t('loginCompleteText2')}</Text>
      </Box>
      <Box style={{position: 'absolute', bottom: getHeightPixel(34), left: getPixel(36)}}>
        <Button content={t('startButton')} width="288px" height="48px" />
      </Box>
    </View>
  );
}

const styles = StyleSheet.create({
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
