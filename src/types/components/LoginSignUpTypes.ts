import {ModalProps} from './global';

export interface ModalAuthProps extends ModalProps {
  onPressRetry: () => void;
  tel: string;
  selectNum: string;
  isBusiness?: boolean;
}
