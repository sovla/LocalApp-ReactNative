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
  T: any | null;
  D: {
    mt_idx: string;
    type: 'Y' | 'N';
  };
}
