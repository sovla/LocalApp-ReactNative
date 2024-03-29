export interface ProductInfoApi {
    T: {
        pt_brand: string;
        pt_cate: string;
        pt_color: string;
        pt_detail: string;
        pt_detail_option: string[];
        pt_disp: string;
        pt_door: '2' | '4';
        pt_file: string[];
        pt_fuel: string;
        pt_gear: string;
        pt_grade: string;
        pt_history: string[];
        pt_kilo: string;
        pt_lat: string;
        pt_lng: string;
        pt_location: string;
        pt_location_detail: string;
        pt_model: string;
        pt_model_detail: string;
        pt_number: string;
        pt_owner: 'N' | 'Y';
        pt_price: string;
        pt_price_check: 'N' | 'Y';
        pt_tag: string[];
        pt_title: string;
        pt_year: string;
        pt_idx?: string;
    } | null;
    D: {
        mt_idx: string;
        pt_idx?: string;
    };
}

export interface ProductSaleListApi {
    T:
        | {
              bump_up_time: string;
              fin_status: 'Y' | 'N' | 'R';
              pt_cate: string;
              pt_file: string;
              pt_idx: string;
              pt_price: string;
              pt_title: string;
              bump_up_check: 'Y' | 'N';
          }[]
        | null;
    D: {
        mt_idx: string;
    };
}
export interface ProductFinishListApi {
    T:
        | {
              pt_idx: string;
              pt_price: string;
              pt_title: string;
              li_idx: string;
              review_check: 'Y' | 'N' | 'R';
              rewrite_check: 'N' | 'Y';
              update: string;
          }[]
        | null;
    D: {
        mt_idx: string;
    };
}
