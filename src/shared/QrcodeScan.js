import React, {Component, useState} from 'react';
import {
  View,
  Button,
  StyleSheet,
  Text,
  NativeModules,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {colors, mystyle} from '../utils/Styles';
import {
  Container,
  Content,
  Header,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Tabs,
  Tab,
  TabHeading,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RNCamera} from 'react-native-camera';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HEAD} from '../utils/Icons';
import Toast from 'react-native-toast-message';
import {
  CommonActions,
  StackActions,
  NavigationAction,
} from '@react-navigation/native';
//import QRCodeScanner from 'react-native-qrcode-scanner';

/*
props
@visible : boolean 필수값
@close : function 필수값  닫기 함수

*/
const initialState = {
  visible: false,
};

const PendingView = () => (
  <View
    style={{
      flex: 1,
      //backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator color={mystyle.mainColor1} size={'large'} />
  </View>
);

export default function preload(props) {
  console.log('props', props);
  const [isBarcodeRead, setisBarcodeRead] = useState(false);

  const _onSuccess = (datas) => {
    console.log('qr', datas, props.navigation);

    let data = datas.data;
    let tempArr = new Array();
    if (data && data.indexOf('code=') > -1) {
      console.log(data);
      tempArr = data.split('code=');

      if (tempArr[1]) {
        // props.navigation.navigate('FIT', {
        //   screen: 'FitDetailScreen',
        //   params: {ft_idx: tempArr[1]},
        // });

        //props.navigation.goBack();
        // props.navigation.popToTop();

        props.navigation.dispatch(
          CommonActions.navigate('FIT', {
            screen: 'FitnessScreen',
            params: {ft_idx: tempArr[1], goDetail: true},
          }),
        );

        // props.navigation.dispatch(
        //   CommonActions.navigate('FIT', {
        //     screen: 'FitDetailScreen',
        //     params: {ft_idx: tempArr[1]},
        //   }),
        // );

        // props.navigation.navigate('FIT', {
        //   screen: 'FitnessScreen',
        //   params: {ft_idx: tempArr[1]},
        // });

        // props.navigation.navigate('FIT', {
        //   screen: 'FitDetailScreen',
        //   params: {ft_idx: tempArr[1]},
        // });

        // props.navigation.reset({
        //   index: 1,
        //   routes: [{name: 'Home'}, {name: 'FitnessScreen'}],

        // });
      } else {
        Toast.show({
          text1: '잘못된 방법입니다.',
          position: 'top',
          type: 'error',
        });
      }
    } else {
      Toast.show({
        text1: '피프리에서 사용할 수 없는 QR코드입니다.',
        position: 'top',
        type: 'error',
      });
    }

    // Toast.show({
    //   text1: '알림',
    //   text2: datas,
    //   position: 'top',
    //   type: 'info',
    // });
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     console.log('dialog load');

  //     return () => {
  //       console.log('dialog load unfocus');

  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );

  //포커스
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      if (isActive) {
        setisBarcodeRead(false);
      }

      return () => {
        isActive = false;
      };
    }, []),
  );

  // React.useEffect(() => {
  //   console.log('open barcodeRead');
  //   setisBarcodeRead(false);
  // },[]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={
              () => props.navigation.goBack()
              // ()=>props.navigation.reset({
              //   index: 0,
              //   routes: [{name: 'HOME'}],
              // })
            }>
            <View>
              <Image
                source={HEAD.BACK}
                style={{height: 44, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: colors.scheduleColor,
              }}>
              QR코드
            </Text>
          </View>

          <View style={{width: 70}}></View>
        </View>
        <Content scrollEnabled={false}>
          <View>
            <RNCamera
              // ref={ref => {
              //   console.log('ref', ref);
              //   this.camera = ref;
              // }}
              captureAudio={false}
              isRecording={false}
              style={{
                width: wp('100%'),
                height: hp('100%') - 44,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#333333',
              }}
              ratio={'1:1'}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.auto}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              // androidRecordAudioPermissionOptions={{
              //   title: 'Permission to use audio recording',
              //   message: 'We need your permission to use your audio',
              //   buttonPositive: 'Ok',
              //   buttonNegative: 'Cancel',
              // }}
              //   onGoogleVisionBarcodesDetected={({barcodes}) => {
              //     console.log(barcodes);
              //   }}
              onBarCodeRead={(datas) => {
                //연속실행방지
                if (!isBarcodeRead) {
                  setisBarcodeRead(true);
                  _onSuccess(datas);
                }
              }}
              barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}>
              {({camera, status, recordAudioPermissionStatus}) => {
                console.log(status);
                if (status !== 'READY') return <PendingView />;
                else
                  return (
                    <View>
                      <View
                        style={{
                          width: 200,
                          height: 200,
                          borderWidth: 2,
                          borderColor: '#333333',
                        }}></View>
                    </View>
                  );
              }}
            </RNCamera>
          </View>
        </Content>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* 다이얼로그 */
  dialog: {
    width: 170,
    height: 170,
    //alignContent: 'stretch',
    //justifyContent: 'flex-start',
    //flexDirection: 'column',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    borderBottomColor: '#D7D7D7',
    borderBottomWidth: 1,
  },

  //dialogItem: {padding: 20, fontSize: 20},
});
