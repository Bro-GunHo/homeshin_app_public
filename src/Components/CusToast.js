import React, {useEffect, useState} from 'react';
import {Keyboard, Platform, StatusBar} from 'react-native';
// import { Toast } from 'native-base';
import Toast from 'react-native-toast-message';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const cusToast = (message, type, props, params, visibilityTime) => {
  async function callScreen(props, data) {
    Toast.hide();
    if (data) {
      var link_screen = data.push_link,
        // link_param = (data.ref_param);
        link_param = JSON.parse(data.ref_param);
      console.log('callScreen..', link_screen, link_param);

      if (!link_screen || link_screen === 'Main') {
        props.navigation.navigate('Main', {reload: true});
      } else {
        props.navigation.navigate(link_screen, link_param);
      }
    }
  }

  // Toast.show({ text: message, textStyle: styles.toastTxt, style: styles.toastWr, }); // native-base
  Toast.show({
    type: type ? type : 'custom_type', //success | error | info
    position: 'top',
    text1: type === 'push' ? (params ? params.title : '') : message,
    text2: type === 'push' ? message : '',
    visibilityTime:
      type === 'push' ? 3000 : visibilityTime ? visibilityTime : 1000,
    autoHide: true,
    topOffset: (Platform.OS === 'ios' ? 56 + getStatusBarHeight() : 0) + 10,
    bottomOffset: 10,
    onShow: () => {},
    onHide: () => {},
    // onPress: () => { props ? callScreen(props, params) : null },
    props: {
      onPress: () => {
        props ? callScreen(props, params) : null;
      },
    },
  });
};

export default cusToast;
