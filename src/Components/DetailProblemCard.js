import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';
import ImageModal from '~/shared/ImageModal';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView} from '~/Api';
import cusToast from '~/Components/CusToast';
import CustomButton from './CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';

function DetailProblemCard({item, navigation, mt_idx, mt_level, refresh}) {
  const [modal, setModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState([]);
  const [modalImageNo, setModalImageNo] = useState(0);

  console.log('item', item);

  useEffect(() => {
    let ImgArr = [];
    if (item.ck_img1_big)
      ImgArr.push({uri: item.ck_img1_big, url: item.ck_img1_big});
    if (item.ck_img2_big)
      ImgArr.push({uri: item.ck_img2_big, url: item.ck_img2_big});

    setModalImageUrl(ImgArr);
  }, []);

  const onPressGallery = (uri) => {
    navigation.navigate('GalleryDetail', {
      total: 1,
      index: 0,
      arrItems: [uri],
    });
  };

  const _delete = (idx) => {
    Alert.alert('삭제하시겠습니까?', '', [
      {text: '취소'},
      {
        text: '확인',
        onPress: () => {
          Api.send(
            'proc_checklist_del',
            {idx: idx, pr_idx: item.pr_idx, mt_idx: mt_idx},
            (responseJson) => {
              if (responseJson.result == 'Y') {
                Alert.alert('삭제되었습니다.', '', [
                  {
                    text: '확인',
                    onPress: () => {
                      refresh();
                    },
                  },
                ]);
              }
            },
          );
        },
      },
    ]);
  };

  const _edit = (idx) => {
    navigation.navigate('InspectionForm', {pr_idx: item.pr_idx, idx: item.idx});
  };

  return (
    <View style={style.container}>
      <View style={style.section}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={style.title}>공간</Text>
          {mt_level > 2 ? (
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => _edit(item.idx)}
                style={{marginRight: 20}}>
                <Icon name="edit" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _delete(item.idx)}>
                <Icon name="delete" size={20} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <Text style={style.subTitle}>{item.ck_space}</Text>
      </View>
      <View style={style.section}>
        <Text style={style.title}>위치</Text>
        <Text style={style.subTitle}>{item.ck_location}</Text>
      </View>
      <View style={style.section}>
        <Text style={style.title}>하자</Text>
        <Text style={style.subTitle}>{item.ck_memo}</Text>
      </View>
      <View style={style.section}>
        <Text style={style.title}>점검일자</Text>
        <Text style={style.subTitle}>{item.ck_date}</Text>
      </View>
      <View style={style.section}>
        <Text style={style.title}>사진 (원거리)</Text>

        {item.ck_img1_big ? (
          <TouchableOpacity
            onPress={() => {
              // setModal(true);
              // setModalImageNo(0);
              onPressGallery(item.ck_img1_big);
            }}>
            <FastImage
              source={{uri: item.ck_img1_big}}
              style={{
                height: 100,
                borderRadius: 5,
                // width: Dimensions.get('screen').width - 40,
                width: 100,
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={style.section}>
        <Text style={style.title}>사진 (근거리)</Text>
        {item.ck_img2_big ? (
          <TouchableOpacity
            onPress={() => {
              // setModal(true);
              // setModalImageNo(modalImageUrl.length > 1 ? 1 : 0);
              onPressGallery(item.ck_img2_big);
            }}>
            <FastImage
              source={{uri: item.ck_img2_big}}
              style={{
                height: 100,
                width: 100,
                borderRadius: 5,
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* <ImageModal
        view={modal}
        imageUrl={modalImageUrl}
        imageNum={modalImageNo}
      /> */}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginTop: 5,
    marginBottom: 10,
  },
  title: {
    fontFamily: FontPretendardBold,
    fontSize: 15,
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: FontPretendardRegular,
    fontSize: 15,
    color: '#333',
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
export default connect(mapStateToProps)(DetailProblemCard);
