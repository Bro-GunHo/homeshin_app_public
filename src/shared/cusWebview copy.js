import React, {Component, useEffect, useState, useRef} from 'react';
import {
  Share,
  View,
  Button,
  Text,
  Image,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  BackHandler,
  ActivityIndicator,
  StatusBar,
  NativeModules,
  Platform,
  AppState,
} from 'react-native';
import {
  NavigationContainer,
  StackActions,
  useFocusEffect,
} from '@react-navigation/native';

import {Container, Content, Icon} from 'native-base';
import {WebView} from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';
// import Geolocation from 'react-native-geolocation-service';
import NetInfo from '@react-native-community/netinfo';
// import SendIntentAndroid from 'react-native-send-intent';
// import LinkingAndroid from 'react-native-intent-linking';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {connect, useDispatch} from 'react-redux';
import Api from '../models/Api';
import Axios from 'axios';
// import * as common from '@component/common';
// import FCM from '@component/FCM';

//userAgent 가져옴
// import DeviceInfo from 'react-native-device-info';

// import Header from './Header';
// import Footer from './Footer';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage'; //비동기 스토리지
import FitTimerTra from '../screens/FitTimerTra';
import {
  restStartAction,
  restStopAction,
  restUserSettingAction,
} from '../models/FitRestReducer';
import {
  fitStartAction,
  fitStopAction,
  fitTimeLoad,
} from '../models/FitTimerReducer';

import FitHistoryListScreen from '../screens/FitHistoryListScreen';

//fcm;
import messaging from '@react-native-firebase/messaging';

const CusWebview = (props) => {
  const appState = useRef(AppState.currentState);
  const [isConnected, setIsConnected] = useState(true);
  const [isLoadong, setLoading] = useState(false);
  const [actMenu, setActMenu] = React.useState('');
  const [actMenuUrl, setActMenuUrl] = React.useState('');
  const [loginPage, setLoginPage] = React.useState(Api.jsonUrl);

  const [mainScreen, setMainScreen] = React.useState(true);
  const [headerUse, setHeaderUse] = React.useState(true);
  const [footerUse, setFooterUse] = React.useState(false);

  const restTimeProps = {
    restStartTime: props.restStartTime,
    restStopTime: props.restStopTime,
    // restTime: props.restTime,
    restDefTime: props.restDefTime,
    restStart: props.restStart,
    restUse: props.restUse,
    restBig: props.restBig,
    restSound: props.restSound,

    fitStart: props.fitStart,
    fitStopTime: props.fitStopTime,
    fitStartTime: props.fitStartTime,
  };

  const timer_load = () => {};

  const [mt_idx, setMt_idx] = React.useState('');

  const today = Api.formatDate(new Date());

  const [check_dt, setCheck_dt] = React.useState(today);

  // isTopBack;

  const [urls, seTurls] = React.useState(props.url);
  const webViews = React.useRef();

  const [isTopBack, setIsTopBack] = React.useState(false);

  let temp_agent =
    'Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19';
  temp_agent += '';
  const [userAgent, setUserAgent] = React.useState(temp_agent);

  const dispatch = useDispatch();

  React.useEffect(() => {
    //requestCameraPermission();
    //requestLocationPermission();
    InternetCheck();

    //포그라운드 실행중일떄 푸시처리
    const myMsgFore = messaging().onMessage(async (remoteMessage) => {
      await console.log('splash running fcm:', remoteMessage);

      callScreen(remoteMessage.data, props.navigation, true);
    });

    console.log('Api.state.goPopup', Api.state.goPopup);

    //앱 꺼져있을때 들어온 푸시 처리.
    if (Api.state.goPopup) {
      let popup_param1 = Api.state.goPopupData.param1;
      let popup_param2 = Api.state.goPopupData.param2;
      let mt_idx = Api.state.goPopupData.param3;
      let popupType = Api.state.goPopupData.type;
      let link_screen = Api.state.goPopupData.link_screen;

      let newLink_screen = '';
      switch (popupType) {
        case 'trainer_addmember':
          newLink_screen = Api.state.trainerUrl + 'member.php?user_type=wait';
          break;
        case 'trainer_fit_update':
        case 'trainer_fit_comment':
          newLink_screen =
            Api.state.trainerUrl +
            'diary.php?mt_idx=' +
            mt_idx +
            '&check_dt=' +
            popup_param2 +
            '&tabs=fit';
          break;
        case 'trainer_diet_update':
        case 'trainer_diet_comment':
          newLink_screen =
            Api.state.trainerUrl +
            'diary.php?mt_idx=' +
            mt_idx +
            '&check_dt=' +
            popup_param2 +
            '&tabs=diet';
          break;

        default:
          newLink_screen = '';
          break;
      }

      console.log('newLink_screen', newLink_screen);

      Api.state.goPopup = false;
      Api.state.goPopupData = {};

      Alert.alert(Api.state.goPopupData.title, Api.state.goPopupData.body, [
        {
          text: '취소',
          onPress: () => false,
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            if (newLink_screen) {
              try {
                seTurls(newLink_screen);
              } catch (e) {}
            } else {
              // seTurls('/tra/index.php');
            }
          },
        },
      ]);

      console.log('Api.state.goPopup WebView', Api.state.goPopup);
    }

    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };

    //console.log('dev id', DeviceInfo.getDeviceId());

    //유저에이전트 셋팅
    // DeviceInfo.getUserAgent().then((userAgent) => {
    //   //setUserAgent(userAgent);
    //   setUserAgent(
    //     'Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19',
    //   );
    // });
  }, []);

  React.useEffect(() => {
    if (props.url != urls) {
      console.log('change Url', props.url);
      seTurls(props.url);
    }
  }, [props.url]);

  //포커스
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => handleBackButton(),
      );

      return () => subscription.remove();
    }, [urls]),
  );

  //앱 백그라운드 체크
  const _handleAppStateChange = async (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }

    appState.current = nextAppState;
    // setAppStateVisible(appState.current);
    console.log('AppState', appState.current);

    if (appState.current === 'active') {
      console.log('webViews', webViews.current);
      webViews.current.reload();
    }
    if (appState.current === 'background') {
    }
  };

  async function callScreen(remoteMessage, navigation, isDirectPop) {
    console.log('call_screen2', remoteMessage);
    let type = remoteMessage.send_type;
    let link_screen = '';
    let mt_idx = remoteMessage.mt_idx;
    let link_param = remoteMessage.param1;
    let link_param2 = remoteMessage.param2;

    let newLink_screen = '';
    if (type.indexOf('trainer_') > -1) {
      switch (type) {
        case 'trainer_addmember':
          newLink_screen = Api.state.trainerUrl + 'member.php?user_type=wait';
          break;
        case 'trainer_fit_update':
        case 'trainer_fit_comment':
          newLink_screen =
            Api.state.trainerUrl +
            'diary.php?mt_idx=' +
            mt_idx +
            '&check_dt=' +
            link_param2 +
            '&tabs=fit';
          break;
        case 'trainer_diet_update':
        case 'trainer_diet_comment':
          newLink_screen =
            Api.state.trainerUrl +
            'diary.php?mt_idx=' +
            mt_idx +
            '&check_dt=' +
            link_param2 +
            '&tabs=diet';
          break;

        default:
          newLink_screen = '';
          break;
      }

      console.log('newLink_screen', newLink_screen);

      if (newLink_screen) {
        if (isDirectPop) {
          Alert.alert(remoteMessage.title, remoteMessage.body, [
            {
              text: '취소',
              onPress: () => false,
              style: 'cancel',
            },
            {
              text: '확인',
              onPress: () => {
                try {
                  if (newLink_screen) seTurls(newLink_screen);
                } catch (e) {}
              },
            },
          ]);

          Api.state.goPopup = false;
          Api.state.goPopupData = {};
        } else {
          Api.state.goPopupData = {
            type: type,
            title: remoteMessage.title,
            body: remoteMessage.body,
            param1: link_param,
            param2: link_param2,
            param3: remoteMessage.mt_idx,
            link_screen: link_screen,
          };
          Api.state.goPopup = true;
        }
        console.log(
          'goPageData2',
          Api.state.goPageData,
          Api.state.goPopupData,
          isDirectPop,
        );
      }
    } else {
      return false;
    }
  }

  //웹뷰 ->  RN 으로 전송
  const onWebViewMessage = (datas) => {
    console.log('웹뷰에서 데이터를 받습니다.');
    let jsonData = JSON.parse(datas.nativeEvent.data);
    console.log(jsonData);

    //로그인후 아이디값을 받았다면 저장한다.
    if (jsonData.type == 'login_check') {
      //console.log('token', props.token);
      webSaveToken(jsonData);
    } else if (jsonData.type == 'console') {
      console.log('@webviewLog', jsonData.log);
    } else if (jsonData.type == 'outlink') {
      console.log('@webviewLog', jsonData.url);
      const supported = Linking.canOpenURL(jsonData.url);
      if (supported) {
        Linking.openURL(jsonData.url);
      }
    } else if (jsonData.type == 'goBack') {
      props.navigation.goBack();
    } else if (jsonData.type == 'goAppLogin') {
      props.navigation.navigate('LoginScreen');
    } else if (jsonData.type == 'timerUpdate') {
      //let {mt_idx, tr_idx, fit_time, check_dt} = jsonData;
      if (mt_idx != jsonData.mt_idx || check_dt != jsonData.check_dt) {
        console.log('timerUpdate', jsonData);
        setMt_idx(jsonData.mt_idx);
        setCheck_dt(jsonData.check_dt);

        dispatch(fitTimeLoad(jsonData.fit_time));
      }

      // if(mt_idx! = mt_idx){
      // dispatch(fitTimeLoad(jsonData.));
    }
  };

  const webSaveToken = async (user) => {
    /*S:사이트정보 가져오기*/

    const {mb_id, mt_rest_time, mt_rest_sound, mt_rest_big, mt_rest_yn} = user;

    console.log('props.token', props.token);

    const formData = new FormData();
    formData.append('mb_fcm', props.token);
    formData.append('method', 'proc_save_token');
    formData.append('mb_id', mb_id);
    formData.append('device', Platform.OS);

    Axios.post(Api.state.jsonUrl, formData).then(function (response) {
      if (response.data.result == 'Y') {
        console.log('토큰을 기록했습니다.', mb_id);

        Api.state.tr_idx = mb_id;
        dispatch(
          restUserSettingAction({
            restUse: mt_rest_yn == 'Y',
            restBig: mt_rest_big == 'Y',
            restSound: mt_rest_sound == 'Y',
            restDefTime: parseInt(mt_rest_time),
          }),
        );
      } else {
        //console.log(response.data);
      }
    });

    //트레이너 어플 사용을 기록하여 splash에서 웹뷰로 바로 보냄
    if (mb_id && props.token) {
      await AsyncStorage.multiSet([
        ['@tr_idx', mb_id],
        ['@mode', 'tra'],
      ]);
    }

    /*E:사이트정보 가져오기*/
  };

  //RN -> 웹뷰로 POST 전송
  const onSendWebViewMessage = (webViews) => {
    //webViews.current.postMessage(JSON.stringify(UserData));
  };

  const page_goBack = () => {
    //Linking.openURL("carwash://card_pay");
    //Linking.openURL("carwash://");
    //Linking.openURL("cusWebview");
    webViews.current.goBack();
  };

  const page_goForward = () => {
    webViews.current.goForward();
  };
  const page_home = () => {
    webViews.current.injectJavaScript(
      "window.location.href = '/tra/index.php';",
    );
  };
  const category = () => {
    webViews.current.injectJavaScript("$('#category').show();");
  };

  function onShouldStartLoadWithRequest(e) {
    let wurl = e.url;
    console.log('onShouldStartLoadWithRequest', e.url);

    if (wurl == 'http://fifree.co.kr/bbs/password_lost.php') {
      Linking.openURL(wurl);
      return false;
    }

    let rs = true;
    //var SendIntentAndroid = require('react-native-send-intent');
    if (
      //!wurl.startsWith('https://wakeupearly.co.kr') &&
      //wurl.startsWith('intents://')
      !wurl.startsWith('http://') &&
      !wurl.startsWith('https://') &&
      !wurl.startsWith('javascript:')
    ) {
      console.log('@#!@#');

      wurl = wurl.replace('intents://');

      webViews.current.stopLoading();
      const supported = Linking.canOpenURL(wurl);
      if (supported) {
        Linking.openURL(wurl);
      }

      /*
      if (Platform.OS == 'android') {
        webViews.current.stopLoading();
        SendIntentAndroid.openChromeIntent(wurl).then((isOpened) => {
          if (!isOpened) {
            ToastAndroid.show('어플을 설치해주세요.', ToastAndroid.SHORT);
          }
        });
      } else {
        webViews.current.stopLoading();
        const supported = Linking.canOpenURL(wurl);
        if (supported) {
          Linking.openURL(wurl);
        } else {
          alert('어플을 설치해주세요');
        }
      }*/
      rs = false;
    }

    return rs;
  }

  //footerTimer View
  const footerViewArray = ['/tra/diary.php', '/tra/fit_select.php'];

  //백버튼 눌렀을때도 여기로 옴
  const onNavigationStateChange = (webViewState) => {
    let wurl = webViewState.url;

    //if (webViewState.url == urls) return;

    console.log('onNavigationStateChange', wurl);

    //상단 백버튼
    const BackViewArray = [
      'https://nid.naver.com/oauth2.0/authorize',
      'https://accounts.kakao.com/login?',
      'https://accounts.google.com',
      'https://accounts.youtube.com/accounts/',
      'https://www.google.com/recaptcha/api2/bframe',
      'about:blank',
      'kakaotalk://',
      'https://appleid.apple.com/auth/authorize',
      'https://logins.daum.net/accounts/kakaotemptokenlogin',
    ];

    let temp = false;
    for (const v of BackViewArray) {
      if (wurl.indexOf(v) > -1) {
        temp = true;
        break;
      }
    }
    setIsTopBack(temp);

    //하단
    let isFooter = false;
    for (const v of footerViewArray) {
      console.log('vvv', v, wurl.indexOf(v));
      if (wurl.indexOf(v) > -1) {
        isFooter = true;
        break;
      }
    }
    setFooterUse(isFooter);

    //mt_idx 입력 -> 웹뷰에서 데이터 받아서 처리하는것으로 옮김
    // let temp_mt_idx = Api.getParameterByName(wurl, 'mt_idx');
    // if (temp_mt_idx) {
    //   //달라졌을때 작업
    //   if (mt_idx != temp_mt_idx) {
    //     setMt_idx(temp_mt_idx);
    //     dispatch(fitStopAction());
    //     // Api.send('')
    //   }
    //   setMt_idx(temp_mt_idx);
    // }

    //외부 링크일 경우 새창
    /*
		if(wurl.indexOf(Api.siteUrl)=="-1"){
            var str = wurl;
            var str2 = "channel.io";
            var urlResult = str.indexOf(str2);

            if(wurl != "about:blank"){
                if(urlResult == "-1"){
                    LinkingAndroid.openURL(wurl);
                }
            }
        }
        */

    //로그인, 로그아웃이면 메인 스크린으로
    // if (wurl == Api.homeUrl + '?app_login=Y') {
    //   setActMenu('');

    //   //seTurls('')
    //   //props.navigation.navigate('Main');
    //   // props.navigation.reset({
    //   //   index: 0,
    //   //   routes: [{name: 'Main'}],
    //   // });
    // } else if (wurl == Api.homeUrl) {
    //   setActMenu('');
    // } else if (wurl == Api.siteUrl + '/app/sg_learn.php') {
    //   setActMenu('1');
    // } else if (wurl == Api.siteUrl + '/app/sg_point.php') {
    //   setActMenu('2');
    // } else if (wurl == Api.siteUrl + '/app/sg_mocktest.php') {
    //   setActMenu('3');
    // } else if (wurl == Api.siteUrl + '/app/sg_myinfo.php') {
    //   setActMenu('4');
    // }

    /*S:사이트정보 가져오기*/
    // const formData = new FormData();
    // formData.append('webview_url', wurl);
    // formData.append('method', 'proc_site_config');
    // Axios.post(Api.jsonUrl, formData)
    //   .then(function (response) {
    //     if (response.data.result == 'Y') {
    //       var MainScreen = response.data.item[0].MainScreen;
    //       var HeaderMenu = response.data.item[0].HeaderMenu;
    //       var FooterMenu = response.data.item[0].FooterMenu;
    //       console.log('사이트정보', response.data.item[0]);
    //       setMainScreen(MainScreen);
    //       setHeaderUse(HeaderMenu);
    //       setFooterUse(FooterMenu);
    //     } else {
    //       console.log('사이트정보가 없습니다');
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log('GET INFO : 사이트정보 가져오기에 실패하였습니다');
    //   });
    /*E:사이트정보 가져오기*/

    //IntentLauncher.startActivityAsync()
    //console.log(wurl);
    seTurls(webViewState.url);
  };

  //닫기가 나와야될 페이지
  const closeArray = ['/tra/index.php', '/tra/?app_login=Y', '/tra/login.php'];
  const homeArray = [
    '/app/sg_learn.php',
    '/app/sg_point.php',
    '/app/sg_mocktest.php',
    '/app/sg_myinfo.php',
  ];

  const handleBackButton = () => {
    console.log('props.url', urls);

    //모의고사 백버튼
    if (urls.indexOf('/app/sg_test_mo.php') > -1) {
      webViews.current.postMessage(JSON.stringify({type: 'test_mo_back'}));
      return true;
    }

    //학습하기 백버튼
    if (
      urls.indexOf('/app/sg_test.php') > -1 ||
      urls.indexOf('/app/sg_test_answer.php') > -1
    ) {
      webViews.current.postMessage(JSON.stringify({type: 'test_back'}));
      return true;
    }

    //OX 문제 백버튼
    // if (
    //   urls.indexOf('/app/sg_test_ox.php') > -1 ||
    //   urls.indexOf('/app/sg_test_ox_answer.php') > -1
    // ) {
    //   webViews.current.postMessage(JSON.stringify({type: 'test_ox_back'}));
    //   return true;
    // }

    let isClose = false;
    for (const v of closeArray) {
      // console.log('vvv', v, urls.indexOf(v));
      if (urls.indexOf(v) > -1) {
        isClose = true;
        break;
      }
    }

    let isHome = false;
    for (const v of homeArray) {
      //console.log(v, urls.indexOf(v));
      if (urls.indexOf(v) > -1) {
        isHome = true;
        break;
      }
    }

    console.log('isHome', isHome);

    if (isClose) {
      Alert.alert('어플을 종료할까요?', '', [
        {text: '네', onPress: () => BackHandler.exitApp()},
        {text: '아니요'},
      ]);
    } else if (isHome) {
      //홈으로 가야되는 페이지라면 홈으로 보냄
      //console.log(props);
      //props.navigation.navigate('Main', {isReset: true});
      // props.navigation.reset({
      //   index: 0,
      //   routes: [{name: 'Main'}],
      // });
      seTurls(Api.homeUrl);
    } else {
      webViews.current.postMessage(
        JSON.stringify({type: 'normal_back', urls: urls}),
      );
      //webViews.current.goBack();
    }

    return true;
  };

  //인터넷 연결 확인
  const InternetCheck = async () => {
    NetInfo.fetch().then((state) => {
      //console.log("Connection type", state.type); //wi-fi
      //console.log("Is connected?", state.isConnected);	//true, false
      if (state.isConnected === false) {
        //Alert.alert('인터넷 연결후에 이용하세요','', [{text: 'OK', onPress:() => BackHandler.exitApp()}] )
        setIsConnected(false);
        return false;
      } else {
        setIsConnected(true);
        return true;
      }
    });
  };

  //카메라
  const requestCameraPermission = async () => {
    // We need to ask permission for Android only
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 사용',
          message:
            Api.siteName + '에서 고객님의 카메라를 사용 가능하도록 합니다.',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log("카메라 사용 가능");
      } else {
        // Permission Denied
        console.log('CAMERA Permission Denied');
      }
    } else {
      //console.log("카메라 사용 가능");
    }
  };

  //위치정보
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치정보 이용',
          message:
            Api.siteName + '에서 고객님의 위치정보를 활용해 주소를 확인합니다.',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log("위치정보 확인");
        Auth_App();
      } else {
        //console.log("위치정보 사용불가");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  async function Auth_App() {
    // const geo_info = await Geolocation.getCurrentPosition(
    //   (position) => {
    //     console.log('position.coords', position.coords);
    //     const {latitude, longitude} = position.coords;
    //     set_latitude_t(latitude);
    //     set_longitude_t(longitude);
    //   },
    //   (error) => {
    //     //console.log('error', error);
    //   },
    //   {enableHighAccuracy: false, timeout: 15000, maximumAge: 1000},
    // );
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //Url에서 코드를 추출
  const urlGetMt = (urls) => {
    if (urls) {
      let v = Api.getParameterByName(urls, 'mt_idx');

      if (v) return v;
      else return false;

      //let url_arr = urls.toString().split('mt_idx=');
    }
  };

  const debugging = `
  console = new Object();
  console.log = function(log){
    window.ReactNativeWebView.postMessage(JSON.stringify({type:'console', log: log}));
  }
  console.debug = console.log;
  console.info = console.log;
  console.warn = console.log;
  console.error = console.log;
/*
  var appbridge = function(obj){
    window.ReactNativeWebView.postMessage(JSON.stringify(obj));
  }
  */
  `;

  return (
    <SafeAreaView style={{flex: 1}}>
      {isConnected == true ? (
        <View style={{flex: 1}}>
          {/* {isTopBack ? (
            <View style={{marginVertical: 10}}>
              <TouchableOpacity onPress={page_goBack}>
                <Image
                  source={require('../src/img/back2.png')}
                  style={{height: 30, resizeMode: 'contain'}}
                />
              </TouchableOpacity>
            </View>
          ) : null} */}
          <WebView
            ref={webViews}
            userAgent={userAgent + ' -- fifreeApp -- ' + Platform.OS}
            source={{uri: urls}}
            onLoadEnd={(webViews) => {
              //onSendWebViewMessage(webViews);
              setLoading(false);
              onNavigationStateChange(webViews.nativeEvent);
            }}
            pullToRefreshEnabled={true}
            //allowsBackForwardNavigationGestures={true}
            cacheEnabled={false}
            onMessage={(webViews) => onWebViewMessage(webViews)}
            setSupportMultipleWindows={false}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            //onNavigationStateChange={onNavigationStateChange}
            //onNavigationStateChange={
            //(webViews) =>
            //onNavigationStateChange(webViews)
            //} //for Android

            injectedJavaScript={debugging}
            javaScriptCanOpenWindowsAutomatically={true}
            javaScriptEnabledAndroid={true}
            allowFileAccess={true}
            //renderLoading={true}
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled={true}
            scalesPageToFit={false}
            originWhitelist={['*']}
          />

          {isLoadong && (
            <ActivityIndicator
              color="#009688"
              style={{
                flex: 1,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              size="large"
            />
          )}
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 100,
            }}>
            {/* <Image
              style={{width: 100, height: 100, resizeMode: 'contain'}}
              source={require('./img/wifi.png')}
            /> */}
            <Text
              style={{
                color: '#2EBAC2',
                marginTop: 10,
                fontSize: 16,
                textAlign: 'center',
              }}>
              {Api.state.siteName} 서비스는
            </Text>
            <Text
              style={{
                color: '#2EBAC2',
                marginTop: 5,
                fontSize: 16,
                textAlign: 'center',
              }}>
              인터넷 연결후에 앱을 재시작 하세요
            </Text>
          </View>
        </View>
      )}

      {footerUse ? (
        <View
          style={{
            // paddingHorizontal: 10,
            backgroundColor: '#F2F3F8',
          }}>
          <View style={{backgroundColor: '#FFFFFF'}}>
            <FitTimerTra
              {...restTimeProps}
              check_dt={check_dt}
              isModal={false}
              trainerMode={true}
              mt_idx={mt_idx}
            />
          </View>
        </View>
      ) : null}

      {/* <Footer
        actMenu={actMenu}
        footerUse={footerUse}
        navigation={props.navigation}
        webViews={webViews}
        seTurls={seTurls}
      /> */}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    restStartTime: state.rest.restStartTime,
    restStopTime: state.rest.restStopTime,
    // restTime: state.rest.restTime,
    restDefTime: state.rest.restDefTime,
    restStart: state.rest.restStart,
    restUse: state.rest.restUse,
    restBig: state.rest.restBig,
    restSound: state.rest.restSound,

    fitStart: state.fit.fitStart,
    fitStartTime: state.fit.fitStartTime,
    fitStopTime: state.fit.fitStopTime,
  };
};

export default connect(mapStateToProps)(CusWebview);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
  },
  ActivityIndicatorStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topmenu: {
    width: 100,
    height: 55,
    fontSize: 13,
    color: '#5B5A5A',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
  },
  img: {
    marginTop: 0,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  img2: {
    marginTop: 0,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  Text: {
    fontSize: 11,
  },
  Text_on: {
    color: '#288FA4',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
  Text_off: {
    color: '#333333',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: -1,
  },
});
