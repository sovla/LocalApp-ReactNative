import {channerId} from '@/Page/Setting/SettingAlarm';
import {ModalProps} from './global';

export interface FAQItemProps {
    title: string;
    isSelect?: boolean;
    answer: string;
    setSelect: () => void;
}

export interface setAlramPushApi {
    mt_idx: string;
    mt_message: 'Y' | 'N';
    mt_message_id: channerId['type'];
    mt_vibrate: 'Y' | 'N';
    mt_pushcon: 'Y' | 'N';
}

export type ContactType = 'user' | 'ad' | 'report' | 'error' | 'other';

export interface ModalContactProps extends ModalProps {
    onPressItem: (type: ContactType) => void;
}
