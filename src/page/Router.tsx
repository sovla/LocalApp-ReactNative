import Theme from '@/assets/global/Theme';
import {Button} from '@/Components/Global/button';
import {Text} from '@/Components/Global/text';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import React, {Suspense, useEffect, useState} from 'react';
import {SafeAreaView, View, ActivityIndicator, StyleSheet} from 'react-native';

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {en, ko, es, br} from '@/assets/lang/lang';
import {useAppSelector} from '@/Hooks/CustomHook';
import Screen from '@/Types/Screen/Screen';
import {API} from '@/API/API';

const ROUTING: keyof Screen = 'BusinessProfile';

const resources = {
  en,
  ko,
  es,
  br,
};

const Stack = createStackNavigator<Screen>();

const forFade = ({current}: any) => {
  return {
    cardStyle: {opacity: current.progress},
  };
};

export default function Router() {
  const [isChange, setIsChange] = useState<boolean>(false);
  const lang = useAppSelector(state => state.lang.value);

  useEffect(() => {
    i18n
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: resources,
        lng: 'ko', // if you're using a language detector, do not define the lng option
        fallbackLng: 'ko',
        compatibilityJSON: 'v3',
        interpolation: {
          escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
      });
    i18n.changeLanguage(lang);
    API.post('lang_content.php')
      .then(res => {
        if (res.data?.result === 'true') {
          Object.keys(res?.data?.data).forEach(v => {
            i18n.addResources(v, 'translation', res.data.data[v].translation);
          });
        }
      })
      .finally(() => {
        setIsChange(p => !p);
      });
  }, [lang]);
  return (
    <Suspense fallback={<View></View>}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={ROUTING}>
          {RouterSetting.map((item, index) => (
            <Stack.Screen
              name={item.name}
              key={item.name + index}
              component={withScrollView(item.component)}
              options={{
                headerShown: false,
                cardStyleInterpolator: forFade,
                gestureDirection: 'horizontal',
              }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Suspense>
  );
}

const withScrollView = (WrappedComponent: any) => {
  return (props: any) => {
    const [isShow, setIsShow] = useState(false);
    return (
      <Suspense
        fallback={
          <View>
            <ActivityIndicator />
          </View>
        }>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: Theme.color.white}}>
            <WrappedComponent {...props} />
            <View style={[styles.position]}>
              <Text>{props.route.name}</Text>
              {/* <Button
                width="50px"
                height="50px"
                style={{
                  backgroundColor: !isShow ? '#0000' : Theme.color.blue,
                }}
                onPress={() => {
                  props.navigation.navigate('Menu');
                }}
                onLongPress={() => {
                  setIsShow(p => !p);
                  console.log('longPress');
                }}
                content=""
              /> */}
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
      </Suspense>
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
    component: React.lazy(() => import('./Menu')),
  },
  {
    name: 'Home',
    component: React.lazy(() => import('./Home/Home')),
  },
  {
    name: 'KeywordAlarm',
    component: React.lazy(() => import('./Home/KeywordAlarm')),
  },
  {
    name: 'LikeList',
    component: React.lazy(() => import('./Home/LikeList')),
  },
  {
    name: 'LocationChange',
    component: React.lazy(() => import('./Home/LocationChange')),
  },
  {
    name: 'MyCategory',
    component: React.lazy(() => import('./Home/MyCategory')),
  },
  {
    name: 'ProductDetail',
    component: React.lazy(() => import('./Home/ProductDetail')),
  },
  {
    name: 'Search',
    component: React.lazy(() => import('./Home/Search')),
  },
  {
    name: 'SearchDetail',
    component: React.lazy(() => import('./Home/SearchDetail')),
  },
  {
    name: 'ChattingHome',
    component: React.lazy(() => import('./Chatting/ChattingHome')),
  },
  {
    name: 'ChattingLocation',
    component: React.lazy(() => import('./Chatting/ChattingLocation')),
  },
  {
    name: 'ChattingDetail',
    component: React.lazy(() => import('./Chatting/ChattingDetail')),
  },
  {
    name: 'ReportCategory',
    component: React.lazy(() => import('./Chatting/ReportCategory')),
  },
  {
    name: 'ReportDetail',
    component: React.lazy(() => import('./Chatting/ReportDetail')),
  },
  {
    name: 'CarBrand',
    component: React.lazy(() => import('./Car/CarBrand')),
  },
  {
    name: 'CarEndNumber',
    component: React.lazy(() => import('./Car/CarEndNumber')),
  },
  {
    name: 'CarFuel',
    component: React.lazy(() => import('./Car/CarFuel')),
  },
  {
    name: 'CarGear',
    component: React.lazy(() => import('./Car/CarGear')),
  },
  {
    name: 'CarLocation',
    component: React.lazy(() => import('./Car/CarLocation')),
  },
  {
    name: 'CarModel',
    component: React.lazy(() => import('./Car/CarModel')),
  },
  {
    name: 'CarRegister',
    component: React.lazy(() => import('./Car/CarRegister')),
  },
  {
    name: 'CarYear',
    component: React.lazy(() => import('./Car/CarYear')),
  },
  {
    name: 'Login',
    component: React.lazy(() => import('./LoginSignUp/Login')),
  },
  {
    name: 'LoginComplete',
    component: React.lazy(() => import('./LoginSignUp/LoginComplete')),
  },
  {
    name: 'SignUp',
    component: React.lazy(() => import('./LoginSignUp/SignUp')),
  },
  {
    name: 'SignUpComplete',
    component: React.lazy(() => import('./LoginSignUp/SignUpComplete')),
  },
  {
    name: 'SignUpForm',
    component: React.lazy(() => import('./LoginSignUp/SignUpForm')),
  },
  {
    name: 'SignUpPhoto',
    component: React.lazy(() => import('./LoginSignUp/SignUpPhoto')),
  },
  {
    name: 'SignUpToS',
    component: React.lazy(() => import('./LoginSignUp/SignUpToS')),
  },
  {
    name: 'BusinessAddress',
    component: React.lazy(() => import('./Business/BusinessAddress')),
  },
  {
    name: 'BusinessForm',
    component: React.lazy(() => import('./Business/BusinessForm')),
  },
  {
    name: 'BusinessLocation',
    component: React.lazy(() => import('./Business/BusinessLocation')),
  },
  {
    name: 'BusinessOpeningHours',
    component: React.lazy(() => import('./Business/BusinessOpeningHours')),
  },
  {
    name: 'BusinessProfile',
    component: React.lazy(() => import('./Business/BusinessProfile')),
  },
  {
    name: 'BusinessProfileBanner',
    component: React.lazy(() => import('./Business/BusinessProfileBanner')),
  },
  {
    name: 'BusinessProfileMenu',
    component: React.lazy(() => import('./Business/BusinessProfileMenu')),
  },
  {
    name: 'BusinessProfileSetting',
    component: React.lazy(() => import('./Business/BusinessProfileSetting')),
  },
  {
    name: 'BusinessSignUp',
    component: React.lazy(() => import('./Business/BusinessSignUp')),
  },
  {
    name: 'AlarmDetail',
    component: React.lazy(() => import('./Notice/AlarmDetail')),
  },
  {
    name: 'AlarmList',
    component: React.lazy(() => import('./Notice/AlarmList')),
  },
  {
    name: 'Notice',
    component: React.lazy(() => import('./Notice/Notice')),
  },
  {
    name: 'OnBoarding1',
    component: React.lazy(() => import('./OnBoard/OnBoarding1')),
  },
  {
    name: 'AppPermission',
    component: React.lazy(() => import('./OnBoard/AppPermission')),
  },
  {
    name: 'OnBoarding2',
    component: React.lazy(() => import('./OnBoard/OnBoarding2')),
  },
  {
    name: 'OnBoarding3',
    component: React.lazy(() => import('./OnBoard/OnBoarding3')),
  },
  {
    name: 'ProductCategory',
    component: React.lazy(() => import('./Product/ProductCategory')),
  },
  {
    name: 'ProductComplete',
    component: React.lazy(() => import('./Product/ProductComplete')),
  },
  {
    name: 'ProductCompleteConfirm',
    component: React.lazy(() => import('./Product/ProductCompleteConfirm')),
  },
  {
    name: 'ProductLocation',
    component: React.lazy(() => import('./Product/ProductLocation')),
  },
  {
    name: 'ProductPhoto',
    component: React.lazy(() => import('./Product/ProductPhoto')),
  },
  {
    name: 'ProductTag',
    component: React.lazy(() => import('./Product/ProductTag')),
  },
  {
    name: 'ProductTier',
    component: React.lazy(() => import('./Product/ProductTier')),
  },
  {
    name: 'ProductTierGuide',
    component: React.lazy(() => import('./Product/ProductTierGuide')),
  },
  {
    name: 'ProductUpdate',
    component: React.lazy(() => import('./Product/ProductUpdate')),
  },
  {
    name: 'ProfileDetail',
    component: React.lazy(() => import('./Profile/ProfileDetail')),
  },
  {
    name: 'ProfileHome',
    component: React.lazy(() => import('./Profile/ProfileHome')),
  },
  {
    name: 'ProfileSellProduct',
    component: React.lazy(() => import('./Profile/ProfileSellProduct')),
  },
  {
    name: 'ProfileSellerReview',
    component: React.lazy(() => import('./Profile/ProfileSellerReview')),
  },
  {
    name: 'ReviewWrite',
    component: React.lazy(() => import('./Profile/ReviewWrite')),
  },
  {
    name: 'FAQ',
    component: React.lazy(() => import('./Setting/FAQ')),
  },
  {
    name: 'PrivacyPolicy',
    component: React.lazy(() => import('./Setting/PrivacyPolicy')),
  },
  {
    name: 'ServiceCenter',
    component: React.lazy(() => import('./Setting/ServiceCenter')),
  },
  {
    name: 'Setting',
    component: React.lazy(() => import('./Setting/Setting')),
  },
  {
    name: 'SettingAlarm',
    component: React.lazy(() => import('./Setting/SettingAlarm')),
  },
  {
    name: 'SettingChatting',
    component: React.lazy(() => import('./Setting/SettingChatting')),
  },
  {
    name: 'SettingDeleteAccount',
    component: React.lazy(() => import('./Setting/SettingDeleteAccount')),
  },
  {
    name: 'SettingLanguage',
    component: React.lazy(() => import('./Setting/SettingLanguage')),
  },
  {
    name: 'SettingPrivacy',
    component: React.lazy(() => import('./Setting/SettingPrivacy')),
  },
  {
    name: 'ToU',
    component: React.lazy(() => import('./Setting/ToU')),
  },
];

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 3000,
  },
});
