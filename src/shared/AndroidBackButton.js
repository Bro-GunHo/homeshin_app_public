// packages
import {BackHandler, Alert, ToastAndroid} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 * @param  {Function} callback The function to call on click
 */
const handleAndroidBackButton = (callback) => {
  BackHandler.addEventListener('hardwareBackPress', callback);
  return true;
};

const useBackHandler = (backHandler: () => boolean) => {
  useFocusEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backHandler,
    );
    return () => subscription.remove();
  });
};

/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = (callback) => {
  exitApp = false;
  BackHandler.removeEventListener('hardwareBackPress', callback);
};

const exitAlert = () => {
  Alert.alert('어플이 종료됩니다.', '종료하시겠습니까?', [
    {text: 'CANCEL', style: 'cancel'},
    {text: 'OK', onPress: () => BackHandler.exitApp()},
  ]);
};

var exitApp = false;
var timeout;

// 연속백버튼시 종료
const handleBackButton = () => {
  // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
  if (exitApp == undefined || !exitApp) {
    ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
    exitApp = true;

    timeout = setTimeout(
      () => {
        exitApp = false;
      },
      2000, // 2초
    );
  } else {
    clearTimeout(timeout);

    BackHandler.exitApp(); // 앱 종료
  }
  return true;
};

export {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
  exitAlert,
  handleBackButton,
  exitApp,
  timeout,
};
