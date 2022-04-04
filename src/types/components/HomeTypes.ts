import React from 'react';

export interface CategoryCardProps {
  name: string;
  image?: any;
}

export interface ProductProps {
  title: string;
  location: string;
  time: string;
  viewCount: string;
  likeCount: string;
  price: string;
  image: any;
  isLike: boolean;
  status?: string;
  isList: boolean;
}

export interface MenuBoxProps {
  onImage: any;
  OffImage: any;
  selectMenu: string;
  name: string;
  setSelectMenu: React.Dispatch<React.SetStateAction<string>>;
}

export interface HeaderProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  isModal: boolean;
}
