import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackButton from '~/Components/BackButton';
import CustomButton from '~/Components/CustomButton';
import DatePickerModal from '~/Components/DatePickerModal';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorRed, ColorWhite} from '~/style/Color';
import {FontPretendardBold} from '~/style/Font';
import {style} from './InspectionApplyStyle';
import CustomModalApt from '~/Components/CustomModalApt';
import ModalSelector from 'react-native-modal-selector';
import cusToast from '~/Components/CusToast';

var arr = [];
for (var i = 6; i < 24; i++) {
  var arr_str = i + ':00';
  if (i < 10) {
    arr_str = '0' + i + ':00';
  }
  arr.push({key: i, label: arr_str, value: arr_str});
}
const minute_option = arr;

function InspectionApply({navigation}) {
  const [picker, setPicker] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  //serach or direct
  const [aptInputMode, setAptInputMode] = useState('search');
  const [sendData, setSendData] = useState({
    tb_idx: '',
    tb_addr: '',
    mt_house_name: '',
    mt_house_dong: '',
    mt_house_ho: '',
    mt_house_size: '',
    mt_house_size2: '',
    check_day: '',
    check_time: '',
  });

  const setParams = (key, value) => {
    console.log(sendData, key, value);
    setSendData({...sendData, [key]: value});
  };

  const directMode = () => {
    setAptInputMode('direct');
    setModalOpen(false);
  };
  const aptSelect = (tb_idx, mt_house_name, tb_addr) => {
    setAptInputMode('search');
    setSendData({...sendData, tb_idx, mt_house_name, tb_addr});
    setModalOpen(false);
  };
  const closeAction = () => {
    setModalOpen(false);
  };

  const searchMode = () => {};

  const setCheck_dy = (v) => {
    console.log('setCheck_dy, check_day', v);
    setParams('check_day', v);
  };

  const moveNext = () => {
    if (!sendData.mt_house_name) {
      cusToast('아파트 이름을 입력해주세요.');
      return false;
    }

    if (!sendData.tb_idx) {
      if (!sendData.tb_addr) {
        cusToast('아파트 주소를 입력해주세요.');
        return false;
      }
    }

    if (!sendData.mt_house_dong) {
      cusToast('동을 입력해주세요.');
      return false;
    }
    if (!sendData.mt_house_ho) {
      cusToast('호수를 입력해주세요.');
      return false;
    }
    if (!sendData.check_day) {
      cusToast('날짜를 입력해주세요.');
      return false;
    }
    if (!sendData.check_time) {
      cusToast('시간을 입력해주세요.');
      return false;
    }

    navigation.navigate('InspectionApply2', {sendData});
  };

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={[style.container]}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'점검신청하기'}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'android' ? 45 : 0}>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={{padding: 20}}
          bounces={false}>
          <View style={style.section}>
            <Text style={[style.title, {fontSize: 24}]}>
              <Text style={{color: ColorRed}}>점검 기간</Text> 선택
            </Text>
          </View>
          <View style={style.section}>
            <Text style={style.title}>아파트명</Text>
            <View style={style.wrapper}>
              <View style={[style.inputBox, {marginRight: 10}]}>
                <TouchableOpacity
                  onPress={() => {
                    if (aptInputMode != 'direct') setModalOpen(true);
                  }}
                  style={{flex: 1}}>
                  <TextInput
                    placeholder="아파트명 입력"
                    placeholderTextColor="#A2A2A2"
                    style={style.input}
                    value={sendData.mt_house_name}
                    editable={aptInputMode == 'direct'}
                    onChangeText={(text) => setParams('mt_house_name', text)}
                    pointerEvents={
                      aptInputMode == 'direct' ? 'box-only' : 'none'
                    }
                  />
                </TouchableOpacity>
              </View>
              <CustomButton
                label={'검색'}
                labelColor={ColorRed}
                labelSize={15}
                borderColor={ColorRed}
                backgroundColor={ColorWhite}
                borderRadius={5}
                flex={0.3}
                onPress={() => setModalOpen(true)}
              />
            </View>
          </View>
          <View style={style.section}>
            <Text style={style.title}>아파트 주소</Text>
            <View style={style.wrapper}>
              <TouchableOpacity
                onPress={() => {
                  console.log('aptInputMode', aptInputMode);
                  if (aptInputMode != 'direct') setModalOpen(true);
                }}
                style={{flex: 1}}>
                <View
                  style={[
                    style.inputBox,
                    {height: 'auto', paddingVertical: 5},
                  ]}>
                  <TextInput
                    placeholder="아파트 주소 입력"
                    placeholderTextColor="#A2A2A2"
                    style={[
                      style.input,
                      {
                        justifyContent: 'flex-start',
                        // backgroundColor: 'red',
                        // paddingVertical: 0,
                        height: 65,
                      },
                    ]}
                    value={sendData.tb_addr}
                    editable={aptInputMode == 'direct'}
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical={'top'}
                    onChangeText={(text) => setParams('tb_addr', text)}
                    pointerEvents={
                      aptInputMode == 'direct' ? 'box-only' : 'none'
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[style.section, {flexDirection: 'row'}]}>
            <View style={{flex: 1}}>
              <Text style={style.title}>동</Text>
              <View style={style.wrapper}>
                <View style={[style.inputBox, {marginRight: 10}]}>
                  <TextInput
                    placeholder="동 입력"
                    placeholderTextColor="#A2A2A2"
                    style={style.input}
                    value={sendData.mt_house_dong}
                    keyboardType="number-pad"
                    onChangeText={(text) => setParams('mt_house_dong', text)}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 1}}>
              <Text style={style.title}>호수</Text>
              <View style={style.wrapper}>
                <View style={style.inputBox}>
                  <TextInput
                    placeholder="호수 입력"
                    placeholderTextColor="#A2A2A2"
                    style={style.input}
                    value={sendData.mt_house_ho}
                    keyboardType="number-pad"
                    onChangeText={(text) => setParams('mt_house_ho', text)}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={style.section}>
            <Text style={style.title}>공급면적(선택)</Text>
            <View style={[style.wrapper, {alignItems: 'flex-end'}]}>
              <View style={[style.inputBox, {marginRight: 10}]}>
                <TextInput
                  placeholder="모르실 경우 입력하지 않아도 됩니다."
                  placeholderTextColor="#A2A2A2"
                  style={style.input}
                  value={sendData.mt_house_size}
                  maxLength={10}
                  keyboardType="number-pad"
                  onChangeText={(text) => setParams('mt_house_size', text)}
                />
              </View>
              <Text style={{fontFamily: FontPretendardBold, fontSize: 15}}>
                m2
              </Text>
            </View>
          </View>
          <View style={style.section}>
            <Text style={style.title}>전용면적(선택)</Text>
            <View style={[style.wrapper, {alignItems: 'flex-end'}]}>
              <View style={[style.inputBox, {marginRight: 10}]}>
                <TextInput
                  placeholder="모르실 경우 입력하지 않아도 됩니다."
                  placeholderTextColor="#A2A2A2"
                  style={style.input}
                  maxLength={10}
                  value={sendData.mt_house_size2}
                  keyboardType="number-pad"
                  onChangeText={(text) => setParams('mt_house_size2', text)}
                />
              </View>
              <Text style={{fontFamily: FontPretendardBold, fontSize: 15}}>
                m2
              </Text>
            </View>
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
            <View style={[style.wrapper, {alignItems: 'flex-end'}]}>
              <ModalSelector
                data={minute_option}
                initValue="시간 선택"
                accessible={true}
                backdropPressToClose={true}
                cancelText={'취소'}
                cancelButtonAccessibilityLabel={'취소'}
                style={{flex: 1, position: 'relative'}}
                onChange={(option) => {
                  setParams('check_time', option.label);
                }}>
                <View
                  style={[style.inputBox, {justifyContent: 'space-between'}]}>
                  <TextInput
                    placeholder="시간 선택"
                    placeholderTextColor="#A2A2A2"
                    style={style.input}
                    editable={false}
                    value={sendData.check_time}
                    pointerEvents={'none'}
                  />
                  <Icon name="clock-time-three-outline" size={20} />
                </View>
              </ModalSelector>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <CustomButton
              label={'다음'}
              labelColor={ColorWhite}
              backgroundColor={ColorRed}
              borderRadius={5}
              onPress={() => moveNext()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CustomModalApt
        visible={modalOpen}
        setVisible={setModalOpen}
        title={'아파트 검색'}
        subTitle={'아파트명을 입력해 주세요'}
        cancelAction={() => directMode()}
        confirmAction={aptSelect}
        closeAction={() => closeAction()}
      />

      <DatePickerModal
        visible={picker}
        setVisible={setPicker}
        setValue={setCheck_dy}
        type={'inspection'}
      />
    </SafeAreaView>
  );
}

export default InspectionApply;
