import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
// import AutoHeightImage from 'react-native-auto-height-image';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import FastImage from 'react-native-fast-image';
import ImageCard from '~/Components/ImageCard';
import ModalSelector from 'react-native-modal-selector';
import CustomModalFile from '~/Components/CustomModalFile';

//부모 내 정보수정
function FilePick(props) {
  let index = 1;
  const data = [
    {key: index++, label: '사진 촬영', value: 'camera'},
    {key: index++, label: '앨범에서 선택', value: 'album'},
  ];

  const [isModal, setIsModal] = React.useState(false);

  const IMG_URL = '';

  // console.log('props.file', props.file);
  const pickSingle = (index, mode) => {
    // console.log('rrr');
    ImagePicker.openPicker({
      cropping: true,
      sortOrder: 'asc',
      width: 600,
      height: 600,
      // compressImageMaxWidth: 1000,
      // compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      freeStyleCropEnabled: false,
      includeExif: false,
      mediaType: 'photo',
      includeBase64: true,
      waitAnimationEnd: false,
      forceJpg: true,
      showCropFrame: true,
      multiple: false,
      maxFiles: 1,
    })
      .then(async (images) => {
        images = new Array(images);

        if (mode == 'add') {
          const mt_photo = {
            id: props.index,
            uri:
              Platform.OS === 'android'
                ? images[0].path
                : images[0].path.replace('file://', ''),
            type: images[0].mime,
            // data: images[0].data,
            name: 'auto.jpg',
          };

          props.setUser_img([mt_photo]);
        } else {
          if (images.length > 1) {
            Alert.alert('이미지파일 하나만 선택해주세요');
            return;
          }
          const mt_photo = {
            id: props.index,
            uri:
              Platform.OS === 'android'
                ? images[0].path
                : images[0].path.replace('file://', ''),
            type: images[0].mime,
            data: images[0].data,
            name: 'auto.jpg',
          };

          props.setUser_img(
            props.user_img.map((element) =>
              element.id === index ? mt_photo : element,
            ),
          );
        }
      })
      .catch((e) => {});
  };

  const CameraSingle = (index, mode) => {
    console.log('camera!!!');
    ImagePicker.openCamera({
      cropping: true,
      cropperCircleOverlay: false,
      sortOrder: 'asc',
      width: 600,
      height: 600,
      // compressImageMaxWidth: 1000,
      // compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: false,
      mediaType: 'photo',
      includeBase64: true,
      waitAnimationEnd: false,
      forceJpg: true,
      showCropFrame: true,
      multiple: false,
      maxFiles: 1,
    })
      .then(async (images) => {
        images = new Array(images);

        if (mode == 'add') {
          const mt_photo = {
            id: props.index,
            uri:
              Platform.OS === 'android'
                ? images[0].path
                : images[0].path.replace('file://', ''),
            type: images[0].mime,
            // data: images[0].data,
            name: 'auto.jpg',
          };

          props.setUser_img([mt_photo]);
        } else {
          if (images.length > 1) {
            Alert.alert('이미지파일 하나만 선택해주세요');
            return;
          }
          const mt_photo = {
            id: props.index,
            uri:
              Platform.OS === 'android'
                ? images[0].path
                : images[0].path.replace('file://', ''),
            type: images[0].mime,
            data: images[0].data,
            name: 'auto.jpg',
          };

          props.setUser_img(
            props.user_img.map((element) =>
              element.id === index ? mt_photo : element,
            ),
          );
        }
      })
      .catch((e) => {});
  };

  const removeHandle = (index) => {
    // 삭제값추가
    if (typeof props.delEvent == 'function') {
      props.delEvent('Y');
    }

    props.setUser_img(
      props.user_img.filter((element) => {
        return element.id != index;
      }),
    );
  };

  const choice = () => {};

  return (
    <>
      {props.file !== '' ? (
        <View style={{alignItems: 'center'}}>
          {/* <TouchableOpacity onPress={() => pickSingle(props.index, 'edit')}> */}
          {/* <ModalSelector
            data={data}
            cancelText={'취소'}
            initValue={''}
            optionStyle={{paddingVertical: 30}}
            onChange={(option) => {
              if (option.key) {
                // alert(`${option.label} (${option.key}) nom nom nom`);
                if (option.value == 'album') {
                  pickSingle(props.index, 'edit');
                } else if (option.value == 'camera') {
                  CameraSingle(props.index, 'edit');
                }
              }
            }}> */}
          <ImageCard
            item={props.file}
            removeHandle={() => removeHandle(props.index)}
            keys={props.index.toString()}
          />
          {/* </TouchableOpacity> */}
          {/* </ModalSelector> */}
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          {/* <ModalSelector
            data={data}
            cancelText={'취소'}
            optionStyle={{paddingVertical: 30}}
            onChange={(option) => {
              console.log('chg', {onChange: option});
              if (option.key) {
                // alert(`${option.label} (${option.key}) nom nom nom`);
                if (option.value == 'album') {
                  pickSingle(props.index, 'add');
                } else if (option.value == 'camera') {
                  CameraSingle(props.index, 'add');
                }
              }
            }}> */}
          <TouchableOpacity onPress={() => setIsModal(true)}>
            {/* <TouchableOpacity onPress={() => pickSingle(props.index)}> */}
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#F5F5F5',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                // borderStyle: 'dashed',
                // borderColor: '#E3E3E3',
                // borderWidth: 1,
                borderRadius: 5,
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="plus" color={'#999999'} size={32} />
              </View>
            </View>
          </TouchableOpacity>
          {/* </ModalSelector> */}
        </View>
      )}

      <CustomModalFile
        visible={isModal}
        setVisible={setIsModal}
        title={'사진 촬영'}
        subTitle={'앨범에서 선택'}
        cancelAction={() => {
          setIsModal(false);
          if (Platform.OS == 'android') {
            pickSingle(props.index, 'add');
          } else {
            setTimeout(() => {
              pickSingle(props.index, 'add');
            }, 700);
          }
        }}
        confirmAction={() => {
          setIsModal(false);
          if (Platform.OS == 'android') {
            CameraSingle(props.index, 'add');
          } else {
            setTimeout(() => {
              CameraSingle(props.index, 'add');
            }, 700);
          }
        }}
        closeAction={() => {
          setIsModal(false);
        }}
      />
    </>
  );
}

export default FilePick;

const styles = StyleSheet.create({
  imgContain: {width: '20%', height: '30%', resizeMode: 'contain'},
  imgCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
  },

  toastTxt: {textAlign: 'center', fontSize: 12},
  toastWr: {
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 50,
    zIndex: 9,
  },
});

export const FilePick2 = (props) => {
  const IMG_URL = '';

  console.log('FilePick2 props', props);

  //단일업로드
  let isMultiple = props.multiple === false ? false : true;
  // console.log('isMultiple', isMultiple);

  const pickSingle = (index) => {
    ImagePicker.openPicker({
      cropping: true,
      sortOrder: 'asc',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: false,
      mediaType: 'photo',
      includeBase64: true,
      waitAnimationEnd: false,
      forceJpg: true,
      showCropFrame: true,
      multiple: isMultiple,
      maxFiles: 1,
    })
      .then(async (images) => {
        console.log('typeof images', typeof images, images);
        if (typeof images != 'array') {
          images = new Array(images);
        }

        if (images.length > 1) {
          await props.setPopup_text('이미지파일 하나만 선택해주세요');
          await props.setPopup(true);
          return;
        }
        const mt_photo = {
          id: props.index,
          uri:
            Platform.OS === 'android'
              ? images[0].path
              : images[0].path.replace('file://', ''),
          type: images[0].mime,
          data: images[0].data,
          name: 'auto.jpg',
        };

        if (images.length > 1) {
          const image_file = images.map((element, key) => {
            return {
              id: key,
              uri:
                Platform.OS === 'android'
                  ? element.path
                  : element.path.replace('file://', ''),
              type: element.mime,
              data: element.data,
              name: 'auto.jpg',
            };
          });
          props.setUser_img(image_file);
        } else {
          props.setUser_img([mt_photo]);
        }
      })
      .catch((e) => {});
  };

  const putPickHandle = (index) => {
    ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: false,
      sortOrder: 'asc',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: false,
      mediaType: 'photo',
      includeBase64: true,
      waitAnimationEnd: false,
      forceJpg: true,
      showCropFrame: true,
      multiple: isMultiple,
      maxFiles: 1,
    })
      .then(async (images) => {
        console.log('typeof images', typeof images);
        if (typeof images != 'array') {
          images = new Array(images);
        }

        if (images.length > 1) {
          await props.setPopup_text('이미지파일 하나만 선택해주세요');
          await props.setPopup(true);
          return;
        }
        const mt_photo = {
          id: props.index,
          uri:
            Platform.OS === 'android'
              ? images[0].path
              : images[0].path.replace('file://', ''),
          type: images[0].mime,
          data: images[0].data,
          name: 'auto.jpg',
        };
        props.setUser_img(
          props.user_img.map((element) =>
            element.id === index ? mt_photo : element,
          ),
        );
      })
      .catch((e) => {});
  };

  const removeHandle = (index) => {
    props.setUser_img(
      props.user_img.filter((element) => {
        return element.id != index;
      }),
    );
  };

  const thisSource = {
    uri: props.file.uri
      ? props.file.uri
      : props.file.data
      ? props.file.data
      : props.file,
  };

  return (
    <>
      {props.file !== '' ? (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => putPickHandle(props.index)}>
            <View
              style={{
                width: 96,
                height: 96,
                justifyContent: 'center',
                alignItems: 'center',

                borderRadius: 5,
              }}>
              <Image source={thisSource} style={[styles.imgCover]} />
            </View>
          </TouchableOpacity>
          {props.viewPopup ? (
            <TouchableOpacity
              onPress={() => props.viewPopup(thisSource)}
              style={{
                zIndex: 1,
                position: 'absolute',
                right: 5,
                top: 0,
                height: 25,
                width: 25,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="arrowsalt" size={15} />
              {/* <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            /> */}
            </TouchableOpacity>
          ) : null}
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => pickSingle(props.index)}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#F5F5F5',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon2 name="plus" color={'#999999'} size={32} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

//authenticate2(미션인증하기)
export const FilePick3 = (props) => {
  const IMG_URL = '';

  // console.log('props.index', props.index);

  const pickSingle = (index) => {
    // console.log('FilePick3', index);
    ImagePicker.openPicker({
      cropping: true,
      sortOrder: 'asc',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: false,
      mediaType: 'photo',
      includeBase64: true,
      waitAnimationEnd: false,
      forceJpg: true,
      showCropFrame: true,
      multiple: false,
      maxFiles: 1,
    })
      .then(async (images) => {
        // if (images.length > 1) {
        //   await props.setPopup_text('이미지파일 하나만 선택해주세요');
        //   await props.setPopup(true);
        //   return;
        // }
        images = new Array(images);
        const mt_photo = {
          id: props.index,
          uri:
            Platform.OS === 'android'
              ? images[0].path
              : images[0].path.replace('file://', ''),
          type: images[0].mime,
          //data: images[0].data,
          name: 'auto.jpg',
        };

        if (images.length > 1) {
          const image_file = images.map((element, key) => {
            return {
              id: key,
              uri:
                Platform.OS === 'android'
                  ? element.path
                  : element.path.replace('file://', ''),
              type: element.mime,
              //data: element.data,
              name: 'auto.jpg',
            };
          });

          // let newUser_img = [...props.user_img];
          // image_file.forEach((img, k) => {
          //   newUser_img.push(img);
          // });
          // props.setUser_img(newUser_img);
          props.setUser_img([...props.user_img, ...image_file]);
        } else {
          // let newUser_img = [...props.user_img];
          // newUser_img.push(mt_photo);
          // props.setUser_img(newUser_img);
          props.setUser_img([...props.user_img, mt_photo]);
        }
      })
      .catch((e) => {});
  };

  const putPickHandle = (index) => {
    console.log('FilePick3', index);
    ImagePicker.openPicker({
      cropping: true,
      cropperCircleOverlay: false,
      sortOrder: 'asc',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: false,
      mediaType: 'photo',
      includeBase64: true,
      waitAnimationEnd: false,
      forceJpg: true,
      showCropFrame: true,
      multiple: true,
      maxFiles: 5,
    })
      .then(async (images) => {
        if (images.length > 1) {
          await props.setPopup_text('이미지파일 하나만 선택해주세요');
          await props.setPopup(true);
          return;
        }
        const mt_photo = {
          id: props.index,
          uri:
            Platform.OS === 'android'
              ? images[0].path
              : images[0].path.replace('file://', ''),
          type: images[0].mime,
          data: images[0].data,
          name: 'auto.jpg',
        };
        props.setUser_img(
          props.user_img.map((element) =>
            element.id === index ? mt_photo : element,
          ),
        );
      })
      .catch((e) => {});
  };

  const removeHandle = (index) => {
    // props._removeImage(index);
    props.setUser_img(
      props.user_img.filter((element) => {
        return element.id != index;
      }),
    );
  };

  const thisSource = {
    uri: props.file.uri
      ? props.file.uri
      : props.file.data
      ? IMG_URL + props.file.data
      : IMG_URL + props.file,
  };

  return (
    <>
      {props.file !== '' ? (
        <View
          style={{alignItems: 'center', marginRight: 8, marginTop: 8}}
          key={'img_box_' + props.keys ? props.keys : props.index}>
          {/* <TouchableOpacity onPress={() => putPickHandle(props.index)}> */}
          <TouchableOpacity onPress={() => props.setModal(true, thisSource)}>
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image source={thisSource} style={[styles.imgCover]} />
            </View>
          </TouchableOpacity>
          {props.noDel ? null : (
            <TouchableOpacity
              onPress={() => removeHandle(props.index)}
              style={{
                zIndex: 1,
                position: 'absolute',
                right: 5,
                top: 5,
                height: 25,
                width: 25,
                borderRadius: 13,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* <Image
                source={require('../images/close.png')}
                style={{width: 27, height: 27, resizeMode: 'contain'}}
              /> */}
              <Icon
                // style={{width: 27, height: 27, resizeMode: 'contain'}}
                size={20}
                name="close"
                // color="#FFF"
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View
          style={{alignItems: 'center', marginRight: 8, marginTop: 8}}
          key={'img_box_' + props.keys ? props.keys : props.index}>
          <TouchableOpacity onPress={() => pickSingle(props.index)}>
            <View
              style={{
                width: 100,
                height: 100,
                backgroundColor: '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 3,
              }}>
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon2 name="plus" color={'#999999'} size={32} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
