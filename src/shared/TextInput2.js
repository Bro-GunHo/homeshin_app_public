// @flow
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {DatePicker, Picker, Form, Item} from 'native-base';
import {IC_PICK_ARROW_R} from '../utils/Icons';
import Icon from 'react-native-vector-icons/FontAwesome';

// 시간제어
import moment from 'moment';
import 'react-native-gesture-handler';
var esLocale = require('moment/locale/ko');
moment.locale('ko', esLocale);
moment.updateLocale('ko', {
  weekdays: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
});

import {colors, mystyle} from '../utils/Styles';

// const colors = {
//   background: '#e3e3e3',
//   dodgerBlue: 'rgb(58,139,255)',
//   dusk: 'rgb(65,77,107)',
//   cloudyBlue: 'rgb(175,194,219)',
//   blueyGray: 'rgb(134,154,183)',
//   paleGray: 'rgb(233,237,244)',
// };

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    color: colors.labelColor,
    fontSize: mystyle.defFontSize,
    paddingHorizontal: 3,
    paddingVertical: 0,
    marginTop: 0,
    letterSpacing: 3,
  },
  labelFocus: {
    color: colors.dodgerBlue,
    fontSize: mystyle.defFontSize,
    paddingHorizontal: 3,
    paddingVertical: 0,
    letterSpacing: 3,
  },

  bottomLine: {
    borderBottomWidth: mystyle.borderWidth,
    borderBottomColor: colors.inputBorderColor,
  },

  inputStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: mystyle.borderWidth,
    borderBottomColor: colors.inputBorderColor,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    marginTop: 0,
    // paddingVertical: 5,
    paddingBottom: 5,
    paddingTop: 0,
    paddingHorizontal: 5,
    fontSize: mystyle.defFontSize,
    color: '#5d5d5d',
  },
  inputFocus: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: mystyle.borderWidth,
    borderBottomColor: colors.dodgerBlue,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    marginTop: 0,
    paddingBottom: 5,
    paddingTop: 0,
    paddingHorizontal: 5,
    fontSize: mystyle.defFontSize,
    color: '#5d5d5d',
  },
  inputReadonlyStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: mystyle.borderWidth,
    borderBottomColor: 'white',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    marginTop: 0,
    // paddingVertical: 5,
    paddingBottom: 5,
    paddingTop: 0,
    paddingHorizontal: 5,
    fontSize: mystyle.defFontSize,
    color: '#5d5d5d',
  },

  input: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: mystyle.borderWidth,
    borderBottomColor: '#6d7278',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    marginTop: 0,
    paddingBottom: 5,
    paddingTop: 0,
    paddingHorizontal: 5,
    fontSize: mystyle.defFontSize,
    color: '#5d5d5d',
  },

  picker: {
    //color: colors.TextColorDisabled,
    color: '#5d5d5d',
    height: 40,
    paddingVertical: 5,
    marginLeft: -8,
    // paddingRight: 0,
    // fontSize: 5,
    width: undefined,
  },

  readonlyText: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: mystyle.borderWidth,
    borderBottomColor: 'white',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    marginTop: 4,
    marginBottom: 10,
    paddingTop: 0,
    paddingHorizontal: 6,
    fontSize: mystyle.defFontSize,
    color: '#5d5d5d',
  },
});

export default class Shared extends Component<Props, State> {
  static defaultProps = {
    txt: '',
    style: styles.wrapper,
    labelStyle: styles.label,
    labelStyleFocus: styles.labelFocus,
    readonly: false,
    inputFocus: styles.inputFocus,
    inputStyle: null,
    bottomLine: false,
    placeholderTextColor: colors.blueyGray,
    isPick: false /* 픽아이콘 */,
    isPicker: false /* 피커 */,
    isDate: false /* 달력 */,
    pickerItem: [],
    onTouch: () => {},
    textContentType: 'none',
    //날짜옵션들
    defaultDate: new Date(), //날짜형
    stringDate: null, //문자형
    keyboardType: 'default',

    itemStyle: null,

    neutralButtonLabel: null /* 데이트픽커 중립버튼 라벨 */,

    // minimumDate: moment(new Date()).add({year: -1}),
    // maximumDate: moment(new Date()).add({year: +1}),
    locale: 'ko',
    animationType: 'fade',
    androidMode: 'default',
    formatChosenDate: (date) => {
      var year = date.getFullYear(); //yyyy
      var month = 1 + date.getMonth(); //M
      month = month >= 10 ? month : '0' + month; //month 두자리로 저장
      var day = date.getDate(); //d
      day = day >= 10 ? day : '0' + day; //day 두자리로 저장
      return year + ' / ' + month + ' / ' + day;
    },
    dateMode: 'date',
    dateShow: false,
    onContentSizeChange: null,
  };

  constructor(props: Props) {
    super(props);

    // let stringDate = this.props.defaultDate
    //   ? moment(this.props.defaultDate).format('YYYY / MM / DD')
    //   : moment(new Date()).format('YYYY / MM / DD');

    this.state = {
      focused: false,
      readonly: this.props.readonly,
      pickerSelected: this.props.txt,

      //달력
      defaultDate: this.props.dates ? this.props.dates : new Date(),
      stringDate: this.props.txt,
      dateMode: this.props.dateMode,
      dateShow: this.props.dateShow,
    };

    if (this.props.isDate) {
      console.log(
        'this.props.dateMode',
        this.state.dateMode,
        this.props.txt,
        this.state.defaultDate,
        this.props.dates,
      );
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //console.log(nextProps, nextProps.isPicker, this.state.pickerSelected, nextProps.text);

    //읽기 상태변경
    if (nextProps.readonly !== this.state.readonly) {
      this.setState({readonly: nextProps.readonly});
    }

    //픽커 값 변경점
    if (nextProps.isPicker && nextProps.txt != this.state.pickerSelected) {
      //console.log(nextProps);
      this.setState({pickerSelected: nextProps.txt});
    }

    //달력값 입력되면 값 입력하고 닫기
    if (nextProps.isDate && typeof nextProps.txt != 'undefined') {
      // console.log(
      //   '++++++++',
      //   'nextProps.txt: ',
      //   nextProps.txt,
      //   'this.state.stringDate: ',
      //   this.state.stringDate,
      //   'dates: ',
      //   nextProps.dates,
      // );

      let yn = Platform.OS === 'ios';

      let defaultDate = nextProps.dates ? nextProps.dates : new Date();

      this.setState({
        defaultDate: defaultDate,
        stringDate: nextProps.txt,
        dateShow: yn,
      });
    }
  }

  pickerChange = (v) => {
    this.props.pickerChange(v);
  };

  pickerItems = () => {
    return this.props.pickerItem.map((row, i) => {
      //console.log('row', row);
      return <Picker.Item label={row.cd_nm} value={row.cd_c} key={i} />; //if you have a bunch of keys value pair
    });
  };

  // onDateChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || this.state.defaultDate;
  //   let yn = Platform.OS === 'ios';

  //   //console.log('yn', yn);
  //   console.log('selectedDate', selectedDate, yn);
  //   //let new_date = this.props.formatChosenDate(currentDate);

  //   //this.setState({dateShow: yn, defaultDate: selectedDate});

  //   this.setState({dateShow: yn});
  // };

  showMode = (currentMode) => {
    //setShow(true);
    //setMode(currentMode);
    //this.setState({dateMode: currentMode, dateShow: true});
    this.setState({dateShow: true});
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

  render() {
    return (
      <View style={[styles.wrapper, this.props.style]} pointerEvents="box-none">
        <Form style={{alignSelf: 'stretch'}}>
          {!!this.props.txtLabel ? (
            <Text
              style={
                this.state.focused
                  ? this.props.labelStyleFocus
                  : this.props.labelStyle
              }>
              {this.props.txtLabel}
            </Text>
          ) : null}

          <TextInput
            style={[
              this.state.readonly
                ? styles.inputReadonlyStyle
                : this.state.focused
                ? styles.inputFocus
                : styles.inputStyle,

              this.props.bottomLine ? styles.bottomLine : null, //바텀라인 고정(위치)

              this.props.inputStyle ? this.props.inputStyle : null,

              //styles.input,
            ]}
            multiline={this.props.multiline}
            onChangeText={this.props.onTextChanged}
            value={this.props.txt}
            onFocus={() => {
              this.props.onTouch();
              this.setState({focused: true});
            }}
            onBlur={() => this.setState({focused: false})}
            placeholder={this.props.txtHint}
            placeholderTextColor={this.props.placeholderTextColor}
            secureTextEntry={this.props.isPassword}
            keyboardType={this.props.keyboardType}
            maxLength={!!this.props.maxLength ? this.props.maxLength : 9999999}
            textContentType={this.props.textContentType}
            editable={!!this.state.readonly ? false : true}
            onContentSizeChange={this.props.onContentSizeChange}
          />
        </Form>
      </View>
    );
  }
}
