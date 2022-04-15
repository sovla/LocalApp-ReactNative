import {ModalProps} from './global';

export interface ChattingProps {
  image: any;
  title: string;
  content: string;
  date: string;
}

export interface LocationChattingProps {
  date: string;
  content: string;
  isCheck?: number;
  isMy?: boolean;
}

export interface OtherChattingProps {
  content: string;
  date: string;
}
export interface MyChattingProps {
  date: string;
  content: string;
  isCheck?: number;
}

export interface OtherChattingProps {
  isMyProduct?: boolean;
}

export interface ModalChattingSettingProps extends ModalProps {}
export interface ModalAlertViewProps extends ModalProps {
  title: string;
  content: string;
  onPressConfirm: () => void;
  isBang?: boolean;
  onPressCancle: () => void;
}
