export interface BusinessProfileAPi {
    // 비즈니스 프로필 불러오기
    T: {
        banner_list: string[];
        busi_all_open: 'N' | 'Y';
        busi_cell_country: string;
        busi_cell_number: string;
        busi_facebook: string;
        busi_insta: string;
        busi_like: string;
        busi_location: string;
        busi_location_detail: string;
        busi_memo: string;
        busi_name: string;
        busi_open_list: {
            busi_mon_check: 'N' | 'Y';
            busi_mon_end: string;
            busi_mon_start: string;
            busi_pri_check: 'N' | 'Y';
            busi_pri_end: string;
            busi_pri_start: string;
            busi_sat_check: 'N' | 'Y';
            busi_sat_end: string;
            busi_sat_start: string;
            busi_sun_check: 'N' | 'Y';
            busi_sun_end: string;
            busi_sun_start: string;
            busi_thur_check: 'N' | 'Y';
            busi_thur_end: string;
            busi_thur_start: string;
            busi_tue_check: 'N' | 'Y';
            busi_tue_end: string;
            busi_tue_start: string;
            busi_wed_check: 'N' | 'Y';
            busi_wed_end: string;
            busi_wed_start: string;
        };
        busi_profile: string;
        busi_rate: number;
        busi_tel_country: string;
        busi_tel_number: string;
        busi_website: string;
        busi_whats: string;
        my_like_check: 'Y' | 'N';
    } | null;
    D: {
        mt_idx: string;
        sell_idx: string;
    };
}
export interface BusinessProfileLikeApi {
    // 공지사항 상세보기 API

    mt_idx: string;
    sell_idx: string;
    sell_type: '1' | '0';
}

export interface BusinessProfileInformation {
    busi_all_open: 'N' | 'Y';
    busi_cell_country: string;
    busi_cell_number: string;
    busi_facebook: string;
    busi_insta: string;
    busi_location: string;
    busi_location_detail: string;
    busi_mon_check: 'N' | 'Y';
    busi_mon_end: string;
    busi_mon_start: string;
    busi_pri_check: 'N' | 'Y';
    busi_pri_end: string;
    busi_pri_start: string;
    busi_sat_check: 'N' | 'Y';
    busi_sat_end: string;
    busi_sat_start: string;
    busi_sun_check: 'N' | 'Y';
    busi_sun_end: string;
    busi_sun_start: string;
    busi_thur_check: 'N' | 'Y';
    busi_thur_end: string;
    busi_thur_start: string;
    busi_tue_check: 'N' | 'Y';
    busi_tue_end: string;
    busi_tue_start: string;
    busi_wed_check: 'N' | 'Y';
    busi_wed_end: string;
    busi_wed_start: string;
    busi_tel_country: string;
    busi_tel_number: string;
    busi_website: string;
    busi_whats: string;
    busi_cnpj: string;
    busi_file: string;
    busi_info: string;
    busi_lat: string;
    busi_lng: string;
    busi_title: string;
}

export interface BusinessProfileInfoAPi {
    // 비즈니스 프로필 수정 불러오기
    T: BusinessProfileInformation | null;
    D: {
        mt_idx: string;
    };
}

export interface BusinessBannerApi {
    // 비즈니스 배너불러오기
    T: string[] | null;
    D: {
        mt_idx: string;
    };
}

export interface BusinessPhotoChangeApi {
    mt_idx: string;
    busi_file: {
        path: string;
        mime: string;
    } | null;
    imageField: 'busi_file';
}
export interface BusinessSignUpApi {
    mt_idx: string;
    busi_title: string;
    busi_cnpj?: string;
    busi_info: string;
    hp_open_check: 'Y' | 'N' | null;
    busi_location: string;
    busi_location_detail: string;
    busi_lat: string;
    busi_lng: string;
    busi_tel_country: string;
    busi_tel_number: string;
    busi_cell_country: string;
    busi_cell_number: string;
    busi_all_open: 'Y' | 'N';
    busi_mon_check: 'N' | 'Y' | null;
    busi_mon_end: string;
    busi_mon_start: string;
    busi_pri_check: 'N' | 'Y' | null;
    busi_pri_end: string | null;
    busi_pri_start: string | null;
    busi_sat_check: 'N' | 'Y' | null;
    busi_sat_end: string | null;
    busi_sat_start: string | null;
    busi_sun_check: 'N' | 'Y' | null;
    busi_sun_end: string | null;
    busi_sun_start: string | null;
    busi_thur_check: 'N' | 'Y' | null;
    busi_thur_end: string | null;
    busi_thur_start: string | null;
    busi_tue_check: 'N' | 'Y' | null;
    busi_tue_end: string | null;
    busi_tue_start: string | null;
    busi_wed_check: 'N' | 'Y' | null;
    busi_wed_end: string | null;
    busi_wed_start: string | null;
    busi_website: string;
    busi_facebook: string;
    busi_insta: string;
    busi_whats: string;
}
