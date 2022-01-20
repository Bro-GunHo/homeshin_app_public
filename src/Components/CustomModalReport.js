import React, {useState, useEffect} from 'react';
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
import CheckSelector from '~/Components/CheckSelector';

function CustomModalReport({
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
  const [inspectType, setInspectType] = useState('A');

  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    if (Api.state.baseCode && Api.state.baseCode.REPT) {
      for (const iterator of Api.state.baseCode.REPT) {
        setCheckList(Api.state.baseCode.REPT);
      }
    }
  }, []);

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
          <View style={{paddingVertical: 20}}>
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
            <View style={{marginVertical: 5}}>
              <FlatList
                data={checkList}
                renderItem={({item, index}) => {
                  return (
                    <View style={{marginVertical: 5}}>
                      <CheckSelector
                        label={item.cd_nm}
                        status={inspectType === item.cd_c}
                        onPress={() => setInspectType(item.cd_c)}
                      />
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View>
            <View style={{marginVertical: 3}}>
              <CustomButton
                label="신고하기"
                labelColor={ColorWhite}
                backgroundColor={ColorRed}
                onPress={() => cancelAction(inspectType)}
                // flex={1}
                borderRadius={5}
              />
            </View>
            <View style={{marginVertical: 3}}>
              <CustomButton
                label="취소"
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

export default CustomModalReport;
