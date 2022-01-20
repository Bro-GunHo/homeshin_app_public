import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/AntDesign';
import BackButton from '~/Components/BackButton';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import ImageCard from '~/Components/ImageCard';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from './FreeBoardEnrollStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';
import {FilePick3 as FilePick} from '~/shared/FilePick';

function FreeBoardEnroll({navigation, route, mt_idx}) {
  const [idx, setIdx] = useState(
    route.params && route.params.idx ? route.params.idx : '',
  );

  const [nt_title, setNt_title] = useState('');
  const [nt_content, setNt_content] = useState('');
  const [ck_img1, setCk_img1] = useState([]);
  const [ck_img1_delete, setCk_img1_delete] = useState('');

  const _removeImage = (index) => {};
  const setModal = (yn, source) => {};

  useEffect(() => {
    if (idx) getData();

    contLoad();
  }, [idx]);

  const [cont, setCont] = useState('');

  const contLoad = () => {
    Api.send('proc_list_content', {co_id: '5'}, (responseJson) => {
      if (responseJson.result == 'Y') {
        setCont(responseJson.item.co_content);
      }
    });
  };

  const _submit = () => {
    if (!nt_title) {
      cusToast('제목을 입력해주세요.');
      return false;
    }
    if (!nt_content) {
      cusToast('내용을 입력해주세요.');
      return false;
    }

    let sendObj = {
      mt_idx: mt_idx,
      idx,
      nt_title: nt_title,
      nt_content: nt_content,
    };

    let upload_file_arr = []; //업로드할 파일
    ck_img1.forEach((item, index) => {
      //업로드할 파일만 구분함
      if (item.uri.indexOf('http') === -1) {
        // upload_file_arr.push(item);
        upload_file_arr.push(item);
      }
    });

    let fileObj = {nt_file_arr: upload_file_arr};

    // if (idx) {
    //   Api.send(
    //     'proc_board_qna_write',
    //     sendObj,
    //     (responseJson) => {
    //       if (responseJson.result == 'Y') {
    //         Alert.alert('수정되었습니다.', '', [
    //           {text: '확인', onPress: () => navigation.goBack()},
    //         ]);
    //       }
    //     },
    //     fileObj,
    //   );
    // } else {
    Api.send(
      'proc_board_qna_write',
      sendObj,
      (responseJson) => {
        if (responseJson.result == 'Y') {
          Alert.alert('등록되었습니다.', '', [
            {text: '확인', onPress: () => navigation.goBack()},
          ]);
        }
      },
      fileObj,
    );
    // }
  };

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'자유게시판 글쓰기'}
      />
      <ScrollView bounces={false}>
        <View style={style.section}>
          <Text style={style.subTitle}>{cont}</Text>
        </View>
        <View style={style.section}>
          <Text style={style.title}>글 제목</Text>
          <TextInput
            style={style.input}
            placeholder="제목을 입력해주세요."
            value={nt_title}
            onChangeText={(text) => setNt_title(text)}
          />
        </View>
        <View style={style.section}>
          <Text style={style.title}>글 내용</Text>
          <TextInput
            style={[
              style.input,
              {
                height: 'auto',
                textAlignVertical: 'top',
                minHeight: 150,
                lineHeight: 20,
              },
            ]}
            placeholder="내용을 입력해주세요."
            multiline
            value={nt_content}
            onChangeText={(text) => setNt_content(text)}
          />
        </View>
        <View style={style.section}>
          <Text style={style.title}>사진첨부</Text>
        </View>
        <ScrollView
          horizontal
          bounces={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 20}}>
          {/* <TouchableOpacity style={[style.image, {backgroundColor: '#F5F5F5'}]}>
            <Icon name="plus" color={'#999999'} size={32} />
          </TouchableOpacity>
          <ImageCard /> */}

          {ck_img1.length > 0
            ? ck_img1.map((element, index) => {
                // console.log(element);
                return (
                  <FilePick
                    key={index}
                    index={element.id}
                    file={element}
                    setUser_img={setCk_img1}
                    user_img={ck_img1}
                    _removeImage={_removeImage}
                    setModal={setModal}
                  />
                );
              })
            : null}

          {ck_img1.length < 3 ? (
            <FilePick
              key={ck_img1.length}
              index={ck_img1.length}
              file={''}
              setUser_img={setCk_img1}
              user_img={ck_img1}
              _removeImage={_removeImage}
              setModal={setModal}
            />
          ) : null}
        </ScrollView>

        <View style={{padding: 20}}>
          <CustomButton
            label={'등록하기'}
            labelColor={ColorWhite}
            backgroundColor={ColorRed}
            borderRadius={5}
            onPress={() => _submit()}
          />
        </View>
      </ScrollView>
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
export default connect(mapStateToProps)(FreeBoardEnroll);
