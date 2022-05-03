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

export const rangeList = ['0km', '5km', '10km', '20km', '40km'];

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

export const tierReverseList: tierTypes[] = [
  {
    name: 'Ftier',
    title: 'FtierTitle',
    content: 'FtierContent',
  },
  {
    name: 'Ctier',
    title: 'CtierTitle',
    content: 'CtierContent',
    image: require('@assets/image/c_tier.png'),
  },
  {
    name: 'Btier',
    title: 'BtierTitle',
    content: 'BtierContent',
    image: require('@assets/image/b_tier.png'),
  },
  {
    name: 'Atier',
    title: 'AtierTitle',
    content: 'AtierContent',
    image: require('@assets/image/a_tier.png'),
  },
  {
    name: 'Stier',
    title: 'StierTitle',
    content: 'StierContent',
    image: require('@assets/image/s_tier.png'),
  },
  {
    name: 'Rtier',
    title: 'RtierTitle',
    content: 'RtierContent',
    image: require('@assets/image/r_tier.png'),
  },
  {
    name: 'Ntier',
    title: 'NtierTitle',
    content: 'NtierContent',
    image: require('@assets/image/n_tier.png'),
  },
];

export const productDummy: ProductTypes = {
  title: '',
  categoryMenu: null,
  price: '',
  tier: null,
  tag: null,
  content: '',
  isNego: false,
  location: '',
  imageFile: [],
  pt_lat: null,
  pt_lng: null,
  pt_location_detail: null,

  // 차량용 추가 데이터
  pt_brand: undefined,
  pt_model: undefined,
  pt_model_datail: undefined,
  pt_color: undefined,
  pt_year: undefined,
  pt_kilo: undefined,
  pt_disp: undefined,
  pt_fuel: undefined,
  pt_gear: undefined,
  pt_door: undefined,
  pt_number: undefined,
  pt_detail_option: undefined,
  pt_history: undefined,
  pt_owner: undefined,
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

export const countryNumber = [
  {
    label: 'Mexico',
    countryName: 'Mexico',
    value: '+52',
  },
  {
    label: 'Brazil',
    countryName: 'Brazil',
    value: '+55',
  },
  {
    label: 'Argentina',
    countryName: 'Argentina',
    value: '+54',
  },
  {
    label: 'Uruguay',
    countryName: 'Uruguay',
    value: '+598',
  },
  {
    label: 'Chile',
    countryName: 'Chile',
    value: '+56',
  },
  {
    label: 'Paraguay',
    countryName: 'Paraguay',
    value: '+595',
  },
  {
    label: 'Peru',
    countryName: 'Peru',
    value: '+51',
  },
];

export const TimeHalfList = [
  {label: '00:00', value: '00:00'},
  {label: '00:30', value: '00:30'},
  {label: '01:00', value: '01:00'},
  {label: '01:30', value: '01:30'},
  {label: '02:00', value: '02:00'},
  {label: '02:30', value: '02:30'},
  {label: '03:00', value: '03:00'},
  {label: '03:30', value: '03:30'},
  {label: '04:00', value: '04:00'},
  {label: '04:30', value: '04:30'},
  {label: '05:00', value: '05:00'},
  {label: '05:30', value: '05:30'},
  {label: '06:00', value: '06:00'},
  {label: '06:30', value: '06:30'},
  {label: '07:00', value: '07:00'},
  {label: '07:30', value: '07:30'},
  {label: '08:00', value: '08:00'},
  {label: '08:30', value: '08:30'},
  {label: '09:00', value: '09:00'},
  {label: '09:30', value: '09:30'},
  {label: '10:00', value: '10:00'},
  {label: '10:30', value: '10:30'},
  {label: '11:00', value: '11:00'},
  {label: '11:30', value: '11:30'},
  {label: '12:00', value: '12:00'},
  {label: '12:30', value: '12:30'},
  {label: '13:00', value: '13:00'},
  {label: '13:30', value: '13:30'},
  {label: '14:00', value: '14:00'},
  {label: '14:30', value: '14:30'},
  {label: '15:00', value: '15:00'},
  {label: '15:30', value: '15:30'},
  {label: '16:00', value: '16:00'},
  {label: '16:30', value: '16:30'},
  {label: '17:00', value: '17:00'},
  {label: '17:30', value: '17:30'},
  {label: '18:00', value: '18:00'},
  {label: '18:30', value: '18:30'},
  {label: '19:00', value: '19:00'},
  {label: '19:30', value: '19:30'},
  {label: '20:00', value: '20:00'},
  {label: '20:30', value: '20:30'},
  {label: '21:00', value: '21:00'},
  {label: '21:30', value: '21:30'},
  {label: '22:00', value: '22:00'},
  {label: '22:30', value: '22:30'},
  {label: '23:00', value: '23:00'},
  {label: '23:30', value: '23:30'},
];

export const TimeList = [
  {label: '00:00', value: '00:00'},
  {label: '01:00', value: '01:00'},
  {label: '02:00', value: '02:00'},
  {label: '03:00', value: '03:00'},
  {label: '04:00', value: '04:00'},
  {label: '05:00', value: '05:00'},
  {label: '06:00', value: '06:00'},
  {label: '07:00', value: '07:00'},
  {label: '08:00', value: '08:00'},
  {label: '09:00', value: '09:00'},
  {label: '10:00', value: '10:00'},
  {label: '11:00', value: '11:00'},
  {label: '12:00', value: '12:00'},
  {label: '13:00', value: '13:00'},
  {label: '14:00', value: '14:00'},
  {label: '15:00', value: '15:00'},
  {label: '16:00', value: '16:00'},
  {label: '17:00', value: '17:00'},
  {label: '18:00', value: '18:00'},
  {label: '19:00', value: '19:00'},
  {label: '20:00', value: '20:00'},
  {label: '21:00', value: '21:00'},
  {label: '22:00', value: '22:00'},
  {label: '23:00', value: '23:00'},
];
