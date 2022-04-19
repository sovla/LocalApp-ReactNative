import React from 'react';
import {GestureResponderEvent} from 'react-native';
import {ModalProps} from './global';

export interface CategoryCardProps {
  name: string;
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
}

export interface MenuBoxProps {
  onImage: any;
  OffImage: any;
  selectMenu: string;
  name: FooterProps['menu'];
  onPressMenu?: () => void;
}

export interface HeaderProps {}

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
}

export interface ProductListProps {
  isList: boolean;
  list?: Array<any>;
  isBorder?: boolean;
}

export interface SearchHeaderProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
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
}

export interface FooterProps {
  menu: 'home' | 'favorite' | 'chat' | 'profile';
}

export interface ModalMyPageProps extends ModalProps {}
export interface ModalUploadModalProps extends ModalProps {}
