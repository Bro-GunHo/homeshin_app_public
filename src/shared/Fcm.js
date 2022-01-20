import React, {Component, useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Container} from 'native-base';
// import firebase from 'react-native-firebase';
// import firebase from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
import Api from '../models/Api';

import {connect} from 'react-redux';
// import ActionCreator from '../actions';

async function callScreen(props, data) {
  var link_screen = '',
    link_param = '';

  switch (data.push_link) {
    case 'push':
      link_screen = 'PushList';
      break;
    case 'counsel':
      link_screen = 'CounselList';
      break;
    case 'coupon':
      link_screen = 'CouponList';
      break;
    case 'review':
      link_screen = 'ReviewWrite';
      link_param = data.ref_idx;
      break;
    case 'notice':
      link_screen = 'BoardList';
      link_param = 'notice';
      break;
    case 'event':
      link_screen = 'BoardList';
      link_param = 'event';
      break;
    case 'qa':
      link_screen = 'QaList';
      break;
    default:
      link_screen = 'MapScreen';
      break;
  }

  if (link_param) {
    if (data.push_link === 'notice' || data.push_link === 'event') {
      props.set_frmData(link_param);
      props.nav.navigate(link_screen, {frmData: link_param});
    } else {
      props.set_idx(link_param);
      props.nav.navigate(link_screen, {idx: link_param});
    }
  } else {
    props.nav.navigate(link_screen);
  }
}

//------------------------------------------------------------------------------
async function requestUserPermission(props) {
  const settings = await messaging().requestPermission();

  if (settings) {
    // console.log('Permission settings:', settings);

    const fcmToken = await messaging().getToken();
    // let token = props.token;
    // if (fcmToken && fcmToken !== token) {
    //   if (props.mb_id) {
    //     // console.log("_updateTokenToServer.............................................");
    //     // console.log(token, ":token");
    //     // console.log(fcmToken, ":fcmToken");

    //     props.set_mb_id(props.mb_id, fcmToken);
    //     Api.send(
    //       'proc_add_instanceid',
    //       {mb_id: props.mb_id, instanceid: fcmToken},
    //       datas => {},
    //     );
    //   }
    // }
  }
}

//------------------------------------------------------------------------------
function Fcm(props) {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('SplashScreen');

  useEffect(() => {
    requestUserPermission(props);

    //응용 프로그램이 실행 중이지만 백그라운드에있는 경우
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
  }, []);

  useEffect(() => {
    // foreground
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', remoteMessage.data);

      Alert.alert(
        remoteMessage.data.title,
        remoteMessage.data.body,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel'),
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              callScreen(props, remoteMessage.data);
            },
          },
        ],
        {cancelable: false},
      );
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null;
  }

  return <View />;
}

function mapStateToProps(state) {
  return {
    mt_id: state.login.mt_id,
    mt_idx: state.login.mt_idx,
    mt_level: state.login.mt_level,
  };
}

export default connect(mapStateToProps)(Fcm);
