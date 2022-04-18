import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {categoryMenuTypes, ProductTypes, tierTypes} from '../Components/global';

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
  ReportDetail: {
    reportType: 'prohibited' | 'unmanned' | 'scam';
  };
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
  ProductUpdate: {
    title?: string;
    categoryMenu?: categoryMenuTypes['menu'];
    price?: string;
    tag?: string;
    imageArray?: Array<any>;
    tier?: tierTypes['name'];
    location?: string;
    content?: string;
    isNego?: boolean;
  };
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
  BlockList: StackScreenProps<Screen> | undefined;
};

export default Screen;

export type ProfileScreenNavigationProp = StackNavigationProp<Screen>;
export type OnBoarding1Props = StackScreenProps<Screen, 'OnBoarding1'>;
export type OnBoarding2Props = StackScreenProps<Screen, 'OnBoarding2'>;
export type OnBoarding3Props = StackScreenProps<Screen, 'OnBoarding3'>;
export type AppPermissionProps = StackScreenProps<Screen, 'AppPermission'>;
export type LoginProps = StackScreenProps<Screen, 'Login'>;
export type LoginCompleteProps = StackScreenProps<Screen, 'LoginComplete'>;
export type SignUpProps = StackScreenProps<Screen, 'SignUp'>;
export type SignUpTOSProps = StackScreenProps<Screen, 'SignUpTOS'>;
export type SignUpFormProps = StackScreenProps<Screen, 'SignUpForm'>;
export type SignUpPhotoProps = StackScreenProps<Screen, 'SignUpPhoto'>;
export type SignUpCompleteProps = StackScreenProps<Screen, 'SignUpComplete'>;
export type HomeProps = StackScreenProps<Screen, 'Home'>;
export type LocationChangeProps = StackScreenProps<Screen, 'LocationChange'>;
export type ProductDetailProps = StackScreenProps<Screen, 'ProductDetail'>;
export type SearchProps = StackScreenProps<Screen, 'Search'>;
export type SearchDetailProps = StackScreenProps<Screen, 'SearchDetail'>;
export type MyCategoryProps = StackScreenProps<Screen, 'MyCategory'>;
export type KeywordAlarmProps = StackScreenProps<Screen, 'KeywordAlarm'>;
export type LikeListProps = StackScreenProps<Screen, 'LikeList'>;
export type ChattingHomeProps = StackScreenProps<Screen, 'ChattingHome'>;
export type ChattingDetailProps = StackScreenProps<Screen, 'ChattingDetail'>;
export type ChattingLocationProps = StackScreenProps<
  Screen,
  'ChattingLocation'
>;
export type ReportCategoryProps = StackScreenProps<Screen, 'ReportCategory'>;
export type ReportDetailProps = StackScreenProps<Screen, 'ReportDetail'>;
export type ProfileHomeProps = StackScreenProps<Screen, 'ProfileHome'>;
export type ProfileDetailProps = StackScreenProps<Screen, 'ProfileDetail'>;
export type ProfileSellerReviewProps = StackScreenProps<
  Screen,
  'ProfileSellerReview'
>;
export type ReviewWriteProps = StackScreenProps<Screen, 'ReviewWrite'>;
export type ProfileSellProductProps = StackScreenProps<
  Screen,
  'ProfileSellProduct'
>;
export type BusinessProfileProps = StackScreenProps<Screen, 'BusinessProfile'>;
export type BusinessProfileMenuProps = StackScreenProps<
  Screen,
  'BusinessProfileMenu'
>;
export type BusinessProfileSettingProps = StackScreenProps<
  Screen,
  'BusinessProfileSetting'
>;
export type BusinessProfileBannerProps = StackScreenProps<
  Screen,
  'BusinessProfileBanner'
>;
export type BusinessSignUpProps = StackScreenProps<Screen, 'BusinessSignUp'>;
export type BusinessFormProps = StackScreenProps<Screen, 'BusinessForm'>;
export type BusinessAddressProps = StackScreenProps<Screen, 'BusinessAddress'>;
export type BusinessLocationProps = StackScreenProps<
  Screen,
  'BusinessLocation'
>;
export type BusinessOpeningHoursProps = StackScreenProps<
  Screen,
  'BusinessOpeningHours'
>;
export type NoticeProps = StackScreenProps<Screen, 'Notice'>;
export type AlarmListProps = StackScreenProps<Screen, 'AlarmList'>;
export type AlarmDetailProps = StackScreenProps<Screen, 'AlarmDetail'>;
export type MyProductProps = StackScreenProps<Screen, 'MyProduct'>;
export type ProductUpdateProps = StackScreenProps<Screen, 'ProductUpdate'>;
export type ProductPhotoProps = StackScreenProps<Screen, 'ProductPhoto'>;
export type ProductCategoryProps = StackScreenProps<Screen, 'ProductCategory'>;
export type ProductTagProps = StackScreenProps<Screen, 'ProductTag'>;
export type ProductTierProps = StackScreenProps<Screen, 'ProductTier'>;
export type ProductLocationProps = StackScreenProps<Screen, 'ProductLocation'>;
export type SettingProps = StackScreenProps<Screen, 'Setting'>;
export type SettingPrivacyProps = StackScreenProps<Screen, 'SettingPrivacy'>;
export type SettingDeleteAccountProps = StackScreenProps<
  Screen,
  'SettingDeleteAccount'
>;
export type SettingAlarmProps = StackScreenProps<Screen, 'SettingAlarm'>;
export type SettingChattingProps = StackScreenProps<Screen, 'SettingChatting'>;
export type SettingLanguageProps = StackScreenProps<Screen, 'SettingLanguage'>;
export type ServiceCenterProps = StackScreenProps<Screen, 'ServiceCenter'>;
export type FAQProps = StackScreenProps<Screen, 'FAQ'>;
export type ToUProps = StackScreenProps<Screen, 'ToU'>;
export type PrivacyPolicyProps = StackScreenProps<Screen, 'PrivacyPolicy'>;
export type ProductCompleteProps = StackScreenProps<Screen, 'ProductComplete'>;
export type ProductCompleteConfirmProps = StackScreenProps<
  Screen,
  'ProductCompleteConfirm'
>;
export type CarRegisterProps = StackScreenProps<Screen, 'CarRegister'>;
export type CarBrandProps = StackScreenProps<Screen, 'CarBrand'>;
export type CarModelProps = StackScreenProps<Screen, 'CarModel'>;
export type CarYearProps = StackScreenProps<Screen, 'CarYear'>;
export type CarFuelProps = StackScreenProps<Screen, 'CarFuel'>;
export type CarGearProps = StackScreenProps<Screen, 'CarGear'>;
export type CarEndNumberProps = StackScreenProps<Screen, 'CarEndNumber'>;
export type CarLocationProps = StackScreenProps<Screen, 'CarLocation'>;
export type MenuProps = StackScreenProps<Screen, 'Menu'>;
export type SignUpToSProps = StackScreenProps<Screen, 'SignUpToS'>;
export type ProductTierGuideProps = StackScreenProps<
  Screen,
  'ProductTierGuide'
>;
export type BlockListProps = StackScreenProps<Screen, 'BlockList'>;
