import React from 'react';
import {
  Platform,
  Alert,
  Linking,
  View,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
// import {Toast} from 'native-base';

import cusToast from '~/Components/CusToast';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

class Api {
  constructor() {
    //super(props);

    this.state = {
      isLoading: false,
      SERVER_NAME: 'phonerescue_server',
      SECRETKEY: '1111882EAD94E9C493CEF089E1B023A2122BA778',
      url: 'http://ec2-13-125-166-228.ap-northeast-2.compute.amazonaws.com',
      path: '/json/proc_json.php',
      option: {
        method: 'POST',
        headers: {
          //Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: null,
      },
      dataSource: {},
      baseCode: {},
      mb_fcm: '',
    };
  }

  //formdata 로 변경
  makeFormData(method = '', datas, files = {}) {
    let formdata = new FormData();
    formdata.append('method', method);
    formdata.append('secretKey', this.state.SECRETKEY);
    formdata.append('jwt_data', datas);

    for (let [key, value] of Object.entries(files)) {
      if (Array.isArray(value)) {
        for (let v of value) {
          formdata.append(key + '[]', v);
        }
      } else {
        formdata.append(key, value);
      }
    }

    // this.state.path = '/api/' + method + '.php';
    this.state.option.body = formdata;
  }

  //기본
  send(method, datas, callback, files) {
    const jwt = require('jwt-encode');
    const jwt_secret = this.state.SECRETKEY;
    const jwt_data = jwt(datas, jwt_secret);

    this.makeFormData(method, jwt_data, files);

    console.log('---- API SEND --- ', datas, files);

    this.state.isLoading = true;

    return Axios.post(
      this.state.url + this.state.path,
      this.state.option.body,
      this.state.option.headers,
    )
      .then((response) => {
        //console.warn(responseJson);
        const responseJson = jwt_decode(response.data.jwt, jwt_secret);
        // let responseJson = response.data;
        let resultItem = responseJson.result;
        let message = responseJson.msg;
        let arrItems = responseJson.data;
        // console.log(responseJson);

        let returnJson = {
          result: resultItem === 'Y' ? 'Y' : 'N',
          msg: message,
          item: arrItems,
        };
        this.state.isLoading = false;
        // this.state.dataSource = arrItems;
        //각 메소드별로 값을 저장해둠.

        //기초코드분류
        if (method == 'proc_base_code_all') {
          for (let objs of arrItems) {
            this.state.baseCode[objs.cd_b] = objs.item;
          }
        }

        if (resultItem === 'N' && message) {
          if (
            !(
              method === 'member_login_history' ||
              message === 'member_login_history' ||
              datas.is_modal === 1000
            )
          ) {
            cusToast(message);
          }
        }

        console.log('#### API RESPONSE ### ', returnJson);

        if (typeof callback == 'function') {
          callback(returnJson);
        } else {
          return returnJson;
        }
      })
      .catch(function (error, e2) {
        console.log('Axios catch!!!>>', method, error);
      });
  }
  //--------------------------------------------------------------------------------------------------
  loadingView() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator />
      </View>
    );
  }

  //--------------------------------------------------------------------------------------------------
  formatDate(date) {
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();

    if (currentMonth < 10) currentMonth = '0' + currentMonth;
    if (currentDate < 10) currentDate = '0' + currentDate;

    return currentYear + '-' + currentMonth + '-' + currentDate;
  }
  formatDateTime(date, format) {
    var currentYear = date.getFullYear();
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getDate();

    var currentHours = date.getHours();
    var currentMinutes = date.getMinutes();
    var currentSeconds = date.getSeconds();

    var hours = currentHours;
    var minutes = currentMinutes;

    if (currentMonth < 10) currentMonth = '0' + currentMonth;
    if (currentDate < 10) currentDate = '0' + currentDate;
    if (currentHours < 10) currentHours = '0' + currentHours;
    if (currentMinutes < 10) currentMinutes = '0' + currentMinutes;
    if (currentSeconds < 10) currentSeconds = '0' + currentSeconds;

    if (format === 'YmdHis') {
      return (
        currentYear +
        '' +
        currentMonth +
        '' +
        currentDate +
        '' +
        currentHours +
        '' +
        currentMinutes +
        '' +
        currentSeconds
      );
    } else if (format === 'Ymd') {
      return currentYear + '' + currentMonth + '' + currentDate;
    } else if (format === 'H:i') {
      return currentHours + ':' + currentMinutes;
    } else if (format === 'AMPM') {
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      //hours + ':' + minutes + ' ' + ampm;

      return currentHours + ':' + currentMinutes + ' ' + ampm;
    } else {
      return (
        currentYear +
        '-' +
        currentMonth +
        '-' +
        currentDate +
        ' ' +
        currentHours +
        ':' +
        currentMinutes
      );
    }
  }
  //--------------------------------------------------------------------------------------------------
  diffTime(start, end, format) {
    start = start.split(':');
    end = end.split(':');
    var startDate = new Date(0, 0, 0, start[0], start[1], 0);
    var endDate = new Date(0, 0, 0, end[0], end[1], 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;
    // hours = ((hours <= 9 ? "0" : "") + hours);
    if (hours === '00') {
      hours = '0';
    }

    minutes = (minutes <= 9 ? '0' : '') + minutes;
    if (minutes === '00') {
      minutes = '';
    }

    if (format === 'H') {
      return hours ? hours : '';
    } else if (format === 'i') {
      return minutes ? minutes : '';
    } else {
      return (hours ? hours + '시간 ' : '') + (minutes ? minutes + '분' : '');
    }
  }
  //--------------------------------------------------------------------------------------------------
  //콤마찍기
  comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }
  //콤마풀기
  uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
  }
  //--------------------------------------------------------------------------------------------------
  imgResize(imgWidth, imgHeight, maxWidth) {
    let width = 0,
      height = 0;
    if (imgWidth > maxWidth) {
      width = maxWidth;
      height = imgHeight * (maxWidth / imgWidth);
    } else {
      width = imgWidth;
      height = imgHeight;
    }
    width = parseInt(width);
    height = parseInt(height);

    return width + ',' + height;
  }
  //--------------------------------------------------------------------------------------------------
  // imgCrop(items){
  //   let newArray = items;
  //   let newArrayCrop = [];
  //   var maxWidth = 1200;

  //   items.map((item, i) => {
  //     Image.getSize(item, (width, height) => {

  //       let cropData = {
  //         offset: {x: 0, y: 0},
  //         size: {width: width, height: height},
  //         // displaySize: {width: maxWidth, height: maxWidth},
  //         resizeMode: 'cover'
  //       };

  //       if (width > maxWidth) {
  //         cropData.size.width = maxWidth;
  //         cropData.size.height = parseInt((maxWidth*height)/width);

  //         ImageEditor.cropImage(item, cropData).then(url => {
  //           console.log("Cropped image uri", url);
  //           newArray[i] = url;
  //           newArrayCrop.push(url);
  //         });

  //       } else {
  //         cropData.size.width = width;
  //         cropData.size.height = height;
  //       }
  //       console.log(cropData);
  //     });
  //   });

  //   return [newArray, newArrayCrop];
  // }
  //--------------------------------------------------------------------------------------------------
  imgRemove(item) {}
  //--------------------------------------------------------------------------------------------------
  dialCall = (number) => {
    let phoneNumber = '';

    if (Platform.OS === 'ios') {
      phoneNumber = `telprompt:${number}`;
    } else {
      phoneNumber = `tel:${number}`;
    }
    // Linking.openURL(phoneNumber);

    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          Alert.alert('이 기계에서는 전화를 걸수 없습니다.');
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.log(err));
  };
  //--------------------------------------------------------------------------------------------------
  arrSearch = (nameKey, myArray) => {
    for (var i = 0; i < myArray.length; i++) {
      if (myArray[i].name === nameKey) {
        return myArray[i];
      }
    }
  };

  loadingView() {
    return (
      <View style={{flex: 1, padding: 20}}>
        <ActivityIndicator />
      </View>
    );
  }

  //오브젝트 카피
  obClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;

    var copy = obj.constructor();

    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = this.obClone(obj[attr]);
      }
    }

    return copy;
  };

  telinput = (text) => {
    return text
      .replace(/[^0-9]/g, '')
      .replace(
        /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
        '$1-$2-$3',
      )
      .replace('--', '-');
  };

  birthinput = (text) => {
    return text
      .replace(/[^0-9]/g, '')
      .replace(/(\d{4})(\d{2})(\d{2})/g, '$1-$2-$3')
      .replace('--', '-');
  };

  //--------------------------------------------------------------------------------------------------
}

export function NodataView({style, msg}) {
  let viewStyle = {
    height: 45,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  };
  if (style) viewStyle = {...viewStyle, ...style};

  let newMsg = msg ? msg : '데이터가 없습니다.';

  return (
    <View style={viewStyle}>
      <Text
        style={{
          fontSize: 14,
          color: '#666',
          fontFamily: 'Pretendard-Regular',
        }}>
        {newMsg}
      </Text>
    </View>
  );
}

export function Loaders(props) {
  const [views, setViews] = React.useState(props.views);
  let whiteBack = 'transparent';
  if (props.backColor) {
    if (props.backColor == 'white') whiteBack = 'white';
    else whiteBack = 'rgba(0,0,0,0.3)';
  }

  React.useEffect(() => {
    setViews(props.views);
  }, [props.views]);

  return (
    //<Modal transparent={true} animationType={'none'} visible={views}>
    views ? (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flex: 1,
          // top: hp('45%'),
          // left: wp('50%') - 30,
          flexDirection: 'column',
          alignContent: 'stretch',
          // backgroundColor: 'rgba(0,0,0,0.3)',

          backgroundColor: whiteBack,
          alignItems: 'center',
          justifyContent: 'center',
          // width: 35,
          // height: 40,
          zIndex: 2,
        }}>
        <View
          style={{
            backgroundColor: 'transparent',
            padding: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              console.log('loader close');
              setViews(false);
            }}>
            <ActivityIndicator
              animating={true}
              size="large"
              // color={'#0073D0'}
            />
          </TouchableOpacity>
        </View>
      </View>
    ) : null
    //</Modal>
  );
}

export default Api = new Api();
