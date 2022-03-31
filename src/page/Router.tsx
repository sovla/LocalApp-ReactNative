import {NavigationContainer, useIsFocused, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Theme from 'assets/global/Theme';
import {Text} from 'components/global/text';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
const Stack = createStackNavigator();

const forFade = ({current}: any) => {
  return {
    cardStyle: {opacity: current.progress},
  };
};

export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        {RouterSetting.map((item, index) => (
          <Stack.Screen
            name={item.name}
            component={withScrollView(item.component)}
            key={item.name + index}
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

            <View
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 3000,
              }}>
              <Text>{props.route.name}</Text>
            </View>
          </View>
        </SafeAreaView>
        <SafeAreaView style={{flex: 0, backgroundColor: '#fff'}} />
      </>
    );
  };
};

const RouterSetting: any[] = [];
