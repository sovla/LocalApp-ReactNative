import {ModalProps} from './global';

export interface ProductWhiteBoxProps {
  title?: string;
  price?: string;
  isComplete?: boolean;
  selectMenu: string;
}

export interface EditModalProps extends ModalProps {
  isBump?: boolean;
}

export interface ModalAlertProps extends ModalProps {
  title: string;
  content: string;
}

export interface ModalReviewRequestProps extends ModalProps {}
