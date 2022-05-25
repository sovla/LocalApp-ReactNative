import Theme from '@/assets/global/Theme';
import {Text} from '@/Components/Global/text';
import {createNavigationContainerRef, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {SafeAreaView, View, StyleSheet, Platform} from 'react-native';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, ko, es, br} from '@/assets/lang/lang';
import {useAppDispatch, useAppSelector} from '@/Hooks/CustomHook';
import Screen from '@/Types/Screen/Screen';
import {API} from '@/API/API';
import OnBoarding from './OnBoard/OnBoarding';
import AppPermission from './OnBoard/AppPermission';
import Login from './LoginSignUp/Login';
import LoginComplete from './LoginSignUp/LoginComplete';
import SignUp from './LoginSignUp/SignUp';
import SignUpToS from './LoginSignUp/SignUpToS';
import SignUpTel from './LoginSignUp/SignUpTel';
import SignUpAuth from './LoginSignUp/SignUpAuth';
import SignUpForm from './LoginSignUp/SignUpForm';
import SignUpPhoto from './LoginSignUp/SignUpPhoto';
import SignUpComplete from './LoginSignUp/SignUpComplete';
import Home from './Home/Home';
import AllCategory from './Home/AllCategory';
import LocationChange from './Home/LocationChange';
import ProductDetail from './Home/ProductDetail';
import Search from './Home/Search';
import SearchDetail from './Home/SearchDetail';
import MyCategory from './Home/MyCategory';
import KeywordAlarm from './Home/KeywordAlarm';
import LikeList from './Home/LikeList';
import ChattingHome from './Chatting/ChattingHome';
import ChattingDetail from './Chatting/ChattingDetail';
import ChattingLocation from './Chatting/ChattingLocation';
import ReportCategory from './Chatting/ReportCategory';
import ReportDetail from './Chatting/ReportDetail';
import ProfileHome from './Profile/ProfileHome';
import ProfileDetail from './Profile/ProfileDetail';
import ProfileTel from './Profile/ProfileTel';
import ProfileAuth from './Profile/ProfileAuth';
import ProfileAuthComplete from './Profile/ProfileAuthComplete';
import ProfileUpdate from './Profile/ProfileUpdate';
import ProfileSellerReview from './Profile/ProfileSellerReview';
import ReviewWrite from './Profile/ReviewWrite';
import ProfileSellProduct from './Profile/ProfileSellProduct';
import BusinessProfile from './Business/BusinessProfile';
import BusinessProfileMenu from './Business/BusinessProfileMenu';
import BusinessProfileSetting from './Business/BusinessProfileSetting';
import BusinessProfileBanner from './Business/BusinessProfileBanner';
import BusinessSignUp from './Business/BusinessSignUp';
import BusinessForm from './Business/BusinessForm';
import BusinessAddress from './Business/BusinessAddress';
import BusinessLocation from './Business/BusinessLocation';
import BusinessOpeningHours from './Business/BusinessOpeningHours';
import Notice from './Notice/Notice';
import NoticeDetail from './Notice/NoticeDetail';
import AlarmList from './Notice/AlarmList';
import AlarmDetail from './Notice/AlarmDetail';
import MyProduct from './Product/MyProduct';
import ProductUpdate from './Product/ProductUpdate';
import ProductPhoto from './Product/ProductPhoto';
import ProductCategory from './Product/ProductCategory';
import ProductTag from './Product/ProductTag';
import ProductTier from './Product/ProductTier';
import ProductLocation from './Product/ProductLocation';
import Setting from './Setting/Setting';
import SettingPrivacy from './Setting/SettingPrivacy';
import SettingPrivacyTel from './Setting/SettingPrivacyTel';
import SettingPrivacyTelAuth from './Setting/SettingPrivacyTelAuth';
import SettingDeleteAccount from './Setting/SettingDeleteAccount';
import SettingAlarm from './Setting/SettingAlarm';
import SettingChatting, {fontNameToValue} from './Setting/SettingChatting';
import SettingLanguage from './Setting/SettingLanguage';
import ServiceCenter from './Setting/ServiceCenter';
import FAQ from './Setting/FAQ';
import ToU from './Setting/ToU';
import PrivacyPolicy from './Setting/PrivacyPolicy';
import ProductComplete from './Product/ProductComplete';
import ProductCompleteConfirm from './Product/ProductCompleteConfirm';
import CarRegister from './Car/CarRegister';
import CarBrand from './Car/CarBrand';
import CarModel from './Car/CarModel';
import CarYear from './Car/CarYear';
import CarFuel from './Car/CarFuel';
import CarGear from './Car/CarGear';
import CarEndNumber from './Car/CarEndNumber';
import CarLocation from './Car/CarLocation';
import CarDisplacement from './Car/CarDisplacement';
import Menu from './Menu';
import ProductTierGuide from './Product/ProductTierGuide';
import BlockList from './Chatting/BlockList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {changeToken} from '@/Store/globalState';
import {Button} from '@/Components/Global/button';
import {changeUser} from '@/Store/userState';
import BusinessSignUpForm from './Business/BusinessSignUpForm';
import PurchaseList from './Profile/PurchaseList';
import {fontChange} from '@/Store/fontSizeState';
import ContactUs from './Setting/ContactUs';
import ProductDetailProfile from './Profile/ProductDetailProfile';
import ProductDetailOther from './Home/ProductDetailOther';
import ProductDetailSearch from './Home/ProductDetailSearch';
import LocationSetting from './OnBoard/LocationSetting';

const resources = {
    en,
    ko,
    es,
    br,
};

const Stack = createStackNavigator<Screen>();
export const navigationRef = createNavigationContainerRef<Screen>();

const forFade = ({current}: any) => {
    return {
        cardStyle: {opacity: current.progress},
    };
};

export default function Router() {
    const [isChange, setIsChange] = useState<boolean>(false);
    const [isLanguageChange, setIsLanguageChange] = useState<boolean>(false);
    const [isAsync, setIsAsync] = useState<boolean>(true);
    const [initRoute, setInitRoute] = useState<keyof Screen>('OnBoarding');
    const lang = useAppSelector(state => state.lang.value);
    const dispatch = useAppDispatch();

    useEffect(() => {
        // 언어설정
        i18n.use(initReactI18next) // passes i18n down to react-i18next
            .init({
                // the translations
                // (tip move them in a JSON file and import them,
                // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
                resources: resources,
                lng: 'ko', // if you're using a language detector, do not define the lng option

                compatibilityJSON: 'v3',
                interpolation: {
                    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
                },
            });
        // 언어설정 api
        API.post('lang_content.php')
            .then(res => {
                if (res.data?.result === 'true' && res?.data?.data) {
                    Object.keys(res.data.data).forEach(v => {
                        i18n.addResources(v, 'translation', res.data.data[v].translation);
                    });
                }
            })
            .finally(() => {
                setIsChange(p => !p);
            });
    }, []);
    useEffect(() => {
        // 언어변경시 실행되는 effect
        setIsLanguageChange(true);
        i18n.changeLanguage(lang)
            .then(v => {})
            .finally(() => {
                setIsLanguageChange(false);
            });
    }, [lang]);
    useLayoutEffect(() => {
        (async () => {
            const authorizationStatus = await messaging().requestPermission();
            if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED || authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
                if (Platform.OS === 'ios') {
                    const token = await messaging().getAPNSToken();
                    if (token) {
                        console.log('token:::', token);
                        dispatch(changeToken(token));
                        API.post('member_auto_login.php', {mt_app_token: token}).then(res => {
                            if (res.data.result === 'true') {
                                dispatch(changeUser(res.data.data.data));
                            }
                        });
                    }
                } else {
                    const token = await messaging().getToken();
                    if (token) {
                        console.log('token:::', token);
                        dispatch(changeToken(token));
                        API.post('member_auto_login.php', {mt_app_token: token}).then(res => {
                            if (res.data.result === 'true') {
                                dispatch(changeUser(res.data.data.data));
                            }
                        });
                    }
                }
            }
        })();
    }, []);

    useLayoutEffect(() => {
        AsyncStorage.getItem('done')
            .then(result => {
                if (result === 'AppPermission' || result === 'LocationSetting' || result === 'Login') {
                    setInitRoute(result);
                }
            })
            .finally(() => {
                setIsAsync(false);
            });

        AsyncStorage.getItem('fontSize').then(res => {
            if (res === 'Small' || res === 'Medium' || res === 'Large') {
                dispatch(
                    fontChange({
                        value: fontNameToValue(res),
                        size: res,
                    }),
                );
            }
        });
    }, []);

    if (isLanguageChange || isAsync) {
        return null;
    }

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName={initRoute}>
                {RouterSetting.map((item, index) => (
                    <Stack.Screen
                        name={item.name}
                        key={item.name + index}
                        component={item.name !== 'ChattingDetail' ? withScrollView(item.component) : item.component}
                        options={{
                            headerShown: false,
                            cardStyleInterpolator: forFade,
                            gestureDirection: 'horizontal',
                        }}
                    />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const withScrollView = (WrappedComponent: any) => {
    return (props: any) => {
        return (
            <>
                <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
                <SafeAreaView style={{flex: 1}}>
                    <View style={{flex: 1, backgroundColor: Theme.color.white}}>
                        <WrappedComponent {...props} />
                        <View style={[styles.position]}>
                            <Text>{props.route.name}</Text>
                            {props.route.name === 'Login' && <Button onPress={() => props.navigation.navigate('Home')} width={'100'} content="홈으로" />}
                        </View>
                    </View>
                </SafeAreaView>
                <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
            </>
        );
    };
};

interface RouterTypes {
    name: keyof Screen;
    component: any;
}

export const RouterSetting: RouterTypes[] = [
    {
        name: 'Menu',
        component: Menu,
    },
    {
        name: 'Home',
        component: Home,
    },
    {
        name: 'AllCategory',
        component: AllCategory,
    },
    {
        name: 'KeywordAlarm',
        component: KeywordAlarm,
    },
    {
        name: 'LikeList',
        component: LikeList,
    },
    {
        name: 'LocationChange',
        component: LocationChange,
    },
    {
        name: 'MyCategory',
        component: MyCategory,
    },
    {
        name: 'ProductDetail',
        component: ProductDetail,
    },
    {
        name: 'ProductDetailProfile',
        component: ProductDetailProfile,
    },
    {
        name: 'ProductDetailOther',
        component: ProductDetailOther,
    },
    {
        name: 'ProductDetailSearch',
        component: ProductDetailSearch,
    },

    {
        name: 'Search',
        component: Search,
    },
    {
        name: 'SearchDetail',
        component: SearchDetail,
    },
    {
        name: 'ChattingHome',
        component: ChattingHome,
    },
    {
        name: 'ChattingLocation',
        component: ChattingLocation,
    },
    {
        name: 'ChattingDetail',
        component: ChattingDetail,
    },
    {
        name: 'ReportCategory',
        component: ReportCategory,
    },
    {
        name: 'ReportDetail',
        component: ReportDetail,
    },
    {
        name: 'CarBrand',
        component: CarBrand,
    },
    {
        name: 'CarEndNumber',
        component: CarEndNumber,
    },
    {
        name: 'CarFuel',
        component: CarFuel,
    },
    {
        name: 'CarGear',
        component: CarGear,
    },
    {
        name: 'CarLocation',
        component: CarLocation,
    },
    {
        name: 'CarDisplacement',
        component: CarDisplacement,
    },
    {
        name: 'CarModel',
        component: CarModel,
    },
    {
        name: 'CarRegister',
        component: CarRegister,
    },
    {
        name: 'CarYear',
        component: CarYear,
    },
    {
        name: 'Login',
        component: Login,
    },
    {
        name: 'LoginComplete',
        component: LoginComplete,
    },
    {
        name: 'SignUp',
        component: SignUp,
    },
    {
        name: 'SignUpTel',
        component: SignUpTel,
    },
    {
        name: 'SignUpAuth',
        component: SignUpAuth,
    },
    {
        name: 'SignUpComplete',
        component: SignUpComplete,
    },
    {
        name: 'SignUpForm',
        component: SignUpForm,
    },
    {
        name: 'SignUpPhoto',
        component: SignUpPhoto,
    },
    {
        name: 'SignUpTOS',
        component: SignUpToS,
    },
    {
        name: 'BusinessAddress',
        component: BusinessAddress,
    },
    {
        name: 'BusinessForm',
        component: BusinessForm,
    },
    {
        name: 'BusinessLocation',
        component: BusinessLocation,
    },
    {
        name: 'BusinessOpeningHours',
        component: BusinessOpeningHours,
    },
    {
        name: 'BusinessProfile',
        component: BusinessProfile,
    },
    {
        name: 'BusinessProfileBanner',
        component: BusinessProfileBanner,
    },
    {
        name: 'BusinessProfileMenu',
        component: BusinessProfileMenu,
    },
    {
        name: 'BusinessProfileSetting',
        component: BusinessProfileSetting,
    },
    {
        name: 'BusinessSignUp',
        component: BusinessSignUp,
    },
    {
        name: 'BusinessSignUpForm',
        component: BusinessSignUpForm,
    },
    {
        name: 'AlarmDetail',
        component: AlarmDetail,
    },
    {
        name: 'AlarmList',
        component: AlarmList,
    },
    {
        name: 'Notice',
        component: Notice,
    },
    {
        name: 'NoticeDetail',
        component: NoticeDetail,
    },
    {
        name: 'OnBoarding',
        component: OnBoarding,
    },
    {
        name: 'AppPermission',
        component: AppPermission,
    },
    {
        name: 'ProductCategory',
        component: ProductCategory,
    },
    {
        name: 'ProductComplete',
        component: ProductComplete,
    },
    {
        name: 'ProductCompleteConfirm',
        component: ProductCompleteConfirm,
    },
    {
        name: 'ProductLocation',
        component: ProductLocation,
    },
    {
        name: 'ProductPhoto',
        component: ProductPhoto,
    },
    {
        name: 'ProductTag',
        component: ProductTag,
    },
    {
        name: 'ProductTier',
        component: ProductTier,
    },
    {
        name: 'ProductTierGuide',
        component: ProductTierGuide,
    },
    {
        name: 'ProductUpdate',
        component: ProductUpdate,
    },
    {
        name: 'MyProduct',
        component: MyProduct,
    },
    {
        name: 'ProfileDetail',
        component: ProfileDetail,
    },
    {
        name: 'ProfileTel',
        component: ProfileTel,
    },
    {
        name: 'ProfileAuth',
        component: ProfileAuth,
    },
    {
        name: 'ProfileAuthComplete',
        component: ProfileAuthComplete,
    },
    {
        name: 'ProfileUpdate',
        component: ProfileUpdate,
    },
    {
        name: 'ProfileHome',
        component: ProfileHome,
    },
    {
        name: 'ProfileSellProduct',
        component: ProfileSellProduct,
    },
    {
        name: 'ProfileSellerReview',
        component: ProfileSellerReview,
    },
    {
        name: 'ReviewWrite',
        component: ReviewWrite,
    },
    {
        name: 'FAQ',
        component: FAQ,
    },
    {
        name: 'PrivacyPolicy',
        component: PrivacyPolicy,
    },
    {
        name: 'ServiceCenter',
        component: ServiceCenter,
    },
    {
        name: 'Setting',
        component: Setting,
    },
    {
        name: 'SettingAlarm',
        component: SettingAlarm,
    },
    {
        name: 'SettingChatting',
        component: SettingChatting,
    },
    {
        name: 'SettingDeleteAccount',
        component: SettingDeleteAccount,
    },
    {
        name: 'SettingLanguage',
        component: SettingLanguage,
    },
    {
        name: 'SettingPrivacy',
        component: SettingPrivacy,
    },
    {
        name: 'SettingPrivacyTel',
        component: SettingPrivacyTel,
    },
    {
        name: 'SettingPrivacyTelAuth',
        component: SettingPrivacyTelAuth,
    },
    {
        name: 'ToU',
        component: ToU,
    },
    {
        name: 'BlockList',
        component: BlockList,
    },
    {
        name: 'PurchaseList',
        component: PurchaseList,
    },
    {
        name: 'ContactUs',
        component: ContactUs,
    },
    {
        name: 'LocationSetting',
        component: LocationSetting,
    },
];

const styles = StyleSheet.create({
    position: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 3000,
        fontSize: 16,
    },
});
