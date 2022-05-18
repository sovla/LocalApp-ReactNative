import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {categoryMenuTypes, openingHoursTypes, ProductTypes, tierTypes} from '../Components/global';

type Screen = {
    OnBoarding: StackScreenProps<Screen> | undefined;
    AppPermission: StackScreenProps<Screen> | undefined;
    Login: StackScreenProps<Screen> | undefined;
    LoginComplete: StackScreenProps<Screen> | undefined;
    SignUp: StackScreenProps<Screen> | undefined;
    SignUpTOS: StackScreenProps<Screen> | undefined;
    SignUpTel: {
        option?: boolean;
    };
    SignUpAuth: {
        tel: string;
        selectNum: string;
        option?: boolean;
    };
    SignUpForm: {
        image?: {
            mime: string;
            path: string;
        };
        tel?: string;
        selectNum?: string;
        option?: boolean;
    };
    SignUpPhoto: StackScreenProps<Screen> | undefined;
    SignUpComplete: StackScreenProps<Screen> | undefined;
    Home: StackScreenProps<Screen> | undefined;
    AllCategory: StackScreenProps<Screen> | undefined;
    LocationChange: StackScreenProps<Screen> | undefined;
    ProductDetail: {
        pt_idx: string;
        pt_cate: string;
    };
    Search:
        | {
              category?: categoryMenuTypes['menu'];
              keyword?: string;
          }
        | undefined;
    SearchDetail: StackScreenProps<Screen> | undefined;
    MyCategory: StackScreenProps<Screen> | undefined;
    KeywordAlarm: StackScreenProps<Screen> | undefined;
    LikeList: StackScreenProps<Screen> | undefined;
    ChattingHome: StackScreenProps<Screen> | undefined;
    ChattingDetail:
        | {
              region: {
                  latitude: number;
                  longitude: number;
              };
              location: string;
              locationDetail: string;
          }
        | undefined;
    ChattingLocation:
        | {
              isShow: boolean;
              region: {
                  lat: string | number;
                  lon: string | number;
              };
          }
        | undefined;
    ReportCategory: {
        pt_idx: string;
    };
    ReportDetail: {
        reportType: 'prohibited' | 'unmanned' | 'scam';
        pt_idx: string;
    };
    ProfileHome: {
        sell_idx: string;
    };
    ProfileDetail: StackScreenProps<Screen> | undefined;
    ProfileUpdate: {
        mt_country: string;
        mt_hp: string;
        mt_like: string;
        mt_memo: string;
        mt_name: string;
        mt_profile: string;
        mt_birth: string;
        mt_email: string;
        mt_gender: 'M' | 'W';
        mt_hp_open: 'N' | 'Y';
        mt_uid: string;
    };

    ProfileTel: StackScreenProps<Screen> | undefined;
    ProfileAuth: StackScreenProps<Screen> | undefined;
    ProfileAuthComplete: StackScreenProps<Screen> | undefined;
    ProfileSellerReview: {
        sell_idx: string;
        sell_type: '0' | '1';
    };
    ReviewWrite: StackScreenProps<Screen> | undefined;
    ProfileSellProduct: {
        sell_idx: string;
        sell_type: '0' | '1';
    };
    BusinessProfile: {
        sell_idx: string;
        sell_type: '0' | '1';
    };
    BusinessProfileMenu: StackScreenProps<Screen> | undefined;
    BusinessProfileSetting:
        | {
              busi_all_open?: 'Y' | 'N';
              busi_mon_check?: 'Y' | 'N';
              busi_mon_end?: string;
              busi_mon_start?: string;
              busi_pri_check?: 'Y' | 'N';
              busi_pri_end?: string;
              busi_pri_start?: string;
              busi_sat_check?: 'Y' | 'N';
              busi_sat_end?: string;
              busi_sat_start?: string;
              busi_sun_check?: 'Y' | 'N';
              busi_sun_end?: string;
              busi_sun_start?: string;
              busi_thur_check?: 'Y' | 'N';
              busi_thur_end?: string;
              busi_thur_start?: string;
              busi_tue_check?: 'Y' | 'N';
              busi_tue_end?: string;
              busi_tue_start?: string;
              busi_wed_check?: 'Y' | 'N';
              busi_wed_end?: string;
              busi_wed_start?: string;
          }
        | undefined;
    BusinessProfileBanner: StackScreenProps<Screen> | undefined;
    BusinessSignUp: StackScreenProps<Screen> | undefined;
    BusinessSignUpForm: StackScreenProps<Screen> | undefined;
    BusinessForm: StackScreenProps<Screen> | undefined;
    BusinessAddress: StackScreenProps<Screen> | undefined;
    BusinessLocation: StackScreenProps<Screen> | undefined;
    BusinessOpeningHours:
        | {
              openingHoursTypes?: openingHoursTypes;
              isFull?: boolean;
          }
        | undefined;
    Notice: StackScreenProps<Screen> | undefined;
    NoticeDetail: {
        nt_idx: string;
    };
    AlarmList:
        | {
              menu?: 'keywordAlarm' | 'alarm';
          }
        | undefined;
    AlarmDetail: {
        al_idx: string;
    };
    MyProduct: StackScreenProps<Screen> | undefined;
    ProductUpdate:
        | {
              title?: string;
              categoryMenu?: categoryMenuTypes['menu'];
              price?: string;
              tag?: string;
              imageArray?: Array<any>;
              tier?: tierTypes['name'];
              location?: string;
              content?: string;
              isNego?: boolean;
              isEdit?: boolean; // 해당 페이지 수정여부
              pt_idx?: string; // 업데이트시 넘겨주는 값
              imageFile?: {
                  path: string;
                  mime: string;
                  isLocal: boolean;
              }[];
              pt_location_detail?: string | null;
              pt_lat?: number | null;
              pt_lng?: number | null;
              carLocation?: {
                  lc_idx: string; // 차량 위치
                  lc_lat: string; // 차량 위치
                  lc_lng: string; // 차량 위치
                  lc_title: string; // 차량 위치
              };
              pt_number?: string; // 차량 끝자리 번호
              pt_gear?: string; // 차량 변속기
              pt_year?: string; // 차량 연식
              pt_brand?: string; // 차량 브랜드
              pt_model?: string; // 차량 브랜드
              pt_fuel?: string; // 차량 연료
              pt_disp?: string; // 차량 배기량
          }
        | undefined;
    ProductPhoto:
        | {
              path: string;
              mime: string;
              isLocal: boolean;
          }[]
        | undefined;
    ProductCategory: StackScreenProps<Screen> | undefined;
    ProductTag: {
        tag?: string | null;
    };
    ProductTier: StackScreenProps<Screen> | undefined;
    ProductLocation: StackScreenProps<Screen> | undefined;
    Setting: StackScreenProps<Screen> | undefined;
    SettingPrivacy: StackScreenProps<Screen> | undefined;
    SettingPrivacyTel: StackScreenProps<Screen> | undefined;
    SettingPrivacyTelAuth: {
        jct_country: string;
        jct_hp: string;
    };
    SettingDeleteAccount: StackScreenProps<Screen> | undefined;
    SettingAlarm: StackScreenProps<Screen> | undefined;
    SettingChatting: StackScreenProps<Screen> | undefined;
    SettingLanguage: StackScreenProps<Screen> | undefined;
    ServiceCenter: StackScreenProps<Screen> | undefined;
    FAQ: StackScreenProps<Screen> | undefined;
    ToU: StackScreenProps<Screen> | undefined;
    PrivacyPolicy: StackScreenProps<Screen> | undefined;
    ProductComplete: {
        isEdit?: boolean;
    };
    ProductCompleteConfirm: StackScreenProps<Screen> | undefined;
    CarRegister: StackScreenProps<Screen> | undefined;
    CarBrand: {
        isMotor: boolean;
    };
    CarModel: {
        isMotor: boolean;
    };
    CarYear: {
        isMotor: boolean;
    };
    CarFuel: {
        isMotor: boolean;
    };
    CarGear: {
        isMotor: boolean;
    };
    CarEndNumber: {
        isMotor: boolean;
    };
    CarLocation: {
        isMotor: boolean;
    };
    Menu: StackScreenProps<Screen> | undefined;
    ProductTierGuide: StackScreenProps<Screen> | undefined;
    BlockList: StackScreenProps<Screen> | undefined;
    CarDisplacement: StackScreenProps<Screen> | undefined;
    PurchaseList: StackScreenProps<Screen> | undefined;
};

export default Screen;

export type ProfileScreenNavigationProp = StackNavigationProp<Screen>;
export type OnBoardingProps = StackScreenProps<Screen, 'OnBoarding'>;
export type AppPermissionProps = StackScreenProps<Screen, 'AppPermission'>;
export type LoginProps = StackScreenProps<Screen, 'Login'>;
export type LoginCompleteProps = StackScreenProps<Screen, 'LoginComplete'>;
export type SignUpProps = StackScreenProps<Screen, 'SignUp'>;
export type SignUpTelProps = StackScreenProps<Screen, 'SignUpTel'>;
export type SignUpAuthProps = StackScreenProps<Screen, 'SignUpAuth'>;
export type SignUpTOSProps = StackScreenProps<Screen, 'SignUpTOS'>;
export type SignUpFormProps = StackScreenProps<Screen, 'SignUpForm'>;
export type SignUpPhotoProps = StackScreenProps<Screen, 'SignUpPhoto'>;
export type SignUpCompleteProps = StackScreenProps<Screen, 'SignUpComplete'>;
export type HomeProps = StackScreenProps<Screen, 'Home'>;
export type AllCategoryProps = StackScreenProps<Screen, 'AllCategory'>;
export type LocationChangeProps = StackScreenProps<Screen, 'LocationChange'>;
export type ProductDetailProps = StackScreenProps<Screen, 'ProductDetail'>;
export type SearchProps = StackScreenProps<Screen, 'Search'>;
export type SearchDetailProps = StackScreenProps<Screen, 'SearchDetail'>;
export type MyCategoryProps = StackScreenProps<Screen, 'MyCategory'>;
export type KeywordAlarmProps = StackScreenProps<Screen, 'KeywordAlarm'>;
export type LikeListProps = StackScreenProps<Screen, 'LikeList'>;
export type ChattingHomeProps = StackScreenProps<Screen, 'ChattingHome'>;
export type ChattingDetailProps = StackScreenProps<Screen, 'ChattingDetail'>;
export type ChattingLocationProps = StackScreenProps<Screen, 'ChattingLocation'>;
export type ReportCategoryProps = StackScreenProps<Screen, 'ReportCategory'>;
export type ReportDetailProps = StackScreenProps<Screen, 'ReportDetail'>;
export type ProfileHomeProps = StackScreenProps<Screen, 'ProfileHome'>;
export type ProfileDetailProps = StackScreenProps<Screen, 'ProfileDetail'>;
export type ProfileUpdateProps = StackScreenProps<Screen, 'ProfileUpdate'>;
export type ProfileTelProps = StackScreenProps<Screen, 'ProfileTel'>;
export type ProfileAuthProps = StackScreenProps<Screen, 'ProfileAuth'>;
export type ProfileAuthCompleteProps = StackScreenProps<Screen, 'ProfileAuthComplete'>;
export type ProfileSellerReviewProps = StackScreenProps<Screen, 'ProfileSellerReview'>;
export type ReviewWriteProps = StackScreenProps<Screen, 'ReviewWrite'>;
export type ProfileSellProductProps = StackScreenProps<Screen, 'ProfileSellProduct'>;
export type BusinessProfileProps = StackScreenProps<Screen, 'BusinessProfile'>;
export type BusinessProfileMenuProps = StackScreenProps<Screen, 'BusinessProfileMenu'>;
export type BusinessProfileSettingProps = StackScreenProps<Screen, 'BusinessProfileSetting'>;
export type BusinessProfileBannerProps = StackScreenProps<Screen, 'BusinessProfileBanner'>;
export type BusinessSignUpProps = StackScreenProps<Screen, 'BusinessSignUp'>;
export type BusinessSignUpFormProps = StackScreenProps<Screen, 'BusinessSignUpForm'>;
export type BusinessFormProps = StackScreenProps<Screen, 'BusinessForm'>;
export type BusinessAddressProps = StackScreenProps<Screen, 'BusinessAddress'>;
export type BusinessLocationProps = StackScreenProps<Screen, 'BusinessLocation'>;
export type BusinessOpeningHoursProps = StackScreenProps<Screen, 'BusinessOpeningHours'>;
export type NoticeProps = StackScreenProps<Screen, 'Notice'>;
export type NoticeDetailProps = StackScreenProps<Screen, 'NoticeDetail'>;
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
export type SettingPrivacyTelProps = StackScreenProps<Screen, 'SettingPrivacyTel'>;
export type SettingPrivacyTelAuthProps = StackScreenProps<Screen, 'SettingPrivacyTelAuth'>;
export type SettingDeleteAccountProps = StackScreenProps<Screen, 'SettingDeleteAccount'>;
export type SettingAlarmProps = StackScreenProps<Screen, 'SettingAlarm'>;
export type SettingChattingProps = StackScreenProps<Screen, 'SettingChatting'>;
export type SettingLanguageProps = StackScreenProps<Screen, 'SettingLanguage'>;
export type ServiceCenterProps = StackScreenProps<Screen, 'ServiceCenter'>;
export type FAQProps = StackScreenProps<Screen, 'FAQ'>;
export type ToUProps = StackScreenProps<Screen, 'ToU'>;
export type PrivacyPolicyProps = StackScreenProps<Screen, 'PrivacyPolicy'>;
export type ProductCompleteProps = StackScreenProps<Screen, 'ProductComplete'>;
export type ProductCompleteConfirmProps = StackScreenProps<Screen, 'ProductCompleteConfirm'>;
export type CarRegisterProps = StackScreenProps<Screen, 'CarRegister'>;
export type CarBrandProps = StackScreenProps<Screen, 'CarBrand'>;
export type CarModelProps = StackScreenProps<Screen, 'CarModel'>;
export type CarYearProps = StackScreenProps<Screen, 'CarYear'>;
export type CarFuelProps = StackScreenProps<Screen, 'CarFuel'>;
export type CarGearProps = StackScreenProps<Screen, 'CarGear'>;
export type CarEndNumberProps = StackScreenProps<Screen, 'CarEndNumber'>;
export type CarLocationProps = StackScreenProps<Screen, 'CarLocation'>;
export type MenuProps = StackScreenProps<Screen, 'Menu'>;
export type ProductTierGuideProps = StackScreenProps<Screen, 'ProductTierGuide'>;
export type BlockListProps = StackScreenProps<Screen, 'BlockList'>;
export type CarDisplacementProps = StackScreenProps<Screen, 'CarDisplacement'>;
export type PurchaseListProps = StackScreenProps<Screen, 'PurchaseList'>;
