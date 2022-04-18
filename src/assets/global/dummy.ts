import {
  categoryMenuTypes,
  openingHoursTypes,
  ProductTypes,
  tierTypes,
} from '@/Types/Components/global';

export const categoryMenu: {
  name: categoryMenuTypes['menu'];
  image: any;
}[] = [
  {
    name: 'digital',
    image: require('@assets/image/digital_color.png'),
  },
  {
    name: 'homeAppliances',
    image: require('@assets/image/home_appliances_color.png'),
  },
  {
    name: 'furniture',
    image: require('@assets/image/furniture_color.png'),
  },
  {
    name: 'baby',
    image: require('@assets/image/baby.png'),
  },
  {
    name: 'householdGoods',
    image: require('@assets/image/household_goods_color.png'),
  },
  {
    name: 'sports',
    image: require('@assets/image/sports.png'),
  },
  {
    name: 'bag',
    image: require('@assets/image/bag.png'),
  },
  {
    name: 'shoes',
    image: require('@assets/image/shoes.png'),
  },
  {
    name: 'watch',
    image: require('@assets/image/watch.png'),
  },
  {
    name: 'accessory',
    image: require('@assets/image/accessory.png'),
  },
  {
    name: 'womanClothes',
    image: require('@assets/image/woman_clothes.png'),
  },
  {
    name: 'manClothes',
    image: require('@assets/image/man_clothes.png'),
  },
  {
    name: 'game',
    image: require('@assets/image/game.png'),
  },
  {
    name: 'beauty',
    image: require('@assets/image/beauty.png'),
  },
  {
    name: 'pet',
    image: require('@assets/image/pet.png'),
  },
  {
    name: 'book',
    image: require('@assets/image/book.png'),
  },
  {
    name: 'plant',
    image: require('@assets/image/plant.png'),
  },
  {
    name: 'car',
    image: require('@assets/image/car.png'),
  },
  {
    name: 'motorcycle',
    image: require('@assets/image/motorcycle.png'),
  },
  {
    name: 'other',
    image: require('@assets/image/other.png'),
  },
  {
    name: 'donation',
    image: require('@assets/image/donation.png'),
  },
  {
    name: 'buy',
    image: require('@assets/image/buy.png'),
  },
];

export const dayList = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export const languageList = ['br', 'es', 'en', 'ko'];

export const tierList: tierTypes[] = [
  {
    name: 'Ntier',
    title: 'NtierTitle',
    content: 'NtierContent',
    image: require('@assets/image/n_tier.png'),
  },
  {
    name: 'Rtier',
    title: 'RtierTitle',
    content: 'RtierContent',
    image: require('@assets/image/r_tier.png'),
  },
  {
    name: 'Stier',
    title: 'StierTitle',
    content: 'StierContent',
    image: require('@assets/image/s_tier.png'),
  },
  {
    name: 'Atier',
    title: 'AtierTitle',
    content: 'AtierContent',
    image: require('@assets/image/a_tier.png'),
  },
  {
    name: 'Btier',
    title: 'BtierTitle',
    content: 'BtierContent',
    image: require('@assets/image/b_tier.png'),
  },
  {
    name: 'Ctier',
    title: 'CtierTitle',
    content: 'CtierContent',
    image: require('@assets/image/c_tier.png'),
  },
  {
    name: 'Ftier',
    title: 'FtierTitle',
    content: 'FtierContent',
  },
];

export const productDummy: ProductTypes = {
  title: 'Mac book Air 2020',
  categoryMenu: 'car',
  price: 'R$ 4.500,00',
  tier: 'Atier',
  tag: '#Apple  #Mac Book  # Mac book Air',
  content: '하이',
  imageArray: [
    require('@assets/image/dummy.png'),
    require('@assets/image/dummy.png'),
    require('@assets/image/dummy.png'),
  ],
  isNego: false,
  location: 'Bom Retiro',
};

export const openingHoursInit: openingHoursTypes = {
  mon: {
    isOn: false,
    startTime: '00:00',
    endTime: '00:00',
  },
  tue: {
    isOn: false,
    startTime: '00:00',
    endTime: '00:00',
  },
  wed: {
    isOn: false,
    startTime: '00:00',
    endTime: '00:00',
  },
  thu: {
    isOn: false,
    startTime: '00:00',
    endTime: '00:00',
  },
  fri: {
    isOn: false,
    startTime: '00:00',
    endTime: '00:00',
  },
  sat: {
    isOn: false,
    startTime: '00:00',
    endTime: '00:00',
  },
  sun: {
    isOn: false,
    startTime: '00:00',
    endTime: '00:00',
  },
};
