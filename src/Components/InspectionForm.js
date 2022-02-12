import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';
import ImageCard from './ImageCard';
import BackButton from '~/Components/BackButton';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';
import moment from 'moment';
import DatePickerModal from '~/Components/DatePickerModal';
import FilePick from '~/shared/FilePick';
function InspectionForm({navigation, route, mt_idx}) {
  const [pr_idx, setPr_idx] = useState(
    route.params && route.params.pr_idx ? route.params.pr_idx : '',
  );
  const [idx, setIdx] = useState(
    route.params && route.params.idx ? route.params.idx : '',
  );
  const [data, setData] = useState({});
  const [picker, setPicker] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [ck_space, setCk_space] = useState('');
  const [ck_location, setCk_location] = useState('');
  const [ck_memo, setCk_memo] = useState('');
  const [ck_date, setCk_date] = useState(moment().format('YYYY-MM-DD'));
  const [ck_img1, setCk_img1] = useState([]);
  const [ck_img2, setCk_img2] = useState([]);
  const [ck_img1_delete, setCk_img1_delete] = useState('');
  const [ck_img2_delete, setCk_img2_delete] = useState('');

  React.useEffect(() => {
    if (idx) {
      getData();
    }
  }, [idx]);

  const clearWriteMode = () => {
    setCk_img1([]);
    setCk_img2([]);
  };
  const _claer = () => {
    setCk_space('');
    setCk_location('');
    setCk_memo('');

    setCk_img1([]);
    setCk_img2([]);
  };

  const getData = () => {
    Api.send('proc_checklist_list', {pr_idx, idx: idx}, (responseJson) => {
      if (responseJson.result == 'Y') {
        if (!responseJson.item.length) {
          cusToast('자료를 불러오는데 실패했습니다.');
          navigation.goBack();
          return;
        }

        let data = responseJson.item[0];

        setData(data);

        setCk_space(data.ck_space);
        setCk_location(data.ck_location);
        setCk_memo(data.ck_memo);
        setCk_date(data.ck_date);

        if (data.ck_img1_big) setCk_img1([{uri: data.ck_img1_big, id: 0}]);

        if (data.ck_img2_big) setCk_img2([{uri: data.ck_img2_big, id: 0}]);

        setCk_img1_delete('');
        setCk_img2_delete('');
      } else {
        navigation.navigate.goBack();
      }
    });
  };

  const _submit = () => {
    if (!ck_space) {
      cusToast('공간을 입력해주세요.');
      return false;
    }
    if (!ck_location) {
      cusToast('위치를 입력해주세요.');
      return false;
    }
    if (!ck_memo) {
      cusToast('하자를 입력해주세요.');
      return false;
    }

    if (!ck_img1.length) {
      cusToast('원거리 사진을 입력해주세요.');
      return false;
    }
    if (!ck_img2.length) {
      cusToast('근거리 사진을 입력해주세요.');
      return false;
    }

    if (!ck_date) {
      cusToast('점검날짜를 선택해주세요.');
      return false;
    }

    setIsLoading(true);

    let sendObj = {
      mt_idx: mt_idx,
      pr_idx: pr_idx,
      idx,
      ck_date,
      ck_location,
      ck_memo,
      ck_space,
      ck_img1_delete,
      ck_img2_delete,
    };

    let upload_file_arr = []; //업로드할 파일
    ck_img1.forEach((item, index) => {
      //업로드할 파일만 구분함
      if (item.uri.indexOf('http') === -1) {
        // upload_file_arr.push(item);
        upload_file_arr.push(item);
      }
    });

    let upload_file2_arr = []; //업로드할 파일
    ck_img2.forEach((item, index) => {
      //업로드할 파일만 구분함
      if (item.uri.indexOf('http') === -1) {
        // upload_file_arr.push(item);
        upload_file2_arr.push(item);
      }
    });

    let fileObj = {ck_img1: upload_file_arr[0], ck_img2: upload_file2_arr[0]};

    if (idx) {
      Api.send(
        'proc_checklist_edit',
        sendObj,
        (responseJson) => {
          setIsLoading(false);
          if (responseJson.result == 'Y') {
            Alert.alert('수정되었습니다.', '', [
              {text: '확인', onPress: () => navigation.goBack()},
            ]);
          }
        },
        fileObj,
      );
    } else {
      Api.send(
        'proc_checklist_write',
        sendObj,
        (responseJson) => {
          setIsLoading(false);
          if (responseJson.result == 'Y') {
            Alert.alert('등록되었습니다.', '', [
              {text: '확인', onPress: () => navigation.goBack()},
            ]);
          }
        },
        fileObj,
      );
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorWhite}}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle="사안별 하자 목록"
      />

      <Loaders views={isLoading} />

      <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
        <View style={style.section}>
          <Text style={style.title}>공간</Text>
          <View style={style.inputBox}>
            <TextInput
              style={style.input}
              placeholder="공간 입력"
              value={ck_space}
              onChangeText={(text) => setCk_space(text)}
            />
          </View>
        </View>
        <View style={style.section}>
          <Text style={style.title}>위치</Text>
          <View style={style.inputBox}>
            <TextInput
              style={style.input}
              placeholder="위치 입력"
              value={ck_location}
              onChangeText={(text) => setCk_location(text)}
            />
          </View>
        </View>
        <View style={style.section}>
          <Text style={style.title}>하자</Text>
          <View style={style.inputBox}>
            <TextInput
              style={[style.input, {textAlignVertical: 'top', minHeight: 55}]}
              placeholder="하자 입력"
              multiline
              value={ck_memo}
              onChangeText={(text) => setCk_memo(text)}
            />
          </View>
        </View>
        <View style={style.section}>
          <Text style={style.title}>점검일자</Text>
          <TouchableOpacity
            style={[
              style.inputBox,
              {flexDirection: 'row', alignItems: 'center'},
            ]}
            onPress={() => setPicker(true)}>
            <TextInput
              style={[style.input, {flex: 1}]}
              placeholder="날짜선택"
              editable={false}
              value={ck_date}
              pointerEvents={'none'}
            />
            <Icon name="calendar-check" size={20} />
          </TouchableOpacity>
        </View>
        {/* <View style={style.section}>
          <Text style={style.title}>
            사진 (원거리) <Text style={style.subTitle}>최대 1개</Text>
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={[style.image, {backgroundColor: '#F5F5F5'}]}>
              <Icon name="plus" color={'#999999'} size={32} />
            </TouchableOpacity>

            <ImageCard />
          </View>
        </View> */}

        <View style={style.section}>
          <Text style={style.title}>
            사진 (원거리)
            {/* <Text style={style.subTitle}>최대 1개</Text> */}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {ck_img1.length < 1 ? (
              <FilePick
                key={ck_img1.length}
                index={ck_img1.length}
                file={''}
                setUser_img={setCk_img1}
                user_img={ck_img1}
                delEvent={setCk_img1_delete}
              />
            ) : (
              ck_img1.map((element, index) => {
                // console.log(element);
                return (
                  <FilePick
                    key={index}
                    index={element.id}
                    file={element}
                    setUser_img={setCk_img1}
                    user_img={ck_img1}
                    delEvent={setCk_img1_delete}
                  />
                );
              })
            )}
          </View>
        </View>

        <View style={style.section}>
          <Text style={style.title}>
            사진 (근거리)
            {/* <Text style={style.subTitle}>최대 1개</Text> */}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {ck_img2.length < 1 ? (
              <FilePick
                key={ck_img2.length}
                index={ck_img2.length}
                file={''}
                setUser_img={setCk_img2}
                user_img={ck_img2}
                delEvent={setCk_img2_delete}
              />
            ) : (
              ck_img2.map((element, index) => {
                // console.log(element);
                return (
                  <FilePick
                    key={index}
                    index={element.id}
                    file={element}
                    setUser_img={setCk_img2}
                    user_img={ck_img2}
                    delEvent={setCk_img2_delete}
                  />
                );
              })
            )}
          </View>
        </View>

        <View style={{paddingVertical: 20}}>
          {/* <View style={{marginVertical: 3}}>
            <CustomButton
              label="비우기"
              labelColor={ColorBlack}
              backgroundColor={ColorWhite}
              borderColor={'#E3E3E3'}
              borderRadius={5}
              onPress={() => _claer()}
            />
          </View> */}
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
      <DatePickerModal
        visible={picker}
        setVisible={setPicker}
        value={ck_date}
        setValue={setCk_date}
        type={'worker_inspection'}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
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
    fontFamily: FontPretendardRegular,
    paddingVertical: 0,
  },
  image: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
    overflow: 'hidden',
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
export default connect(mapStateToProps)(InspectionForm);
