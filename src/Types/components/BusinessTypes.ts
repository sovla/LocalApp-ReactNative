import {ModalProps} from './global';

export interface ModalPhotoProps extends ModalProps {
  count?: number; // 선택가능한 이미지 갯수
  returnFn?: (
    image: {
      path: string; // 경로
      mime: string; // 타입
    }[],
  ) => void; // 리턴 되는 이미지
}
