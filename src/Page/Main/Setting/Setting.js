import React, {useState} from 'react';
import {SafeAreaView, Switch, Text, TouchableOpacity, View} from 'react-native';
import BackButton from '~/Components/BackButton';
import CustomButton from '~/Components/CustomButton';
import CustomModal from '~/Components/CustomModal';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from './SettingStyle';

import {logout} from '~/redux/reducers/loginReducer';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'; //비동기 스토리지
import Api from '~/Api';
import {push_change} from '~/redux/actions/loginAction';

function Setting({navigation, mt_idx, mt_level, mt_push_yn}) {
  const [isLogout, setIsLogout] = useState(false);
  const [onoff1, setOnoff1] = useState(mt_push_yn == 'Y');
  const dispatch = useDispatch();

  const _pushOnoff = () => {
    setOnoff1((prev) => !prev);

    Api.send(
      'proc_push_config',
      {push_type: 'all', mt_idx: mt_idx, push_yn: onoff1 ? 'N' : 'Y'},
      (responseJson) => {
        setOnoff1(responseJson.item.push_yn == 'Y');
        dispatch(push_change(responseJson.item.push_yn));
      },
    );
    // setOnoff1((prev) => !prev);
  };
  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'설정'}
      />
      <View style={{paddingHorizontal: 20}}>
        {mt_level == 2 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#E8E8E8',
              paddingVertical: 15,
            }}
            onPress={() => _pushOnoff()}>
            <Text style={style.title}>푸쉬알림 설정</Text>
            <Switch
              thumbColor={ColorWhite}
              trackColor={{true: ColorRed}}
              value={onoff1}
              onChange={() => _pushOnoff()}
            />
          </View>
        ) : null}
        {mt_level == 2 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Leave')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: '#E8E8E8',
              paddingVertical: 15,
            }}>
            <Text style={style.title}>회원탈퇴</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{padding: 20}}>
        <CustomButton
          label={'로그아웃'}
          labelColor={ColorWhite}
          backgroundColor={ColorRed}
          borderRadius={5}
          onPress={() => setIsLogout(true)}
        />
      </View>
      <CustomModal
        visible={isLogout}
        setVisible={setIsLogout}
        title={'로그아웃'}
        subTitle={'로그아웃 하시겠습니까?'}
        cancelAction={() => setIsLogout(false)}
        confirmAction={async () => {
          logout();
          await AsyncStorage.multiRemove([
            '@mb_id',
            '@mb_key',
            '@mb_fcm',
            '@mb_level',
          ]);

          navigation.reset({
            index: 1,
            routes: [{name: 'Login'}],
          });
        }}
      />
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    mt_idx: state.login.mt_idx,
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    mt_name: state.login.mt_name,
    mt_push_yn: state.login.mt_push_yn,
  };
};
export default connect(mapStateToProps)(Setting);
