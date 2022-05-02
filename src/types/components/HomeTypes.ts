import {FilterMenuTypes} from '@/Components/Home/ModalFilter';
import {FilterState} from '@/Page/Home/Search';
import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {categoryMenuTypes, ModalProps} from './global';

export interface CategoryCardProps {
  name: categoryMenuTypes['menu'];
  image?: any;
}

export interface ProductProps {
  title: string;
  location: string;
  time: string;
  viewCount: string;
  likeCount?: string;
  price: string;
  image?: any;
  isLike: boolean;
  status?: string;
  isList: boolean;
  isBorder?: boolean;
  onPress?: (idx: string, cate: string) => void;
  idx: string;
  cate: string;
}

export interface MenuBoxProps {
  onImage: any;
  OffImage: any;
  selectMenu: string;
  name: FooterProps['menu'];
  onPressMenu?: () => void;
}

export interface HeaderProps {
  isChange?: boolean;
}

export interface NavigationHeaderProps {
  title?: string;
}

export interface ImageSwiperProps {
  imageArray: Array<any>;
  setImageArray?: React.Dispatch<React.SetStateAction<Array<any>>>;
  width: number;
  height: number;
}

export interface ProductDetailShopProps {
  shopName: string;
  shopSubTitle: string;
  onPress?: () => void;
  image?: any;
}

export interface ProductListProps {
  isList: boolean;
  list?: Array<ProductApiTypes> | ProduetDetailOtherApiType['T'] | number;
  isBorder?: boolean;
  onPressItem?: (idx: string, cate: string) => void;
}

export interface SearchHeaderProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  keyword?: categoryMenuTypes['menu'];
  onPressCloseKeyword?: () => void;
  onSubmitEditing: () => void;
}

export interface SearchKeywordProps {
  onPressFilter: (event?: GestureResponderEvent) => void;
  onPressKeyword: (event?: GestureResponderEvent) => void;
}

export interface ModalFilterProps extends ModalProps {
  setFilter: any;
  filter: FilterState;
}
export interface ProductState {
  newProduct: boolean;
  Reaper: boolean;
  used: boolean;
  forParts: boolean;
}

export interface ModalKeywordProps extends ModalProps {
  keyword: string;
}

export interface LikeProductProps {
  title: string;
  price: string;
  image?: any;
  status?: string;
  isEdit: boolean;
  isSelectEdit?: boolean;
  onPress?: (idx: string, type: string) => void;
  idx: string;
  categoryNum: string;
}

export interface FooterProps {
  menu: 'home' | 'favorite' | 'chat' | 'profile';
}

export interface ModalMyPageProps extends ModalProps {}
export interface ModalUploadModalProps extends ModalProps {}

export interface ModalPopupProps extends ModalProps {}

// API

export interface ProductApiTypes {
  busi_check?: 'Y' | 'N' | null;
  pt_cate?: string | null;
  dist?: number | null;
  fin_status?: 'Y' | 'N' | 'R' | null; // 판매중 N, 예약중: R, 판매완료: Y
  like_count?: number | null;
  my_like?: 'Y' | 'N' | null;
  pt_file?: string | null;
  pt_idx?: string | null;
  pt_location?: string | null;
  pt_location_detail?: string | null;
  pt_price?: string | null;
  pt_time?: number | null;
  pt_time_type?: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year' | null;
  pt_title?: string | null;
  view_count?: number | null;
}

export type HomeProductListType = {
  T: {
    list: ProductApiTypes[] | null;
    total_page: number | null;
    tptal_count: number | null;
  } | null;
  D: {
    mt_idx: string | null;
    page: string | number;
  };
};

export type LikeListType = {
  T: {
    list?: LikeApiTypes[] | null;
    total_page?: number | null;
    tptal_count?: number | null;
  } | null;
  D: {
    mt_idx: string | null;
    page: string | number;
  };
};

interface LikeApiTypes {
  like_idx?: string;
  pt_file?: string;
  pt_price?: string;
  pt_title?: string;
  busi_check?: 'Y' | 'N';
  pt_cate?: string;
}

export interface ProduetDetailApiType {
  T: {
    file: string[] | [];
    pt_detail: string;
    pt_grade: string;
    pt_price_check: 'Y' | 'N';
    sell_idx: string;
    sell_memo: string;
    sell_name: string;
    sell_profile: string;
    sell_type: string;
    dist: number;
    like_count: number;
    my_like: 'Y' | 'N';
    pt_location: string;
    pt_location_detail: string;
    pt_price: string;
    pt_time: number;
    pt_time_type: 'now' | 'minute' | 'hour' | 'day' | 'month' | 'year';
    pt_title: string;
    view_count: number;
  } | null;
  D: {
    mt_idx: string | null;
    pt_idx: string;
  };
}

export interface ProduetDetailOtherApiType {
  // 상품 상세보기 하단 다른 판매 품목 보기
  T: Array<Omit<ProductApiTypes, 'like_count' | 'fin_status' | 'pt_cate' | 'busi_check'>> | null;
  D: {
    mt_idx: string | null;
    pt_idx: string;
  };
}
export interface ProductLike {
  // 상품 좋아요
  T: {
    data: {
      like: 'Y' | 'N';
    };
  } | null;
  D: {
    mt_idx: string | null;
    pt_idx: string;
  };
}

export interface KeywordAlarmAPi {
  // 키워드 알람
  T: {
    cnt?: number;
    list:
      | Array<{
          kt_idx: string;
          kt_title: string;
        }>
      | [];
  };
  D: {
    mt_idx: string | null;
  };
}

export interface KeywordAlarmCheckAPi {
  // 키워드 알람 체크 && 알람 셋팅
  T: {
    mt_keyword?: 'Y' | 'N';
  } | null;
  D: {
    mt_idx: string | null;
  };
}

export interface SearchLogApi {
  // 검색 로그 남기기
  T: {} | null;
  D: {
    mt_idx: string | null;
    search_txt: string;
  };
}

export interface SearchApi {
  // 검색
  T: {
    total_count?: number;
    total_page?: number;
    list: ProductApiTypes[] | [];
  };
  D: {
    mt_idx: string | null;
    search_txt: string;
    page?: number;
    category?: number;
    order?: 0 | 1 | 2 | 3; //  정렬(0:최신순, 1 가격 높, 2:가격 낮, 3: 거리순)
    s_price?: number;
    e_price?: number;
    grade?: string;
    pt_fin?: 'Y' | 'N';
  };
}

export interface RecentSearchTextApi {
  // 최근 검색어
  T:
    | []
    | {
        sl_idx: string;
        title: string;
      }[];
  D: {
    mt_idx: string | null;
  };
}

export interface PopularSearchTextApi {
  // 인기 검색어
  T:
    | []
    | {
        title: string;
      }[];
  D?: null;
}
export interface RecentAllDeleteApi {
  // 인기 검색어
  T: any;
  D?: {
    mt_idx: string | null;
  };
}

export interface RecentDeleteApi {
  // 인기 검색어
  T: any;
  D?: {
    mt_idx?: string | null;
    sl_idx?: string;
  };
}
