import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import BackButton from '~/Components/BackButton';
import CheckSelector from '~/Components/CheckSelector';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorLowRed, ColorRed, ColorWhite} from '~/style/Color';
import {style} from './InspectionEditStyle';
import {connect, useDispatch} from 'react-redux';
import Api from '~/Api';
import cusToast from '~/Components/CusToast';
import ModalSelector from 'react-native-modal-selector';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePickerModal from '~/Components/DatePickerModal';

var arr = [];
for (var i = 9; i < 18; i++) {
  var arr_str = i.toString();
  if (i < 10) {
    arr_str = '0' + i;
  }
  arr.push({key: i, label: arr_str, value: arr_str});
}
const hour_option = arr;

let arr2 = [
  {key: '0_min', label: '00', value: '00'},
  {key: '1_min', label: '30', value: '30'},
];
const minute_option = arr2;

function InspectionEdit({navigation, route, mt_idx, mt_name}) {
  const [inspectType, setInspectType] = useState(1);
  const [picker, setPicker] = useState(false);

  const [pr_idx, setPr_idx] = useState(route.params.pr_idx);
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

  const setCheck_dy = (v) => {
    setParams('check_day', v);
  };

  const setParams = (key, value) => {
    setSendData({...sendData, [key]: value});
  };

  useEffect(() => {
    if (route.params.pr_idx) {
      getData();
    }
  }, [route.params.pr_idx]);

  const getData = () => {
    Api.send('proc_project_view', {pr_idx}, (responseJson) => {
      if (responseJson.result == 'Y') {
        if (!responseJson.item.project_data.length) {
          cusToast('점검표를 불러오는데 실패했습니다.');
          navigation.goBack();
          return;
        }

        let item = responseJson.item.project_data[0];
        let newOption =
          item.pr_option == 'A' ? 1 : item.pr_option == 'B' ? 2 : 3;

        if (item.pr_status != 'A') {
          cusToast('상태가 변경되었습니다. 접수 상태에서만 수정할수 있습니다.');
          navigation.goBack();
          return;
        }

        item.check_day = item.check_dt_day;
        let temp_arr = item.check_dt_hour.split(':');
        item.check_time_hour = temp_arr[0];
        item.check_time_min = temp_arr[1];
        setSendData(item);
        setInspectType(newOption);
        // console.log('@@', responseJson.item.project_data[0]);
      } else {
        navigation.navigate.goBack();
      }
    });
  };

  const _submit = () => {
    let new_pr_option = '';
    if (inspectType == 1) new_pr_option = 'A';
    else if (inspectType == 2) new_pr_option = 'B';
    else if (inspectType == 3) new_pr_option = 'AB';

    if (!sendData.check_day) {
      cusToast('점검날짜를 선택해주세요.');
      return false;
    }

    if (!sendData.check_time_hour) {
      cusToast('작업시간을 입력해주세요.');
      return false;
    }
    if (!sendData.check_time_min) {
      cusToast('작업시간 분을 입력해주세요.');
      return false;
    }

    let sendObj = {
      mt_idx: mt_idx,
      pr_idx: pr_idx,
      pr_option: new_pr_option,
      check_dt:
        sendData.check_day +
        ' ' +
        sendData.check_time_hour +
        ':' +
        sendData.check_time_min,
    };

    Api.send('proc_project_edit', sendObj, (responseJson) => {
      if (responseJson.result == 'Y') {
        Alert.alert('수정되었습니다.', '', [
          {text: '확인', onPress: () => navigation.goBack()},
        ]);
      }
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'점검수정하기'}
      />
      <ScrollView>
        <View style={{flex: 1, padding: 20}}>
          <View style={style.section}>
            <Text style={[style.title, {fontSize: 24}]}>
              <Text style={{color: ColorRed}}>점검</Text> 수정
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
            <Text style={style.subLabel}>
              육안 + 장비 점검, 정밀한 하자 점검
            </Text>
          </View>
          <View style={style.section}>
            <Text style={style.title}>작업희망날짜</Text>
            <TouchableOpacity
              style={[style.wrapper, {alignItems: 'flex-end'}]}
              onPress={() => setPicker(true)}>
              <View style={[style.inputBox, {justifyContent: 'space-between'}]}>
                <TextInput
                  placeholder="날짜 선택"
                  placeholderTextColor="#A2A2A2"
                  style={style.input}
                  editable={false}
                  value={sendData.check_day}
                  pointerEvents={'none'}
                />
                <Icon name="calendar-check" size={20} />
              </View>
            </TouchableOpacity>
          </View>

          <View style={style.section}>
            <Text style={style.title}>작업시간</Text>
            <View
              style={[
                style.wrapper,
                {alignItems: 'center', justifyContent: 'space-between'},
              ]}>
              <ModalSelector
                data={hour_option}
                initValue="시간 선택"
                accessible={true}
                backdropPressToClose={true}
                cancelText={'취소'}
                cancelButtonAccessibilityLabel={'취소'}
                style={{flex: 1, position: 'relative'}}
                onChange={(option) => {
                  // console.log('option', option);
                  setParams('check_time_hour', option.label);
                }}>
                <View
                  style={[style.inputBox, {justifyContent: 'space-between'}]}>
                  <TextInput
                    placeholder="시간 선택"
                    placeholderTextColor="#A2A2A2"
                    style={[style.input, {flex: 1, textAlign: 'center'}]}
                    editable={false}
                    value={sendData.check_time_hour}
                    pointerEvents={'none'}
                  />
                  {/* <Icon name="clock-time-three-outline" size={20} /> */}
                </View>
              </ModalSelector>
              <Text style={{width: 15, textAlign: 'center'}}>:</Text>
              <ModalSelector
                data={minute_option}
                initValue="시간 선택"
                accessible={true}
                backdropPressToClose={true}
                cancelText={'취소'}
                cancelButtonAccessibilityLabel={'취소'}
                style={{flex: 1, position: 'relative'}}
                onChange={(option) => {
                  setParams('check_time_min', option.label);
                }}>
                <View
                  style={[style.inputBox, {justifyContent: 'space-between'}]}>
                  <TextInput
                    placeholder="분 선택"
                    placeholderTextColor="#A2A2A2"
                    style={[style.input, {flex: 1, textAlign: 'center'}]}
                    editable={false}
                    value={sendData.check_time_min}
                    pointerEvents={'none'}
                  />
                  {/* <Icon name="clock-time-three-outline" size={20} /> */}
                </View>
              </ModalSelector>
            </View>
          </View>

          <View style={style.section}>
            <Text style={style.title}>점검 정보</Text>
            <Text
              style={
                style.subTitle
              }>{`${sendData.mt_house_name} ${sendData.mt_house_dong} ${mt_name}`}</Text>
            <Text style={style.subTitle}>
              공급면적 {sendData.mt_house_size_str}
            </Text>
            <Text style={style.subTitle}>
              전용면적 {sendData.mt_house_size2_str2}
            </Text>
            {/* <Text style={style.subTitle}>
              점검일시 : {sendData.check_dt_str}
            </Text> */}
          </View>

          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <CustomButton
              label={'수정하기'}
              labelColor={ColorWhite}
              backgroundColor={ColorRed}
              borderRadius={5}
              onPress={() => _submit()}
            />
          </View>
        </View>
      </ScrollView>
      <DatePickerModal
        visible={picker}
        setVisible={setPicker}
        value={sendData.check_day}
        setValue={setCheck_dy}
        type={'inspection'}
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
export default connect(mapStateToProps)(InspectionEdit);
