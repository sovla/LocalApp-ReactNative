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
