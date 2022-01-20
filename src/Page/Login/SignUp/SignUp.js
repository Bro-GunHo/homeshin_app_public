import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  Platform,
  Keyboard,
} from 'react-native';
import BackButton from '~/Components/BackButton';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorRed, ColorWhite, ColorLowRed} from '~/style/Color';
import {style} from './SignUpStyle';
import Api from '~/Api';
import cusToast from '~/Components/CusToast';
import Timer from '~/Components/Timer';
import {connect, useDispatch} from 'react-redux';
import ActionCreator from '~/redux/actions';
import * as loginAction from '~/redux/actions/loginAction';
import AsyncStorage from '@react-native-community/async-storage';

function SignUp({navigation}) {
  const [mt_hp_check, set_mt_hp_check] = useState(false); //인증번호 체크
  // const [mt_hp_duplicate_check, set_mt_hp_duplicate_check] = useState(false); //중복 체크
  const [isSend, setIsSend] = useState(false); //발송여부
  const [isLoading, setIsLoading] = useState(false); //발송여부

  const [mt_hp, setMt_hp] = useState('');
  const [mt_name, setMt_name] = useState('');
  const [mt_confirm_num, setMt_confirm_num] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [hpDisabled, setHpDisabled] = useState(false);

  const dispatch = useDispatch();

  // React.useEffect(() => {

  // }, [isTimer, sendText]);

  //sms발송
  const _send_confirm_num = (mt_hp, setV) => {
    Api.send('proc_sms_send', {phone: mt_hp}, (responseJson) => {
      if (responseJson.result != 'N') {
        let item = responseJson.item;
        //Toast.show({text: item.msg, position: 'top', duration: 5000});

        // cusToast('휴대폰으로 인증번호가 발송 되었습니다.');
        cusToast(responseJson.msg, '', '', '', 5000);
        setIsSend(true); //문자 발송처리

        set_mt_hp_check(false); //인증 실패로

        var sTimeout = '';
        // clearTimeout(sTimeout);
        sTimeout = setTimeout(() => {
          setSeconds(300);
        }, 500);
      }

      Keyboard.dismiss();
    });
  };

  //인증하기
  const _check_confirm_num = () => {
    if (!isSend) {
      cusToast('발송버튼을 먼저 눌러주세요.');
      return;
    }

    Keyboard.dismiss();

    Api.send(
      'proc_sms_check',
      {phone: mt_hp, check_number: mt_confirm_num},
      (responseJson) => {
        if (responseJson.result == 'Y') {
          //인증성공
          set_mt_hp_check(true);
          setHpDisabled(true); //전화번호 변경 락
          setSeconds(0);

          cusToast(responseJson.msg);
        }
      },
    );
  };

  //전송
  const _goJoin = async () => {
    let v = {
      mt_hp,
      mt_name,
    };

    if (!mt_name) {
      cusToast('이름을 입력해주세요.');
      return;
    }

    if (!mt_hp_check) {
      cusToast('휴대폰인증은 필수입니다.');
      return;
    }

    setIsLoading(true);

    let responseJson = await Api.send('proc_add_member', {
      mt_hp: v.mt_hp,
      mt_name: v.mt_name,
      mt_level: 2,
      mt_hp_check: mt_hp_check,
      mt_device: Platform.OS,
      mt_push_key: Api.state.mb_fcm,
    });

    console.log('responseJson', responseJson);

    if (responseJson.result == 'Y') {
      let userData = responseJson.item[0];

      console.log('userData', userData);

      cusToast('회원가입 되었습니다.');

      dispatch(loginAction.updateLogin(userData));

      storeData(userData.mt_id, userData.mt_name);

      //회원가입 성공
      navigation.navigate('SignComplete', {
        mb_id: v.mt_hp,
        mb_key: v.mt_pwd,
      });
    }

    setIsLoading(false);

    //navigation.navigate('JoinFormScreen');
  };

  const timeFinish = () => {
    console.log('Finished');

    setIsSend(false);
    if (!mt_hp_check) {
      setHpDisabled(false);
    }
  };

  const storeData = async (mb_id, mb_key) => {
    try {
      await AsyncStorage.multiSet([
        ['@mb_id', mb_id],
        ['@mb_key', mb_key],
        ['@mb_fcm', Api.state.mb_fcm],
        ['@mb_level', '2'],
      ]);
    } catch (e) {
      console.log('AsyncStorageError', e);
    }

    //props.navigation.navigate('DrawerScreen', {screen: 'HomeScreen'});
    // navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Auth'}],
    // });
  };

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle="회원가입"
      />
      <View style={style.section}>
        <Text style={style.title}>이름</Text>
        <TextInput
          style={style.input}
          placeholder="이름"
          value={mt_name}
          onChangeText={(text) => setMt_name(text)}
        />
      </View>

      <View style={style.section}>
        <Text style={style.title}>휴대폰 번호</Text>
        <View style={style.wrap}>
          <TextInput
            style={[style.input, {flex: 2, marginRight: 5}]}
            placeholder="휴대폰 번호"
            placeholderTextColor="#A2A2A2"
            value={mt_hp}
            onChangeText={(text) => setMt_hp(text)}
            editable={!hpDisabled}
            keyboardType={'number-pad'}
          />
          {isSend && seconds ? (
            <View
              style={{
                flex: 1,
                borderColor: ColorLowRed,
                borderWidth: 1,
                paddingVertical: 15,
                borderRadius: 5,
              }}>
              <Timer items={seconds} timeFinish={timeFinish.bind(this)} />
            </View>
          ) : (
            <CustomButton
              label={'인증번호 전송'}
              disabled={isSend}
              labelColor={mt_hp_check ? ColorLowRed : ColorRed}
              labelSize={15}
              borderRadius={5}
              borderColor={isSend ? ColorLowRed : ColorRed}
              flex={1}
              onPress={() => _send_confirm_num(mt_hp)}
            />
          )}
        </View>
        <View style={style.wrap}>
          <TextInput
            style={[style.input, {flex: 2, marginRight: 5}]}
            placeholder="인증번호를 입력해주세요."
            placeholderTextColor="#A2A2A2"
            value={mt_confirm_num}
            onChangeText={(text) => setMt_confirm_num(text)}
            keyboardType={'number-pad'}
          />
          <CustomButton
            label={mt_hp_check ? '인증완료' : '확인'}
            labelColor={mt_hp_check ? ColorLowRed : ColorRed}
            labelSize={15}
            borderRadius={5}
            borderColor={mt_hp_check ? ColorLowRed : ColorRed}
            flex={1}
            onPress={() => _check_confirm_num()}
            disabled={mt_hp_check}
          />
        </View>
      </View>
      <View style={style.section}>
        <CustomButton
          label="회원가입"
          labelColor={ColorWhite}
          borderRadius={5}
          backgroundColor={ColorRed}
          onPress={() => _goJoin()}
        />
      </View>
    </SafeAreaView>
  );
}

export default SignUp;
