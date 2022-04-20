import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Theme from '@/assets/global/Theme';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import AutoHeightImage from 'react-native-auto-height-image';
import {Text} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {ModalPopupProps} from '@/Types/Components/HomeTypes';

const ModalPopup: React.FC<ModalPopupProps> = ({onClose}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  return (
    <Modal transparent onRequestClose={onClose} visible>
      <TouchableOpacity
        onPress={onClose}
        style={styles.dimTouch}
        activeOpacity={1}>
        <View style={styles.mainView}>
          <Image
            source={require('@assets/image/dummy.png')}
            style={styles.Image}
          />
          <View style={styles.footerButton}>
            <TouchableOpacity style={styles.buttonTouch}>
              <Text fontSize={`${16 * fontSize}`} color={Theme.color.blue_3D}>
                {t('neverLookAgain')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTouchRight}>
              <Text fontSize={`${16 * fontSize}`} color={Theme.color.white}>
                {t('close')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalPopup;

const styles = StyleSheet.create({
  dimTouch: {
    flex: 1,
    backgroundColor: '#0007',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image: {
    width: getPixel(250),
    height: getHeightPixel(200),
  },
  mainView: {
    width: getPixel(280),
    height: getHeightPixel(280),
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: Theme.color.white,
    paddingTop: getHeightPixel(20),
  },
  footerButton: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    width: getPixel(280),
    height: getHeightPixel(45),
    flexDirection: 'row',
  },
  buttonTouch: {
    width: '50%',
    height: '100%',
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.color.blue_3D,
  },
  buttonTouchRight: {
    width: '50%',
    height: '100%',
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.color.blue_3D,
    borderWidth: 1,
    borderColor: Theme.color.blue_3D,
  },
});
