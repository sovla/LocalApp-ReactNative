import React from 'react';
import {
  GestureResponderEvent,
  TextInputProps,
  TextProps,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {AnyStyledComponent} from 'styled-components';

export interface DefaultButtonProps extends TouchableOpacityProps {
  width?: string;
  height?: string;
  onPress?: () => void;
  content?: string;
  fontColor?: string;
  fontSize?: number;
}

export interface DefaultTextProps extends TextProps {
  color?: string;
  fontSize?: string;
  width?: string;
  height?: string;
  letterSpacing?: string;
  pd?: string;
  mg?: string;
  textDecoration?: string;
  textAlign?: string;
  bold?: boolean;
  medium?: boolean;
}

export interface ContainerProps {
  justifyContent?: string;
  alignItems?: string;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
}

export interface InputProps {
  value?: string;
  onChange?: (text: string) => void;
  PlaceHolderComponent?: any;
  errorText?: string;
  width?: number;
  height?: number;
  isLine?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  inputFontSize?: number;
  disabled?: boolean;
  ref?: any;
}

export interface LineProps {
  width?: number | 'auto' | '100%';
  height?: number;
  backgroundColor?: string;
  style?: ViewStyle;
  isGray?: boolean;
}

export interface CheckBoxProps {
  setIsOn: (event: GestureResponderEvent) => void;
  isOn: boolean;
  text: string;
  isBox?: boolean;
  disabled?: boolean;
}
export interface CheckBoxImageProps {
  isOn?: boolean;
  isBox?: boolean;
  isBlue?: boolean;
  isCheckImage?: boolean;
  width?: number;
  height?: number;
}

export interface ToggleProps {
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  isOn: boolean;
  width?: number;
  height?: number;
}

export interface ModalProps {
  onClose: (event?: GestureResponderEvent) => void | (() => void);
}

export interface ProductTypes {
  title: string;
  categoryMenu: categoryMenuTypes['menu'] | null;
  price: string;
  tag?: string | null;
  tier?: tierTypes['name'] | null;
  location?: string;
  pt_location_detail: string | null;
  pt_lat: number | null;
  pt_lng: number | null;
  content?: string;
  isNego?: boolean;
  imageFile: {
    path: string;
    mime: string;
    isLocal: boolean;
  }[];
  pt_brand?: string;
  pt_model?: string;
  pt_model_datail?: string;
  pt_color?: string;
  pt_year?: string;
  pt_kilo?: string;
  pt_disp?: string;
  pt_fuel?: string;
  pt_gear?: string;
  pt_door?: '2' | '4';
  pt_number?: string;
  pt_detail_option?: string;
  pt_history?: string;
  pt_owner?: 'Y' | 'N';
  carLocation?: {
    lc_idx: string; // 차량 위치
    lc_lat: string; // 차량 위치
    lc_lng: string; // 차량 위치
    lc_title: string; // 차량 위치
  };
}
export interface categoryMenuTypes {
  menu:
    | 'digital'
    | 'homeAppliances'
    | 'furniture'
    | 'baby'
    | 'householdGoods'
    | 'sports'
    | 'bag'
    | 'shoes'
    | 'watch'
    | 'accessory'
    | 'womanClothes'
    | 'manClothes'
    | 'game'
    | 'beauty'
    | 'pet'
    | 'book'
    | 'plant'
    | 'car'
    | 'motorcycle'
    | 'other'
    | 'donation'
    | 'buy';
}
export interface tierTypes {
  name: 'Ntier' | 'Rtier' | 'Stier' | 'Atier' | 'Btier' | 'Ctier' | 'Ftier';
  title: string;
  content: string;
  image?: any;
  ProductDetailName:
    | 'Classe N'
    | 'Classe R'
    | 'Classe S'
    | 'Classe A'
    | 'Classe B'
    | 'Classe C'
    | 'Classe F';
}

export interface openingHoursTypes {
  mon: {
    isOn: boolean;
    startTime: string;
    endTime: string;
  };
  tue: {
    isOn: boolean;
    startTime: string;
    endTime: string;
  };
  wed: {
    isOn: boolean;
    startTime: string;
    endTime: string;
  };
  thu: {
    isOn: boolean;
    startTime: string;
    endTime: string;
  };
  fri: {
    isOn: boolean;
    startTime: string;
    endTime: string;
  };
  sat: {
    isOn: boolean;
    startTime: string;
    endTime: string;
  };
  sun: {
    isOn: boolean;
    startTime: string;
    endTime: string;
  };
}
