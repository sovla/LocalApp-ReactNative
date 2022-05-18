export interface KeywordAlarmListApi {
    // 공지사항 상세보기 API
    T: {
        list: {
            busi_check: 'N' | 'Y';
            dist: number;
            fin_status: 'N' | 'Y' | 'R';
            keyword_idx: string;
            like_count: number;
            pt_cate: string;
            pt_file: string;
            pt_idx: string;
            pt_location: string;
            pt_location_detail: string;
            pt_price: string;
            pt_time: string;
            pt_time_type: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year';
            pt_title: string;
            view_count: number;
        }[];
        total_page: number;
        tptal_count: number;
    } | null;
    D: {
        mt_idx: string;
    };
}
export interface AlarmType {
    al_idx: string;
    al_img: string;
    al_title: string;
    al_type: string;
    al_type_idx: string;
    al_time: string;
    al_time_type: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year';
    al_view: 'N' | 'Y';
}

export interface AlarmListApi {
    // 공지사항 상세보기 API
    T: {
        list: AlarmType[];
        total_page: number;
        tptal_count: number;
    } | null;
    D: {
        mt_idx: string;
    };
}

export interface AlarmDetailApi {
    // 공지사항 상세보기 API
    T: {
        al_content: string;
        al_time: string;
        al_time_type: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year';
        al_title: string;
        al_wdate: string;
    } | null;
    D: {
        mt_idx: string;
        al_idx: string;
    };
}
