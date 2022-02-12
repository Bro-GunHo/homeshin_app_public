import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import BackButton from '~/Components/BackButton';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
// import {style} from '~/Page/Main/ChemistryCheckEnroll/ChemistryCheckEnrollStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';

const defobj = {loc: '', cont: ''};
function ChemistryForm({navigation, route, mt_idx}) {
  const [pr_idx, setPr_idx] = useState(route.params.pr_idx);
  const [idx, setIdx] = useState(
    route.params && route.params.idx ? route.params.idx : '',
  );
  const [data, setData] = useState({});
  const [picker, setPicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [ch_sub, setCh_sub] = useState('');
  const [viewLength, setViewLength] = useState(1);
  const [ch_data_arr, setCh_data_arr] = useState([{...defobj}]);

  console.log('oprps', route);

  React.useEffect(() => {
    if (idx) getData();
  }, [idx]);

  const _clear = () => {
    setCh_sub('');
    setCh_data_arr([{...defobj}]);
  };

  const getData = () => {
    Api.send(
      'proc_chemical_list',
      {pr_idx, is_modal: 1000, idx: idx},
      (responseJson) => {
        if (responseJson.result == 'Y') {
          if (!responseJson.item.length) {
            cusToast('자료를 불러오는데 실패했습니다.');
            navigation.goBack();
            return;
          }

          let data = responseJson.item[0];
          setIdx(data.idx);
          // setData(data);

          setCh_sub(data.ch_sub);

          // let temp_ch_loc_arr = [];
          // let temp_ch_cont_arr = [];
          // let temp_viewLength = 0;
          // data.ch_data_arr.forEach((val, index) => {
          //   temp_ch_loc_arr.push(val.loc);
          //   temp_ch_cont_arr.push(val.cont);
          // });

          setCh_data_arr(data.ch_data_arr);

          // if (!temp_viewLength) temp_viewLength = 1;

          // setCh_loc_arr(temp_ch_loc_arr);
          // setCh_cont_arr(temp_ch_cont_arr);
          // setViewLength(temp_viewLength);
        } else {
          // navigation.navigate.goBack();
        }
      },
    );
  };

  const _submit = () => {
    if (!ch_sub) {
      cusToast('화학물질을 입력해주세요.');
      return false;
    }

    if (!ch_data_arr[0].loc) {
      cusToast('위치를 입력해주세요.');
      return false;
    }

    if (!ch_data_arr[0].cont) {
      cusToast('내용을 입력해주세요.');
      return false;
    }

    let sendObj = {
      mt_idx: mt_idx,
      pr_idx: pr_idx,
      idx,
      ch_sub: ch_sub,
    };

    let nums = 1;
    ch_data_arr.forEach(({loc, cont}) => {
      sendObj['ch_loc' + nums] = loc;
      sendObj['ch_cont' + nums] = cont;
      nums++;
    });

    setIsLoading(true);

    if (idx) {
      Api.send('proc_chemical_edit', sendObj, (responseJson) => {
        if (responseJson.result == 'Y') {
          setIsLoading(false);
          Alert.alert('수정되었습니다.', '', [
            {text: '확인', onPress: () => navigation.goBack()},
          ]);
        }
      });
    } else {
      Api.send('proc_chemical_write', sendObj, (responseJson) => {
        if (responseJson.result == 'Y') {
          setIsLoading(false);
          Alert.alert('등록되었습니다.', '', [
            {text: '확인', onPress: () => navigation.goBack()},
          ]);
        }
      });
    }
  };

  const _addLow = () => {
    // if (ch_data_arr.length == 10) return;

    setCh_data_arr([...ch_data_arr, {...defobj}]);
  };

  const _delLow = () => {
    if (ch_data_arr.length == 1) return;

    let temp = Api.obClone(ch_data_arr);
    temp.splice(temp.length - 1, 1);
    setCh_data_arr(temp);
  };

  const _data_chg = (key, index, value) => {
    let temp = Api.obClone(ch_data_arr);
    temp[index][key] = value;
    setCh_data_arr(temp);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorWhite}}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle="화학물질 검출 목록"
      />

      <Loaders views={isLoading} />

      <ScrollView
        style={{flex: 1, paddingHorizontal: 20}}
        nestedScrollEnabled={true}>
        <View style={style.section}>
          <Text style={style.title}>화학물질</Text>
          <View style={style.inputBox}>
            <TextInput
              style={style.input}
              placeholder="ex) 폼알데하이드(HCHO)"
              value={ch_sub}
              onChangeText={(text) => setCh_sub(text)}
            />
          </View>
        </View>
        <View style={style.section}>
          <Text style={style.title}>공간 및 내용</Text>

          {ch_data_arr.map((item, index) => {
            return (
              <View key={'ch_data_arr_' + index.toString()}>
                <View style={style.inputBox}>
                  <TextInput
                    style={style.input}
                    placeholder="공간 입력 ex) 거실"
                    value={item.loc}
                    onChangeText={(text) => _data_chg('loc', index, text)}
                  />
                </View>
                <View style={style.section}>
                  <View style={[style.inputBox, {marginBottom: 7}]}>
                    <TextInput
                      style={[
                        style.input,
                        // {textAlignVertical: 'top', minHeight: 60},
                      ]}
                      // multiline
                      placeholder="내용 입력"
                      value={item.cont}
                      onChangeText={(text) => _data_chg('cont', index, text)}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        {/* <View></View> */}

        <View style={{paddingVertical: 20}}>
          <CustomButton
            label={'공간 및 내용 추가'}
            labelColor={ColorBlack}
            borderColor={'#E3E3E3'}
            borderRadius={5}
            onPress={() => _addLow()}
          />
          <View style={{marginVertical: 3}}>
            <CustomButton
              label="공간 및 내용 삭제"
              labelColor={ColorBlack}
              backgroundColor={ColorWhite}
              borderColor={'#E3E3E3'}
              borderRadius={5}
              onPress={() => _delLow()}
            />
          </View>
          <View style={{marginVertical: 3}}>
            <CustomButton
              label="저장하기"
              labelColor={ColorWhite}
              backgroundColor={ColorRed}
              borderColor={'#E3E3E3'}
              borderRadius={5}
              disabled={isLoading}
              onPress={() => _submit()}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  section: {
    paddingVertical: 10,
  },
  title: {
    fontFamily: FontPretendardBold,
    fontSize: 15,
    marginBottom: 10,
  },
  subTitle: {
    fontFamily: FontPretendardRegular,
    fontSize: 15,
    color: '#A2A2A2',
  },
  inputBox: {
    borderColor: '#E3E3E3',
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
  },
  input: {
    fontSize: 16,
    // lineHeight: 22,
    paddingVertical: 0,
    fontFamily: FontPretendardRegular,
    // backgroundColor: 'red',
  },
});

const mapStateToProps = (state) => {
  return {
    mt_idx: state.login.mt_idx,
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    mt_name: state.login.mt_name,
  };
};
export default connect(mapStateToProps)(ChemistryForm);
