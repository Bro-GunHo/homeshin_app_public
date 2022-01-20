import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
import {
  FontPretendardBold,
  FontPretendardLight,
  FontPretendardRegular,
} from '~/style/Font';
import CustomButton from './CustomButton';
import {style} from '~/Page/Main/InspectionApply/InspectionApplyStyle';
import Api from '~/Api';
import cusToast from './CusToast';

function CustomModal({
  visible,
  setVisible,
  title,
  subTitle,
  cancelAction,
  confirmAction,
  closeAction,
}) {
  const [tb_name, setTb_name] = useState('');
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const _search = () => {
    Keyboard.dismiss();
    if (!tb_name) {
      Alert.alert('아파트 이름을 입력해주세요.');
      return false;
    }

    Api.send(
      'proc_building_list',
      {tb_name, is_modal: 1000},
      (responseJson) => {
        if (responseJson.result == 'Y') {
          setData(responseJson.item);
          setIsLoaded(true);
        } else {
          Alert.alert(responseJson.msg);
        }
      },
    );
  };

  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      onRequestClose={() => closeAction()}
      animationType="fade"
      transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}>
        <View
          style={{
            backgroundColor: ColorWhite,
            width: '100%',
            borderRadius: 5,
            padding: 30,
          }}>
          <View style={{paddingVertical: 30}}>
            <Text
              style={{
                color: ColorRed,
                fontFamily: FontPretendardBold,
                fontSize: 24,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              {title}
            </Text>
            <Text
              style={{
                color: ColorBlack,
                fontFamily: FontPretendardLight,
                fontSize: 18,
                textAlign: 'center',
              }}>
              {subTitle}
            </Text>
          </View>
          <View style={style.section}>
            <View style={style.wrapper}>
              <View style={[style.inputBox, {marginRight: 7}]}>
                <TextInput
                  placeholder="아파트명 입력"
                  placeholderTextColor="#A2A2A2"
                  style={style.input}
                  value={tb_name}
                  onChangeText={(text) => setTb_name(text)}
                />
              </View>
              <CustomButton
                label={'검색'}
                labelColor={ColorRed}
                labelSize={15}
                borderColor={ColorRed}
                backgroundColor={ColorWhite}
                borderRadius={5}
                flex={0.4}
                onPress={() => _search()}
              />
            </View>

            {isLoaded ? (
              <FlatList
                style={{height: 200}}
                scrollEnabled={true}
                data={data}
                bounces={false}
                ListEmptyComponent={
                  <Text style={style.error}>
                    검색하신 아파트 정보가 없습니다.
                  </Text>
                }
                renderItem={({index, item}) => {
                  console.log('item', item);
                  return (
                    <TouchableOpacity
                      style={{
                        borderColor: '#E2E2E2',
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        padding: 10,
                      }}
                      onPress={() =>
                        confirmAction(item.idx, item.tb_name, item.tb_addr)
                      }>
                      <View>
                        <Text style={style.listTitle}>{item.tb_name}</Text>
                        <Text style={style.listSubTitle}>{item.tb_addr}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            ) : null}
          </View>
          <View>
            <View style={{marginVertical: 3}}>
              <CustomButton
                label="직접입력"
                labelColor={ColorWhite}
                backgroundColor={ColorRed}
                onPress={cancelAction}
                // flex={1}
                borderRadius={5}
              />
            </View>
            <View style={{marginVertical: 3}}>
              <CustomButton
                label="닫기"
                labelColor={ColorBlack}
                borderColor={'#E3E3E3'}
                onPress={closeAction}
                // flex={1}
                borderRadius={5}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModal;
