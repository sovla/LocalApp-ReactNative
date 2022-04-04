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
