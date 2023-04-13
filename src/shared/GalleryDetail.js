import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
} from 'react-native';
// import {Container, Content, Button, Footer, FooterTab} from 'native-base';
import ExtraDimensions from 'react-native-extra-dimensions-android';
// import AutoHeightImage from 'react-native-auto-height-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/AntDesign';
Icon.loadFont();
import {mystyle as styles} from '~/style/Styles';
import {connect} from 'react-redux';
// import RNFetchBlob from 'rn-fetch-blob';
import ReactNativeBlobUtil from 'react-native-blob-util';

import CameraRoll from '@react-native-community/cameraroll';
import Api from '~/Api';

export function PaginationPager(props) {
  return (
    <View
      style={[
        styles.sldPager,
        {
          left: 0,
          right: 0,
          height: 44,
          paddingVertical: 0,
          backgroundColor: '#000',
        },
      ]}>
      <Text
        style={[
          styles.sldPagerTxt,
          {marginLeft: 0, fontSize: 17, color: '#888'},
        ]}>
        {props.index} / {props.total}
      </Text>
    </View>
  );
}
//------------------------------------------------------------------------------
export function Detail_info(props) {
  const item = props.items;

  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : ExtraDimensions.get('REAL_WINDOW_HEIGHT') -
        ExtraDimensions.get('STATUS_BAR_HEIGHT');

  const [galleryIndex, setGalleryIndex] = useState(props.galleryIndex);
  const handleIndexChange = (index) => {
    index = index + 1;
    setGalleryIndex(index);
  };

  const pr_idx = props.pr_idx;

  const saveToGallery = async () => {
    let imgUrl = item[0].url;
    let newImgUri = imgUrl.lastIndexOf('/');
    let imageName = imgUrl.substring(newImgUri + 1);

    console.log('imgUrl', imageName);

    if (Platform.OS == 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        } else {
          ToastAndroid.show(
            '폴더 사용 권한을 거부하였습니다.',
            ToastAndroid.LONG,
          );

          return;
        }
      } catch (err) {
        console.warn(err);
      }
    }

    // let newImgUri = imgUrl;
    // let imageName = 'homeshin.pdf';
    // let imageName = tempimageName;

    let dirs = ReactNativeBlobUtil.fs.dirs;
    let path =
      Platform.OS === 'ios'
        ? dirs['MainBundleDir'] + '/homeshin/' + imageName
        : dirs.PictureDir + '/homeshin/' + imageName;

    // const dirToSave =
    //   Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir;
    // console.log('dirs', dirs);

    console.log(
      'savefile',
      // newImgUri.substring(0, 100),
      imgUrl,
      imageName,
      path,
    );

    ReactNativeBlobUtil.config({
      fileCache: true,
      // appendExt: 'png',
      // indicator: true,
      IOSBackgroundTask: true,
      path: path,
      addAndroidDownloads: {
        useDownloadManager: true,
        title: '사진이 저장 되었습니다.',
        notification: true,
        path: path,
        mime: 'image/jpeg',
        description: 'homeshin',
        mediaScannable: true,
      },
    })
      .fetch('GET', imgUrl, {Accept: 'application/octet-stream'})
      .then(async (res) => {
        // if (Platform.OS == 'android') {
        // console.log(
        //   'ReactNativeBlobUtil.MediaCollection',
        //   ReactNativeBlobUtil.MediaCollection,
        // );

        await CameraRoll.save(res.path(), {type: 'photo', album: 'homeshin'});

        // let result =
        //   await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        //     {
        //       name: '1.jpg', // name of the file
        //       parentFolder: 'homeshin', // subdirectory in the Media Store, e.g. HawkIntech/Files to create a folder HawkIntech with a subfolder Files and save the image within this folder
        //       mimeType: 'image/png', // MIME type of the file
        //     },
        //     'Image', // Media Collection to store the file in ("Audio" | "Image" | "Video" | "Download")
        //     res.path(), // Path to the file being copied in the apps own storage
        //   );
        // }

        Alert.alert('사진이 저장 되었습니다.');

        console.log('res', res.path());
        return;

        // the conversion is done in native code
        // let base64Str = res.base64();
        // the following conversions are done in js, it's SYNC
        // let text = res.text();
        // let json = res.json();
      })
      .catch((errorMessage, statusCode) => {
        // Something went wrong:
        console.log('errorMessage', errorMessage);
        Alert.alert('오류', '폴더 권한을 확인해주세요.');
        // error handling
      });
  };

  return (
    <View
      style={{
        // flex: 1,
        width: '100%',
        height: deviceHeight,
      }}>
      <ImageViewer
        renderIndicator={() => <></>}
        imageUrls={item}
        index={props.galleryIndex}
        onSwipeDown={() => props.navigation.goBack()}
        enableSwipeDown={true}
        // width={Dimensions.get('window').width}
        // height={deviceHeight}
        // renderHeader={() => <View></View>}
      />

      <View
        style={{
          position: 'absolute',
          // right: 6,
          top: 40,
          zIndex: 10,
          paddingVertical: 6,
          paddingHorizontal: 20,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
        }}>
        {/* <View style={{flexDirection: 'row'}}> */}
        <TouchableOpacity onPress={() => saveToGallery()}>
          <View
            style={[
              styles.container1,
              {
                width: 38,
                height: 38,
                borderRadius: 38 / 2,
                backgroundColor: '#ffffff8c',
              },
            ]}>
            <Icon name={'save'} size={22} color={'#000'} />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => saveImageToZip()}
          style={{marginLeft: 20}}>
          <View
            style={[
              styles.container1,
              {
                width: 38,
                height: 38,
                borderRadius: 38 / 2,
                backgroundColor: '#ffffff8c',
              },
            ]}>
            <Icon name={'download'} size={22} color={'#000'} />
          </View>
        </TouchableOpacity> */}
        {/* </View> */}
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <View
            style={[
              styles.container1,
              {
                width: 38,
                height: 38,
                borderRadius: 38 / 2,
                backgroundColor: '#ffffff8c',
              },
            ]}>
            <Icon name={'close'} size={22} color={'#000'} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//------------------------------------------------------------------------------
function GalleryDetail(props) {
  const [total, setTotal] = useState(props.route.params.total);
  const [galleryIndex, setGalleryIndex] = useState(props.route.params.index);
  const [detail_info, setDetail_info] = useState(<></>);
  const [paginationPager, setPaginationPager] = useState();

  const pr_idx =
    props.route && props.route.params && props.route.params.pr_idx
      ? props.route.params.pr_idx
      : '';

  //------------------------------------------------------------------
  useEffect(() => {
    var newArray = props.route.params.arrItems.map((arr, index) => ({
      url: arr,
      freeHeight: true,
    }));
    const rs1 = (
      <Detail_info
        navigation={props.navigation}
        items={newArray}
        galleryIndex={galleryIndex}
        pr_idx={pr_idx}
      />
    );
    setDetail_info(rs1);
  }, []);

  const settstate = (index, total) => {
    const rs2 = <PaginationPager index={index} total={total} />;
    setPaginationPager(rs2);
  };
  //------------------------------------------------------------------

  return (
    <View>
      <View>{detail_info}</View>
    </View>
  );
}

export default GalleryDetail;
