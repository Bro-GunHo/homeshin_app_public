import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  // Share,
  Alert,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';
// import AutoHeightImage from 'react-native-auto-height-image';
// import Share from 'react-native-share';
// import {
//   widthPercentageToDP,
//   heightPercentageToDP,
// } from 'react-native-responsive-screen';
// import RNFetchBlob from 'rn-fetch-blob';
// import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/AntDesign';
import ImageViewer from 'react-native-image-zoom-viewer';
import {mystyle as styles} from '~/style/Styles';

/* 이미지 팝업 */
export default function ImageModal({imageUrl, view, imageNum, navigation}) {
  const [visible, setVisible] = useState(view);
  const [imgSource, setImgSource] = useState(imageUrl);
  const [imgNo, setImageNo] = useState(imageNum ? imageNum : 0);

  useEffect(() => {
    setImageNo(imageNum);
    setImgSource(imageUrl);
  }, [imageNum, imageUrl]);

  const deviceHeight =
    Platform.OS === 'ios'
      ? Dimensions.get('window').height
      : ExtraDimensions.get('REAL_WINDOW_HEIGHT') -
        ExtraDimensions.get('STATUS_BAR_HEIGHT');

  console.log('imageUrl', imageUrl);

  const saveToGallery = async () => {
    let imgUrl = imgSource.uri;

    let newImgUri = imgUrl.lastIndexOf('/');
    let imageName = imgUrl.substring(newImgUri);

    let dirs = RNFetchBlob.fs.dirs;
    // let path =
    //   Platform.OS === 'ios'
    //     ? dirs['MainBundleDir'] + imageName
    //     : dirs.PictureDir + imageName;

    let path = dirs.PictureDir + '/BuzyRun' + imageName;

    console.log('savefile', newImgUri, imageName, dirs.PictureDir, path);

    if (Platform.OS == 'android') {
      await RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
        indicator: true,
        IOSBackgroundTask: true,
        path: path,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: path,
          description: '부지런',
        },
      })
        .fetch('GET', imgUrl)
        .then((res) => {
          Alert.alert('사진함에 저장되었습니다.');
          //console.log(res, 'end downloaded');
        });
    } else {
      await CameraRoll.save(imgUrl, {type: 'photo', album: 'BuzyRun'});
      Alert.alert('사진함에 저장되었습니다.');
    }
  };

  //share
  const dwFile = () => {
    let file_url = imgSource.uri;
    let imagePath = null;
    RNFetchBlob.config({
      fileCache: true,
    })
      .fetch('GET', file_url)
      // the image is now dowloaded to device's storage
      .then((resp) => {
        // the image path you can use it directly with Image component
        imagePath = resp.path();
        return resp.readFile('base64');
      })
      .then(async (base64Data) => {
        var base64Data = `data:image/png;base64,` + base64Data;

        //console.log('base64Data', base64Data);
        // here's base64 encoded image

        await Share.open({url: base64Data})
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            err && console.log(err);
          });

        // remove the file from storage
        return RNFetchBlob.fs.unlink(imagePath);
      });
  };

  React.useEffect(() => {
    setImgSource(imageUrl);
    setVisible(view);
  }, [imageUrl, view]);

  return (
    <Modal
      style={{flex: 1}}
      transparent={false}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {
        console.log('onRequestClose');
        setVisible(false);
        return true;
      }}>
      {/* <SafeAreaView style={{flex: 1}}> */}

      <View
        style={{
          width: '100%',
          height: deviceHeight,
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          backgroundColor: '#000000',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'black',
            overflow: 'hidden',
          }}>
          {imgSource.length ? (
            // <Image
            //   source={imgSource}
            //   style={{
            //     // width: left0,
            //     width: Dimensions.get('screen').width,
            //     // left: 0,
            //     // right: 0,
            //     height: Dimensions.get('screen').height - 90 - 80,
            //     // maxHeight: 420,
            //     // height: 200,
            //     resizeMode: 'contain',
            //   }}
            //   // width={widthPercentageToDP('100%')}
            //   resizeMode="contain"
            // />
            <ImageViewer
              imageUrls={imgSource}
              index={imgNo}
              onSwipeDown={() => setVisible(false)}
              enableSwipeDown={true}
              style={{
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height - 90 - 80,
              }}
              // renderHeader={(prev) => {
              //   return (
              //     <View
              //       style={{
              //         // width: '100%',
              //         // height: 80,
              //         justifyContent: 'center',
              //         alignItems: 'flex-end',
              //         position: 'absolute',
              //         zIndex: 99,
              //         top: 15,
              //         right: 0,
              //       }}>
              //       <TouchableOpacity
              //         onPress={() => {
              //           setVisible(false);
              //         }}
              //         style={{paddingRight: 20}}>
              //         <Text style={{fontSize: 45, color: '#fff'}}>×</Text>
              //       </TouchableOpacity>
              //     </View>
              //   );
              // }}
            />
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={{
            position: 'absolute',
            right: 6,
            top: 30,
            zIndex: 10,
            padding: 6,
          }}>
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

        {/* <View
            style={{
              width: '100%',
              height: 90,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {imgSource.uri && imgSource.uri.indexOf('http') > -1 ? (
              <View
                style={{
                  position: 'absolute',
                  // bottom: 20,
                  width: '80%',
                  borderColor: '#fff',
                  borderWidth: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                    paddingVertical: 12,
                    borderRightWidth: 1,
                    borderRightColor: '#fff',
                  }}
                  onPress={() => dwFile()}>
                  <AutoHeightImage
                    width={21}
                    source={require('../images/Sharing.png')}
                  />
                  <Text style={{fontSize: 18, color: '#FFFFFF', marginLeft: 5}}>
                    공유
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '50%',
                    paddingVertical: 12,
                  }}
                  onPress={() => saveToGallery()}>
                  <Icon name="save" size={20} color={'white'} />
                  
                  <Text style={{fontSize: 18, color: '#FFFFFF', marginLeft: 5}}>
                    다운로드
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View> */}
      </View>
      {/* </SafeAreaView> */}
    </Modal>
  );
}

export function ImagePopOpen() {}
