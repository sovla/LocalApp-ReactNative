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
export type userChat =
    | {
          msg_type: 'text';
          content: string;
          msg_idx: string;
          msg_date: string;
          msg_show: 'Y' | 'N';
          userIdx: string;
          userProfile: string;
      }
    | {
          msg_type: 'location';
          lat: string;
          lng: string;
          location: string;
          msg_date: string;
          msg_idx: string;
          msg_show: 'N' | 'Y';
          userIdx: string;
          userProfile: string;
      }
    | {
          msg_type: 'file';
          img: string;
          msg_date: string;
          msg_idx: string;
          msg_show: 'N' | 'Y';

          userIdx: string;
          userProfile: string;
      };
export type dateChat = {
    userIdx: string;
    msg_idx: undefined;
    content: string;
};

export interface ChattingDetailListApi {
    // 채팅방 내역 리스트
    T: {
        total: number;
        list: (userChat | dateChat)[];
    } | null;
    D: {
        mt_idx: string;
        chat_idx: string;
        page: number;
    };
}
export interface ChattingSendApi {
    // 채팅 메시지 전송 API
    T: {
        total: number;
        list: (userChat | dateChat)[];
    } | null;
    D:
        | {
              mt_idx: string;
              chat_idx: string;
              chat_type?: 'text';
              content?: string;
              imageField?: 'chat_file';
          }
        | {
              mt_idx: string;
              chat_idx: string;
              chat_type?: 'file';
              chat_file?: {
                  path: string;
                  mime: string;
              };
              imageField?: 'chat_file';
          }
        | {
              mt_idx: string;
              chat_idx: string;
              chat_type?: 'location';
              lat?: number | string;
              lng?: number | string;
              location_detail?: string;
              imageField?: 'chat_file';
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
        chat_status: 'Y' | 'N';
        product_price: string;
        my_blind_check: 'N' | 'Y';
        my_push_check: 'Y' | 'N';
        other_blind_check: 'N' | 'Y';
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

export interface ChattingRoomListApi {
    // 채팅방 정보 불러오기
    T: {
        list: {
            busi_check: 'Y' | 'N';
            chat_idx: string;
            chat_sign: 'buy';
            chat_time: string;
            last_msg: string;
            mt_name: string;
            product_file: string;
            product_title: string;
        }[];
        total_page: number;
        tptal_page: number;
    } | null;
    D: {
        mt_idx: string;
        type: 0 | 1;
    };
}
