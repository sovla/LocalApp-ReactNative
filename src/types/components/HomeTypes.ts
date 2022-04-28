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
  setImageArray: React.Dispatch<React.SetStateAction<Array<any>>>;
  width: number;
  height: number;
}

export interface ProductDetailShopProps {
  shopName: string;
  shopSubTitle: string;
  onPress?: () => void;
}

export interface ProductListProps {
  isList: boolean;
  list?: Array<ProductApiTypes>;
  isBorder?: boolean;
  onPressItem?: (idx: string, cate: string) => void;
}
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

export interface SearchHeaderProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  keyword?: categoryMenuTypes['menu'];
  onPressCloseKeyword?: () => void;
}

export interface SearchKeywordProps {
  onPressFilter: (event?: GestureResponderEvent) => void;
  onPressKeyword: (event?: GestureResponderEvent) => void;
}

export interface ModalFilterProps extends ModalProps {}
export interface ProductState {
  newProduct: boolean;
  Reaper: boolean;
  used: boolean;
  forParts: boolean;
  donation: boolean;
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
