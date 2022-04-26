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
  onPress?: (item?: any) => void;
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
  list?: Array<any>;
  isBorder?: boolean;
  onPressItem?: (item: ProductProps) => void;
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
  onPress?: () => void;
}

export interface FooterProps {
  menu: 'home' | 'favorite' | 'chat' | 'profile';
}

export interface ModalMyPageProps extends ModalProps {}
export interface ModalUploadModalProps extends ModalProps {}

export interface ModalPopupProps extends ModalProps {}
