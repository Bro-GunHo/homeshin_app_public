import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import BackButton from '~/Components/BackButton';
import CommentsCard from '~/Components/CommentsCard';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from './FreeBoardDetailStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';
import Icon from 'react-native-vector-icons/AntDesign';
import ImageCard from '~/Components/ImageCard';
function FreeBoardDetail({navigation, route, mt_idx}) {
  const [data, setData] = useState({});
  const [commentData, setCommentData] = useState([]);
  const [idx, setIdx] = useState(
    route.params && route.params.idx ? route.params.idx : '',
  );

  const [nt_answer, setNt_answer] = useState('');

  useEffect(() => {
    if (idx) getData();
  }, [idx]);

  const getData = () => {
    Api.send(
      'proc_board_qna_list',
      {
        idx: idx,
      },
      (responseJson) => {
        if (responseJson.result == 'Y') {
          let item = responseJson.item[0];
          setData(item);

          setCommentData(item.comment_data);

          console.log(
            'data.nt_file_arr ',
            responseJson.item[0].nt_file_arr,
            item.comment_data,
          );
        } else {
          setData([]);
          Alert.alert('삭제된 글입니다.');
          navigation.goBack();
        }
      },
    );
  };

  const _commentSubmit = () => {
    if (!nt_answer) {
      cusToast('댓글을 입력해주세요.');
      return false;
    }

    let sendObj = {
      mt_idx: mt_idx,
      nt_idx: idx,
      nt_answer: nt_answer,
    };

    Api.send('proc_board_comment_write', sendObj, (responseJson) => {
      if (responseJson.result == 'Y') {
        Alert.alert('등록되었습니다.', '', [
          {
            text: '확인',
            onPress: () => {
              setNt_answer('');
              getData();
            },
          },
        ]);
      }
    });
  };

  const _delete = () => {
    Alert.alert('삭제하시겠습니까?', '', [
      {text: '취소'},
      {
        text: '확인',
        onPress: () => {
          Api.send(
            'proc_board_qna_del',
            {mt_idx: mt_idx, idx: idx},
            (responseJson) => {
              if (responseJson.result == 'Y') {
                navigation.goBack();
              }
            },
          );
        },
      },
    ]);
  };

  const _commentDelete = (idx) => {
    Alert.alert('삭제하시겠습니까?', '', [
      {text: '취소'},
      {
        text: '확인',
        onPress: () => {
          Api.send('proc_board_comment_del', {mt_idx, idx}, (responseJson) => {
            if (responseJson.result == 'Y') {
              getData();
            }
          });
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'자유게시판 상세'}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS == 'android' ? 45 : 0}>
        <ScrollView>
          <View>
            <View
              style={[
                style.section,
                {borderBottomWidth: 1, borderColor: '#E3E3E3'},
              ]}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View>
                  <Text style={style.title}>{data.nt_title}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <Text style={style.subTitle}>{data.mt_name}</Text>
                    <Text
                      style={[
                        style.subTitle,
                        {marginLeft: 5, color: '#999999'},
                      ]}>
                      {data.nt_wdate_str}
                    </Text>
                  </View>
                </View>
                {mt_idx == data.mt_idx ? (
                  <TouchableOpacity onPress={() => _delete()}>
                    <Icon name="delete" size={20} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View style={[style.section, {minHeight: 200}]}>
              <Text style={style.content}>{data.nt_content}</Text>
            </View>

            {data.nt_file_arr && data.nt_file_arr.length ? (
              <View
                style={{
                  paddingVertical: 10,
                  // borderTopWidth: 1,
                  // borderColor: '#E3E3E3',
                  marginHorizontal: 20,
                }}>
                {/* <View style={style.section}>
              <Text style={style.title}>사진첨부</Text>
            </View> */}
                <ScrollView
                  horizontal
                  bounces={false}
                  showsHorizontalScrollIndicator={false}>
                  {data.nt_file_arr.map((item, index) => {
                    // console.log('nt_file_arr22', item);
                    return (
                      <ImageCard
                        item={item}
                        removeHandle={false}
                        navigation={navigation}
                        popup={true}
                      />
                    );
                  })}
                </ScrollView>
              </View>
            ) : null}

            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderTopWidth: 1,
                borderColor: '#E3E3E3',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // height: 55,
                }}>
                {/* <View style={{flex: 1}}> */}
                <TextInput
                  style={{
                    flex: 1,
                    height: 55,
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 5,
                    padding: 15,
                    marginRight: 5,
                  }}
                  placeholder="댓글 입력"
                  value={nt_answer}
                  onChangeText={(text) => setNt_answer(text)}
                />
                {/* </View> */}
                {/* <View style={{flex: 0.4}}> */}
                <CustomButton
                  label="등록"
                  labelColor={ColorRed}
                  labelSize={15}
                  backgroundColor={ColorWhite}
                  borderRadius={5}
                  borderColor={ColorRed}
                  flex={0.4}
                  onPress={() => _commentSubmit()}
                />
                {/* </View> */}
              </View>
            </View>
          </View>
          {commentData.length
            ? commentData.map((item, index) => {
                return (
                  <CommentsCard
                    data={item}
                    _delete={_commentDelete}
                    key={`Comments-${item.idx}`}
                  />
                );
              })
            : null}
          {/* <FlatList
        data={commentData}
        bounces={false}
        scrollEnabled={false}
        // style={{maxHeight: 500}}
        keyExtractor={(item) => }
        renderItem={({item}) => (
          
        )}
      /> */}
        </ScrollView>
      </KeyboardAvoidingView>
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
export default connect(mapStateToProps)(FreeBoardDetail);
