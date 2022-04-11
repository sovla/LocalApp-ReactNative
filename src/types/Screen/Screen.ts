import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

type Screen = {
  OnBoarding1: StackScreenProps<Screen> | undefined;
  OnBoarding2: StackScreenProps<Screen> | undefined;
  OnBoarding3: StackScreenProps<Screen> | undefined;
  AppPermission: StackScreenProps<Screen> | undefined;
  Login: StackScreenProps<Screen> | undefined;
  LoginComplete: StackScreenProps<Screen> | undefined;
  SignUp: StackScreenProps<Screen> | undefined;
  SignUpTOS: StackScreenProps<Screen> | undefined;
  SignUpForm: StackScreenProps<Screen> | undefined;
  SignUpPhoto: StackScreenProps<Screen> | undefined;
  SignUpComplete: StackScreenProps<Screen> | undefined;
  Home: StackScreenProps<Screen> | undefined;
  LocationChange: StackScreenProps<Screen> | undefined;
  ProductDetail: StackScreenProps<Screen> | undefined;
  Search: StackScreenProps<Screen> | undefined;
  SearchDetail: StackScreenProps<Screen> | undefined;
  MyCategory: StackScreenProps<Screen> | undefined;
  KeywordAlarm: StackScreenProps<Screen> | undefined;
  LikeList: StackScreenProps<Screen> | undefined;
  ChattingHome: StackScreenProps<Screen> | undefined;
  ChattingDetail: StackScreenProps<Screen> | undefined;
  ChattingLocation: StackScreenProps<Screen> | undefined;
  ReportCategory: StackScreenProps<Screen> | undefined;
  ReportDetail: StackScreenProps<Screen> | undefined;
  ProfileHome: StackScreenProps<Screen> | undefined;
  ProfileDetail: StackScreenProps<Screen> | undefined;
  ProfileSellerReview: StackScreenProps<Screen> | undefined;
  ReviewWrite: StackScreenProps<Screen> | undefined;
  ProfileSellProduct: StackScreenProps<Screen> | undefined;
  BusinessProfile: StackScreenProps<Screen> | undefined;
  BusinessProfileMenu: StackScreenProps<Screen> | undefined;
  BusinessProfileSetting: StackScreenProps<Screen> | undefined;
  BusinessProfileBanner: StackScreenProps<Screen> | undefined;
  BusinessSignUp: StackScreenProps<Screen> | undefined;
  BusinessForm: StackScreenProps<Screen> | undefined;
  BusinessAddress: StackScreenProps<Screen> | undefined;
  BusinessLocation: StackScreenProps<Screen> | undefined;
  BusinessOpeningHours: StackScreenProps<Screen> | undefined;
  Notice: StackScreenProps<Screen> | undefined;
  AlarmList: StackScreenProps<Screen> | undefined;
  AlarmDetail: StackScreenProps<Screen> | undefined;
  MyProduct: StackScreenProps<Screen> | undefined;
  ProductUpdate: StackScreenProps<Screen> | undefined;
  ProductPhoto: StackScreenProps<Screen> | undefined;
  ProductCategory: StackScreenProps<Screen> | undefined;
  ProductTag: StackScreenProps<Screen> | undefined;
  ProductTier: StackScreenProps<Screen> | undefined;
  ProductLocation: StackScreenProps<Screen> | undefined;
  Setting: StackScreenProps<Screen> | undefined;
  SettingPrivacy: StackScreenProps<Screen> | undefined;
  SettingDeleteAccount: StackScreenProps<Screen> | undefined;
  SettingAlarm: StackScreenProps<Screen> | undefined;
  SettingChatting: StackScreenProps<Screen> | undefined;
  SettingLanguage: StackScreenProps<Screen> | undefined;
  ServiceCenter: StackScreenProps<Screen> | undefined;
  FAQ: StackScreenProps<Screen> | undefined;
  ToU: StackScreenProps<Screen> | undefined;
  PrivacyPolicy: StackScreenProps<Screen> | undefined;
  ProductComplete: StackScreenProps<Screen> | undefined;
  ProductCompleteConfirm: StackScreenProps<Screen> | undefined;
  CarRegister: StackScreenProps<Screen> | undefined;
  CarBrand: StackScreenProps<Screen> | undefined;
  CarModel: StackScreenProps<Screen> | undefined;
  CarYear: StackScreenProps<Screen> | undefined;
  CarFuel: StackScreenProps<Screen> | undefined;
  CarGear: StackScreenProps<Screen> | undefined;
  CarEndNumber: StackScreenProps<Screen> | undefined;
  CarLocation: StackScreenProps<Screen> | undefined;
  Menu: StackScreenProps<Screen> | undefined;
  SignUpToS: StackScreenProps<Screen> | undefined;
  ProductTierGuide: StackScreenProps<Screen> | undefined;
};

export default Screen;

export type ProfileScreenNavigationProp = StackNavigationProp<Screen>;