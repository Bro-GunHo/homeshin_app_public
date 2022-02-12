import React, {useState} from 'react';
import {SafeAreaView, Text, View, ScrollView, Alert} from 'react-native';
import BackButton from '~/Components/BackButton';
import CheckSelector from '~/Components/CheckSelector';
import CustomModal from '~/Components/CustomModal';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
import {style} from './LeaveStyle';

import cusToast from '~/Components/CusToast';
import {logout} from '~/redux/reducers/loginReducer';
import {connect, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage'; //비동기 스토리지
import Api from '~/Api';

function Leave(props) {
  const {navigation, mt_idx, mt_id, mt_level} = props;
  const [agree, setAgree] = useState(false);
  const [data1, setData1] = useState(' ');
  const [isLogout, setIsLogout] = useState(false);

  console.log('props', props);

  const _submit = () => {
    if (mt_level != '2') {
      cusToast('일반 회원만 탈퇴할 수 있습니다.');
      return false;
    }

    if (!mt_idx) {
      cusToast('로그인 정보가 없습니다.');
      return;
    }

    if (!agree) {
      cusToast('탈퇴처리방침에 동의하시면 탈퇴를 할수 있습니다.');
      return;
    }

    setIsLogout(true);
  };

  const getData = () => {
    Api.send('proc_list_content', {co_id: 3}, (responseJson) => {
      if (responseJson.result === 'Y') {
        if (responseJson.item.co_content)
          //responseJson.response.info = strip_tags(responseJson.response.info);
          setData1(responseJson.item.co_content);
      }
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle="회원탈퇴"
      />
      <View style={{flex: 1, padding: 20}}>
        <Text style={style.label}>회원탈퇴 처리방침</Text>
        <ScrollView
          style={{
            flex: 1,
            backgroundColor: '#F5F5F5',
            borderRadius: 10,
            marginBottom: 20,
          }}>
          <Text style={style.textarea}>{data1}</Text>
        </ScrollView>
        <View style={{flex: 0.3}}>
          <CheckSelector
            label={'회원탈퇴 처리방침에 동의합니다.'}
            status={agree}
            onPress={() => setAgree((prev) => !prev)}
          />
        </View>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <View style={{marginBottom: 6}}>
          <CustomButton
            label={'취소'}
            labelColor={ColorBlack}
            backgroundColor={ColorWhite}
            borderColor={'#E3E3E3'}
            borderRadius={5}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View>
          <CustomButton
            label={'탈퇴하기'}
            labelColor={ColorWhite}
            backgroundColor={ColorRed}
            borderRadius={5}
            onPress={() => _submit()}
          />
        </View>
      </View>
      <CustomModal
        visible={isLogout}
        setVisible={setIsLogout}
        title={'회원탈퇴'}
        subTitle={'정말 탈퇴하시겠습니까?'}
        cancelAction={() => setIsLogout(false)}
        confirmAction={() => {
          Api.send('proc_out_member', {mt_idx: mt_idx}, (responseJson) => {
            if (responseJson.result == 'Y') {
              Alert.alert('회원 탈퇴되었습니다.', '이용해 주셔서 감사합니다.', [
                {text: '확인'},
              ]);

              setTimeout(async () => {
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
              }, 1000);
            }
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
  };
};
export default connect(mapStateToProps)(Leave);
