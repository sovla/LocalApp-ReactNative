import {Modal, StyleSheet, View} from 'react-native';
import React from 'react';

import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import {Text} from '@Components/Global/text';
import {useAppSelector} from '@/Hooks/CustomHook';
import {useTranslation} from 'react-i18next';
import Theme from '@/assets/global/Theme';
import AutoHeightImage from 'react-native-auto-height-image';

import {Button} from '@/Components/Global/button';
import Line from '@/Components/Global/Line';
import {ModalAlertProps} from '@/Types/Components/ProductTypes';
import WarningIcon from '@assets/image/warning.png';

const ModalAlert: React.FC<ModalAlertProps> = ({onClose, title, content}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const onPressConfirm = () => {
    // 수정필요 확인 버튼
    onClose();
  };
  return (
    <Modal visible transparent>
      <View style={styles.dim}>
        <View style={styles.whiteBox}>
          <View style={styles.rowView}>
            <AutoHeightImage source={WarningIcon} width={getPixel(20)} />
            <Text
              style={styles.titleTextMarginLeft}
              fontSize={`${18 * fontSize}`}>
              {title}
            </Text>
          </View>
          <Line isGray />
          <Text style={styles.centerText} fontSize={`${14 * fontSize}`}>
            {content}
          </Text>
          <Button
            content={t('confirm')}
            width="240px"
            style={styles.absoluteButton}
            onPress={onPressConfirm}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalAlert;

const styles = StyleSheet.create({
  absoluteButton: {
    position: 'absolute',
    bottom: getHeightPixel(20),
    left: getPixel(20),
  },
  dim: {
    flex: 1,
    backgroundColor: '#0007',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: getPixel(280),
    height: getHeightPixel(230),
    backgroundColor: Theme.color.white,
    borderRadius: getPixel(8),
    paddingVertical: getHeightPixel(20),
    paddingHorizontal: getPixel(20),
  },
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeightPixel(10),
  },
  titleTextMarginLeft: {
    marginLeft: getPixel(10),
  },
  centerText: {
    marginTop: getHeightPixel(20),
  },
});
