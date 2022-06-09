export interface ProfileSellerReviewApi {
  // 판매상품 API
  T: {
    list: {
      pr_rate: number;
      pr_wdate: string;
      wr_profile: string;
      wr_name: string;
      pr_review: string;
    }[];
    total_count: number;
    total_rate: number;
  } | null;
  D: {
    mt_idx: string;
    sell_type: string;
    sell_idx: string;
  };
}

export interface ProfileSellerProductApi {
  T:
    | {
        busi_check: string;
        dist: number;
        like_count: number;
        pt_cate: string;
        pt_file: string;
        pt_idx: string;
        pt_location: string;
        pt_location_detail: string;
        pt_price: string;
        pt_time: number;
        pt_time_type: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year';
        pt_title: string;
        view_count: number;
      }[]
    | null;
  D: {
    mt_idx: string;
    sell_type: string;
    sell_idx: string;
    sell_status: 'Y' | 'N';
  };
}

export interface ProfileApi {
  T: {
    mt_country: string;
    mt_hp: string;
    mt_like: string;
    mt_memo: string;
    mt_name: string;
    mt_profile: string;
    mt_rate: number;
    mt_regdate_month: string;
    mt_regdate_year: string;
    mt_review: string;
    my_like_check: 'Y' | 'N';
  } | null;
  D: {
    mt_idx: string;
    sell_idx: string;
  };
}
export interface ProfileGetInformationApi {
  T: {
    mt_country: string;
    mt_hp: string;
    mt_like: string;
    mt_memo: string;
    mt_name: string;
    mt_profile: string;
    mt_birth: string;
    mt_email: string;
    mt_gender: 'M' | 'W';
    mt_hp_open: 'N' | 'Y';
    mt_uid: string;
  } | null;
  D: {
    mt_idx: string;
  };
}
