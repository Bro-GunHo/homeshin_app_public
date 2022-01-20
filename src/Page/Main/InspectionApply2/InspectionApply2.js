import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import BackButton from '~/Components/BackButton';
import CheckSelector from '~/Components/CheckSelector';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorLowRed, ColorRed, ColorWhite} from '~/style/Color';
import {style} from './InspectionApply2Style';
import {connect, useDispatch} from 'react-redux';
import Api from '~/Api';
import cusToast from '~/Components/CusToast';

function InspectionApply2({navigation, route, mt_idx, mt_name}) {
  const [inspectType, setInspectType] = useState(1);

  const [sendData, setSendData] = useState({
    tb_idx: '',
    tb_addr: '',
    mt_house_name: '',
    mt_house_dong: '',
    mt_house_ho: '',
    mt_house_size: '',
    mt_house_size2: '',
    check_day: '',
    // check_time: '',
    check_time_hour: '',
    check_time_min: '',
  });

  useEffect(() => {
    if (route.params.sendData) {
      setSendData(route.params.sendData);
    }
  }, [route.params.sendData]);

  const _submit = () => {
    let new_pr_option = '';
    if (inspectType == 1) new_pr_option = 'A';
    else if (inspectType == 2) new_pr_option = 'B';
    else if (inspectType == 3) new_pr_option = 'AB';

    let sendObj = {
      mt_idx: mt_idx,
      pr_option: new_pr_option,
      tb_idx: sendData.tb_idx,
      tb_addr: sendData.tb_addr,
      mt_house_name: sendData.mt_house_name,
      mt_house_dong:
        sendData.mt_house_dong + '동 ' + sendData.mt_house_ho + '호',
      mt_house_size: sendData.mt_house_size,
      mt_house_size2: sendData.mt_house_size2,
      check_dt:
        sendData.check_day +
        ' ' +
        sendData.check_time_hour +
        ':' +
        sendData.check_time_min,
    };

    Api.send('proc_project_write', sendObj, (responseJson) => {
      if (responseJson.result == 'Y') {
        navigation.replace('InspectionComplete');
      }
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'점검신청하기'}
      />
      <View style={{flex: 1, padding: 20}}>
        <View style={style.section}>
          <Text style={[style.title, {fontSize: 24}]}>
            <Text style={{color: ColorRed}}>점검</Text> 선택
          </Text>
        </View>
        <View style={style.section}>
          <Text style={[style.title]}>점검 선택</Text>
          <View style={{marginVertical: 5}}>
            <CheckSelector
              label={'육안 점검'}
              status={inspectType === 1}
              onPress={() => setInspectType(1)}
            />
            <Text style={style.subLabel}>
              전문가가 눈으로 확인할 수 있는 하자 점검
            </Text>
          </View>
          <View style={{marginVertical: 5}}>
            <CheckSelector
              label={'장비 점검'}
              status={inspectType === 2}
              onPress={() => setInspectType(2)}
            />
            <Text style={style.subLabel}>
              눈에 보이지 않는 하자를 장비를 이용해 점검
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 5,
            }}>
            <CheckSelector
              label={'정밀 점검 패키지'}
              status={inspectType === 3}
              onPress={() => setInspectType(3)}
            />
            <View
              style={{
                marginLeft: 5,
                backgroundColor: ColorLowRed,
                padding: 3,
                borderRadius: 5,
              }}>
              <Text style={{color: ColorRed}}>추천</Text>
            </View>
          </View>
          <Text style={style.subLabel}>육안 + 장비 점검, 정밀한 하자 점검</Text>
        </View>
        <View style={style.section}>
          <Text style={style.title}>점검 정보</Text>
          <Text
            style={
              style.subTitle
            }>{`${sendData.mt_house_name} ${sendData.mt_house_dong}동 ${sendData.mt_house_ho}호 ${mt_name}`}</Text>
          <Text style={style.subTitle}>
            공급면적{' '}
            {sendData.mt_house_size ? sendData.mt_house_size + '㎡' : ''}
          </Text>
          <Text style={style.subTitle}>
            전용면적{' '}
            {sendData.mt_house_size2 ? sendData.mt_house_size2 + '㎡' : ''}
          </Text>
          <Text style={style.subTitle}>
            점검일시 : {sendData.check_day} {sendData.check_time_hour}:
            {sendData.check_time_min}
          </Text>
          <Text style={style.subTitle}>
            {inspectType === 1
              ? '육안점검'
              : inspectType === 2
              ? '장비 점검'
              : '정밀 점검 패키지'}
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <CustomButton
            label={'신청하기'}
            labelColor={ColorWhite}
            backgroundColor={ColorRed}
            borderRadius={5}
            onPress={() => _submit()}
          />
        </View>
      </View>
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
export default connect(mapStateToProps)(InspectionApply2);
