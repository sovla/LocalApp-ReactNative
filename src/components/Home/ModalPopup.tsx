import {
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import Theme from '@/assets/global/Theme';
import {getHeightPixel, getPixel} from '@/Util/pixelChange';
import AutoHeightImage from 'react-native-auto-height-image';
import {Text} from '../Global/text';
import {useTranslation} from 'react-i18next';
import {useAppSelector} from '@/Hooks/CustomHook';
import {ModalPopupProps} from '@/Types/Components/HomeTypes';
import {ScrollView} from 'react-native-gesture-handler';

const ModalPopup: React.FC<ModalPopupProps> = ({onClose}) => {
  const {t} = useTranslation();
  const fontSize = useAppSelector(state => state.fontSize.value);
  const onPressNeverLookAgain = useCallback(() => {
    //  추가필요 다신보지않기
    onClose();
  }, []);

  return (
    <Modal transparent onRequestClose={onClose} visible>
      <View style={styles.dimTouch}>
        <View style={styles.mainView}>
          <ScrollView
            style={{
              width: getPixel(280),
            }}
            horizontal
            pagingEnabled>
            {[1, 2, 3, 4].map(v => {
              return (
                <Image
                  source={require('@assets/image/dummy.png')}
                  style={styles.Image}
                />
              );
            })}
          </ScrollView>
          <View style={styles.footerButton}>
            <TouchableOpacity
              onPress={onPressNeverLookAgain}
              style={styles.buttonTouch}>
              <Text fontSize={`${12 * fontSize}`} color={Theme.color.black}>
                {t('neverLookAgain')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.buttonTouchRight}>
              <Text fontSize={`${12 * fontSize}`} color={Theme.color.black}>
                {t('close')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    width: getPixel(280),
    height: getHeightPixel(235),
  },
  mainView: {
    width: getPixel(280),
    height: getHeightPixel(280),
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: Theme.color.white,
  },
  footerButton: {
    width: getPixel(280),
    height: getHeightPixel(45),
    flexDirection: 'row',
    backgroundColor: Theme.color.white,
  },
  buttonTouch: {
    width: '50%',
    height: '100%',
    borderBottomLeftRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Theme.color.whiteGray_E5,
    backgroundColor: Theme.color.white,
  },
  buttonTouchRight: {
    width: '50%',
    height: '100%',
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.color.white,
    borderWidth: 0.5,
    borderColor: Theme.color.whiteGray_E5,
  },
});
