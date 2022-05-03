export interface ReviewProps {
  image: any;
  name: string;
  star: number;
  date: string;
  review: string;
}

export interface MenuProps {
  menuList: Array<string>;
  selectMenu: string;
  setSelectMenu: React.Dispatch<React.SetStateAction<string>>;
}

export interface ProfileSellProductAPi {
  // 판매상품 API
  T:
    | {
        bump_up_check: 'Y' | 'N';
        bump_up_time: string;
        fin_status: 'Y' | 'N';
        pt_cate: string;
        pt_file: string;
        pt_idx: string;
        pt_price: string;
        pt_title: string;
      }[]
    | null;
  D: {
    mt_idx: string;
    type: 'Y' | 'N';
  };
}
