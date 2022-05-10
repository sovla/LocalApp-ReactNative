import {ModalProps} from './global';

export interface ProductWhiteBoxProps {
    title?: string;
    price?: string;
    isComplete?: boolean;
    selectMenu: string;
    image: any;
    item: {
        bump_up_time: string;
        fin_status: 'Y' | 'N';
        bump_up_check: 'Y' | 'N';
        pt_cate: string;
        pt_file: string;
        pt_idx: string;
        pt_price: string;
        pt_title: string;
    };
}

export interface EditModalProps extends ModalProps {
    isBump?: boolean;
    item: {
        bump_up_time: string;
        fin_status: 'Y' | 'N';
        pt_cate: string;
        pt_file: string;
        pt_idx: string;
        pt_price: string;
        pt_title: string;
        bump_up_check: 'Y' | 'N';
    };
}

export interface ModalAlertProps extends ModalProps {
    title: string;
    content: string;
}

export interface ModalReviewRequestProps extends ModalProps {}
