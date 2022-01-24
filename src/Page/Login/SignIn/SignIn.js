import React, {useEffect, useState} from 'react';
import {
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomButton from '~/Components/CustomButton';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
import {FontPretendardRegular} from '~/style/Font';
import {style} from './SignInStyle';

import cusToast from '~/Components/CusToast';
import AsyncStorage from '@react-native-community/async-storage'; //비동기 스토리지
import {connect, useDispatch} from 'react-redux';
import {updateLogin as loginAction} from '~/redux/actions/loginAction';
import Api from '~/Api';

function SignIn(props) {
  const {navigation, route} = props;

  const dispatch = useDispatch();

  const [mt_level, setMt_level] = useState('');
  const [mt_hp, setMt_hp] = useState('');
  // const [mt_hp, setMt_hp] = useState('01011111111');
  const [mt_name, setMt_name] = useState('');
  // const [mt_name, setMt_name] = useState('김기술');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!route.params.loginType) {
      cusToast('잘못된 방법입니다.');
      navigation.goBack();

      return;
    }
    setMt_level(route.params.loginType);
    if (route.params.loginType == '2') {
      // setMt_hp('01071848411');
      // setMt_name('홍길동');
    }
  }, [route.params.loginType]);

  const _Login = async () => {
    console.log('Api.state', Api.state.mb_fcm);

    let mb_fcm = Api.state.mb_fcm;

    if (!mt_hp) {
      setErrorMsg('휴대폰번호를 입력해주세요.');
      return;
    }

    if (!mt_name) {
      setErrorMsg('이름을 입력해주세요.');
      return;
    }

    setErrorMsg('');

    //로딩
    let method = '';
    if (mt_level == '2') {
      method = 'proc_login_member';
    } else {
      method = 'proc_login_member_trainer';
    }

    let responseJson = await Api.send(method, {
      mt_hp: mt_hp,
      mt_name: mt_name,
      mt_push_key: mb_fcm,
      mt_device: Platform.OS,
      is_modal: 1000,
    });

    // console.log('datas', responseJson);

    if (responseJson.result == 'Y') {
      //console.log('dataSource<<', Api.state.dataSource);

      let user = responseJson.item[0];
      if (user.mt_idx) {
        dispatch(loginAction(user));
      }

      storeData(mt_hp, mt_name, mb_fcm, mt_level);
    } else {
      setErrorMsg(responseJson.msg);
    }
  };

  const storeData = async (mb_id, mb_key, mb_fcm, mb_level) => {
    try {
      //await AsyncStorage.setItem('@mb_id', mb_id);

      await AsyncStorage.multiSet([
        ['@mb_id', mb_id],
        ['@mb_key', mb_key],
        ['@mb_fcm', mb_fcm],
        ['@mb_level', mb_level.toString()],
        ['@tr_idx', ''],
        ['@mode', ''],
      ]);
    } catch (e) {
      console.log('AsyncStorageError', e);
      // saving error
    }

    //console.log(props.navigation);
    // console.log('OTHE@@', Api.state.baseCode.OTHE[0]);
    navigation.reset({
      index: 1,
      routes: [{name: 'Home'}],
    });

    // navigation.replace('Home');
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS == 'android' ? 45 : 0}>
      <ScrollView
        contentContainerStyle={{
          minHeight: Math.round(Dimensions.get('window').height),
          widht: '100%',
          justifyContent: 'flex-end',
        }}
        bounces={false}>
        <View style={[style.container, {justifyContent: 'flex-end'}]}>
          <View
            style={{
              height: Math.round(Dimensions.get('window').height / 2.5),
              widht: '100%',
              // flex: 1.5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <FastImage
              source={require('~/Assets/Images/img_logo.png')}
              style={{width: 230, height: 230}}
            />
          </View>
          <View>
            <View style={style.section}>
              <View style={style.wrapper}>
                <Text style={style.title}>이름</Text>
                <TextInput
                  style={style.input}
                  value={mt_name}
                  onChangeText={(text) => setMt_name(text)}
                  placeholder="이름을 입력해 주세요."
                  placeholderTextColor="#A2A2A2"
                />
              </View>
              <View style={style.wrapper}>
                <Text style={style.title}>휴대폰 번호</Text>
                <TextInput
                  style={style.input}
                  placeholder="휴대폰 번호를 입력해 주세요.(숫자만입력)"
                  placeholderTextColor="#A2A2A2"
                  value={mt_hp}
                  keyboardType="number-pad"
                  onChangeText={(text) => setMt_hp(text)}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: FontPretendardRegular,
                    color: ColorRed,
                  }}>
                  {errorMsg ? errorMsg : ' '}
                </Text>
              </View>
            </View>
            <View style={style.section}>
              <View style={{marginVertical: 5}}>
                <CustomButton
                  label="로그인"
                  labelColor={ColorWhite}
                  backgroundColor={ColorRed}
                  borderRadius={5}
                  onPress={() => _Login()}
                />
              </View>
              {mt_level == '2' ? (
                <View style={{marginVertical: 5}}>
                  <CustomButton
                    label="회원가입"
                    labelColor={ColorBlack}
                    backgroundColor={ColorWhite}
                    borderColor={'#E3E3E3'}
                    borderRadius={5}
                    onPress={() => navigation.navigate('Terms')}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignIn;
