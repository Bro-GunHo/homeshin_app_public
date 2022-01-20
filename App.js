import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, View, Platform, BackHandler, LogBox} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigator from '~/Navigation/Navigator';
import {Provider} from 'react-redux';
import initStore from './src/redux/store';
import SplashScreen from 'react-native-splash-screen';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Toast from 'react-native-toast-message';
import {MyText} from '~/shared/MyComponent';
import {
  handleAndroidBackButton,
  handleBackButton,
  removeAndroidBackButtonHandler,
} from '~/shared/AndroidBackButton';

const store = initStore();

class App extends React.Component {
  componentDidMount() {
    // LogBox.ignoreLogs([
    //   'If you want to use Reanimated 2 then go through',
    //   'Non-serializable values were found in the navigation state',
    //   'VirtualizedLists should never be nested',
    // ]);

    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 1200);

    // if (Platform.OS === 'ios') {
    //   PushNotificationIOS.setApplicationIconBadgeNumber(0);
    // }

    //SplashScreen.hide();
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  }

  // 이벤트 해제
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
  }

  toastConfig = {
    custom_type: (internalState) => (
      <View
        style={{
          width: '90%',
          backgroundColor: '#000000e0',
          borderRadius: 50,
          paddingHorizontal: 16,
          paddingVertical: 17,
        }}>
        <MyText style={{textAlign: 'center', color: '#fff', fontSize: 11.5}}>
          {internalState.text1}
        </MyText>
      </View>
    ),
    push: ({text1, text2, props}) => (
      <TouchableOpacity
        style={[
          styles.btn_st0,
          {
            width: Dimensions.get('window').width - 40,
            backgroundColor: '#fff',
            paddingHorizontal: 24,
            paddingVertical: 30,
            marginTop: 46,
            borderColor: '#B71D22',
            zIndex: 9,
          },
        ]}
        onPress={props.onPress ? props.onPress : null}
        activeOpacity={1}>
        {text1 ? (
          <MyText
            style={{
              color: '#000',
              fontSize: 15,
              fontWeight: 'bold',
              lineHeight: 18,
            }}>
            {text1}
          </MyText>
        ) : null}
        {text1 && text2 ? <View style={{marginBottom: 2}} /> : null}
        {text2 ? (
          <MyText style={{color: '#000', fontSize: 14, lineHeight: 18}}>
            {text2}
          </MyText>
        ) : null}
      </TouchableOpacity>
    ),
  };
  render() {
    return (
      <Provider store={store}>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <StatusBar
            barStyle={
              Platform.OS == 'android' ? 'light-content' : 'dark-content'
            }
          />
          <NavigationContainer>
            <Navigator />
          </NavigationContainer>
          <Toast config={this.toastConfig} ref={(ref) => Toast.setRef(ref)} />
        </View>
      </Provider>
    );
  }
}

export default App;
