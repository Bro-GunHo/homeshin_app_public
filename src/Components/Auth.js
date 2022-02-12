import React, {Component, useEffect, useState, useRef} from 'react';
import {SafeAreaView, View, Platform, Alert} from 'react-native';
// import {Container, Header, Content, Spinner} from 'native-base';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import firebase from '@react-native-firebase/app';
import iid from '@react-native-firebase/iid';
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import Api from '~/Api';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import {connect, useDispatch} from 'react-redux';
import ActionCreator from '~/redux/actions';
import * as loginAction from '~/redux/actions/loginAction';

function Auth(props) {
  const dispatch = useDispatch();
  const {navigation} = props;

  useEffect(() => {
    siteInfo();
    Auth_info();
  }, []);

  //----------------------------------------------------------------------------
  const siteInfo = async () => {
    //기초코드
    Api.send('proc_base_code_all', {cd_a: 'FIT'}, (responseJson) => {
      // console.log(responseJson);
    });

    // Api.send('customer_center_info', {}, (args) => {
    //   let resultItem = args.resultItem;
    //   let arrItems = args.arrItems;
    //   if (resultItem.result === 'Y') {
    //     props.set_sconf(
    //       '호갱구조대',
    //       arrItems.st_email,
    //       arrItems.st_customer_tel,
    //       arrItems.st_company_add,
    //       arrItems.st_company_boss,
    //       arrItems.st_company_name,
    //       arrItems.st_company_num2,
    //       arrItems.st_company_num1,
    //       arrItems.st_privacy_admin,
    //       arrItems.st_customer_admin,
    //     );
    //   }
    // });
  };

  async function registerAppWithFCM() {
    if (!messaging().isDeviceRegisteredForRemoteMessages) {
      await messaging().registerDeviceForRemoteMessages();
    }
  }
  async function requestUserPermission() {
    async function requestUserPermission(props) {
      let settings = await messaging().hasPermission();
      if (settings !== messaging.AuthorizationStatus.AUTHORIZED) {
        settings = await messaging().requestPermission();
      }
      const enabled =
        settings === messaging.AuthorizationStatus.AUTHORIZED ||
        settings === messaging.AuthorizationStatus.PROVISIONAL;

      console.log(settings, enabled);
      if (enabled) {
        // settings
        // console.log('Permission settings:', settings);

        // const fcmToken = await messaging().getToken();

        if (Platform.OS === 'ios') {
          PushNotificationIOS.setApplicationIconBadgeNumber(0);
        }

        const id = await iid().get();
        const fcmToken = await firebase.iid().getToken();

        const token = await messaging().getToken();
        Api.state.mb_fcm = token;
      }
    }
  }

  //----------------------------------------------------------------------------
  async function Auth_info() {
    await registerAppWithFCM();
    await requestUserPermission();

    let mt_idx = await AsyncStorage.getItem('@mb_id');
    let mt_level = await AsyncStorage.getItem('@mb_level');
    let mt_name = await AsyncStorage.getItem('@mb_key');

    var temp_mt_id = ''; //await AsyncStorage.getItem("temp_mt_id");
    console.log('@mt_id:', mt_idx);

    const token = await messaging().getToken();

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(remoteMessage);
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );

      //callScreen(props, remoteMessage.data);
    });

    // Check whether an initial notification is available // app closed 일때 받은 메시지가 있는 경우  : 응용 프로그램이 종료 상태에서 열린 경우.
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(remoteMessage);
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type);

          //callScreen(props, remoteMessage.data);
        }
        //setLoading(false);
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', remoteMessage.data);

      Alert.alert(
        remoteMessage.data.title,
        remoteMessage.data.body,
        [
          // {
          //   text: '취소',
          //   onPress: () => console.log('Cancel'),
          //   style: 'cancel',
          // },
          {
            text: '확인',
            onPress: () => {
              callScreen(props, remoteMessage.data);
            },
          },
        ],
        {cancelable: false},
      );
    });

    // setTimeout(() => {
    SplashScreen.hide();
    // }, 1200);

    //----------------------------------------------------------------------------
    if (mt_idx) {
      getLogin(mt_idx, temp_mt_id, token, mt_level, mt_name);
    } else {
      navigation.dispatch(StackActions.replace('Login', {}));
    }
  }

  const getLogin = (mt_idx, temp_mt_id, token, mt_level, mt_name) => {
    if (mt_idx && mt_level) {
      let method = '';
      if (mt_level == '2') {
        //입주자
        method = 'proc_login_member';
      } else if (mt_level == '6') {
        //점검자
        method = 'proc_login_member_trainer';
      } else if (mt_level == '7') {
        //책임자
        method = 'proc_login_member_trainer';
      }

      Api.send(
        method,
        {
          mt_push_key: token,
          mt_hp: mt_idx,
          mt_name: mt_name,
          mt_device: Platform.OS,
          mt_level: mt_level,
        },
        (args) => {
          let resultItem = args.result;
          let arrItems = args.item[0];
          if (resultItem === 'Y') {
            dispatch(loginAction.updateLogin(arrItems));
            // props.set_rconf(
            //   '',
            //   arrItems.mt_login_type === '1' ? arrItems.mt_id : '',
            // );
            //----------------------------------------------------------------------------
            getAddress(mt_idx, temp_mt_id);
          } else {
            // 다른 기기 혹은 관리자에서 탈퇴한 경우 스토리지 삭제 처리
            // AsyncStorage.removeItem('mt_id');

            AsyncStorage.multiRemove([
              '@mb_id',
              '@mb_key',
              '@mb_fcm',
              '@mb_level',
              '@tr_idx',
            ]);
            temp_info(temp_mt_id);
          }
        },
      );
    } else {
      temp_info(temp_mt_id);
    }
  };

  const temp_info = async (temp_mt_id) => {
    var arrItems1 = {
      mt_idx: null,
      mt_id: null,
      mt_level: 2,
      mt_login_type: '1',
    };
    // Api.send('member_info', { temp_mt_id: temp_mt_id }, (args1)=>{

    //   let resultItem1 = args1.resultItem;
    //   let arrItems1 = args1.arrItems;
    //   if (resultItem1.result === 'Y') {
    dispatch(loginAction.updateLogin(JSON.stringify(arrItems1)));
    //----------------------------------------------------------------------------
    getAddress('', temp_mt_id);
    //   }
    // });
  };

  const getAddress = async (mt_id, temp_mt_id) => {
    if (mt_id) {
      navigation.dispatch(StackActions.replace('Home', {}));
    } else {
      navigation.dispatch(StackActions.replace('Login', {}));
    }
  };

  const callScreen = (props, data) => {
    var link_screen = '',
      link_param = '';

    switch (data.send_type) {
      case 'push':
        link_screen = 'PushList';
        break;

      default:
        link_screen = 'Main';
        break;
    }

    if (link_screen && link_param) {
      if (data.push_link === 'notice' || data.push_link === 'event') {
        // props.set_frmData(link_param);
        props.navigate(link_screen, {frmData: link_param});
      } else {
        // props.set_idx(link_param);
        props.navigate(link_screen, {idx: link_param});
      }
    } else {
      // props.navigate(link_screen);
    }
  };

  return (
    <SafeAreaView>
      <View style={{marginTop: '49%'}}>{/* <Spinner color="#999" /> */}</View>
    </SafeAreaView>
  );
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    mt_level: state.login.mt_level,
  };
}

export default connect(mapStateToProps)(Auth);
