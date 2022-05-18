interface chatDetail {
    content: string;
    img: string;
    lat: string;
    lng: string;
    location: string;
    msg_date: string;
    msg_idx: string;
    msg_show: 'N' | 'Y';
    msg_type: 'location' | 'text' | 'file' | 'date';
    userIdx: string;
    userProfile: string;
    idx: string;
}
export type userChat = Omit<chatDetail, 'idx'>;
export type dateChat = Pick<chatDetail, 'content' | 'userIdx'>;

export interface ChattingDetailListApi {
    // 채팅방 내역 리스트
    T: {
        total: number;
        list: (userChat | dateChat)[];
    } | null;
    D: {
        mt_idx: string;
        chat_idx: string;
    };
}

export interface ChattingRoomInformationApi {
    // 채팅방 정보 받아오는 api
    T: {
        chat_idx: string;
        my_uid: string;
        other_uid: string;
        product_file: string;
        product_name: string;
        pt_idx: string;
        sell_idx: string;
        sell_name: string;
        sell_type: '0' | '1';
        sendbird_chat_url: string;
    } | null;
    D: {
        mt_idx: string;
        chat_idx: string;
    };
}

export interface ChatAlarmSettingApi {
    // 알람셋팅
    T: {
        data: {
            mci_push: 'Y' | 'N';
        };
    };
    D: {
        mt_idx: string;
        chat_idx: string;
        push_set: 'Y' | 'N';
    };
}
export interface ChatBlindSettingApi {
    // 차단셋팅
    T: {
        data: {
            mci_push: 'Y' | 'N';
        };
    };
    D: {
        mt_idx: string;
        chat_idx: string;
        blind_check: 'Y' | 'N';
    };
}

export interface ChatHistoryDeleteApi {
    // 채팅 대화 내용 지우기
    T: {
        data: {
            mci_push: 'Y' | 'N';
        };
    };
    D: {
        mt_idx: string;
        chat_idx: string;
    };
}

export interface ChatHistoryExportApi {
    // 채팅 대화 내용 지우기
    T: {
        data: {
            mci_push: 'Y' | 'N';
        };
    };
    D: {
        mt_idx: string;
        chat_idx: string;
    };
}
