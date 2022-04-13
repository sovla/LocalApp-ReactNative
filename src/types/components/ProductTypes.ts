import {ModalProps} from './global';

export interface ProductWhiteBoxProps {
  title?: string;
  price?: string;
  onIsEditProduct: () => void;
}

export interface EditModalProps extends ModalProps {
  isBump?: boolean;
}
