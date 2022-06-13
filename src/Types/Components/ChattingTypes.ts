import {ModalProps} from './global';

export interface ChattingProps {
    image: any;
    title: string;
    content: string;
    date: string;
    userName: string;
    isBuy: boolean;
    isBusiness: boolean;
}

export interface LocationChattingProps {
    date: string;
    content: string;
    isCheck?: number;
    isMy?: boolean;
    profileImage: string;
    region: {
        longitude: string;
        latitude: string;
    };
}

export interface OtherChattingProps {
    content: string;
    date: string;
    profileImage: string;
}
export interface MyChattingProps {
    date: string;
    content: string;
    isCheck?: number;
}

export interface OtherChattingProps {
    isMyProduct?: boolean;
}

export interface ModalChattingSettingProps extends ModalProps {
    chatInfo: {
        chat_idx: string;
        pt_idx: string;
    };
    initData: {
        isAlarm: boolean;
        isBlock: boolean;
    };
}
export interface ModalAlertViewProps extends ModalProps {
    title: string;
    content: string;
    onPressConfirm: () => void;
    isBang?: boolean;
    onPressCancle: () => void;
}

export interface ReportApi {
    // 신고 API

    mt_idx: string;
    dl_type: 'P' | 'M' | 'S';
    pt_idx: string;
    dl_check?: string;
    dl_memo: string;
}
