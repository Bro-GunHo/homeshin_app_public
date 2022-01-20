import {PixelRatio} from 'react-native';
import {
  FontPretendardBold,
  FontPretendardRegular,
  FontPretendardLight,
  FontPretendardMedium,
  FontPretendardSemiBold,
} from '~/style/Font';

export const colors = {
  dodgerBlue: 'rgb(58,139,255)',
  dusk: 'rgb(65,77,107)',
  cloudyBlue: 'rgb(175,194,219)',
  blueyGray: 'rgb(134,154,183)',
  paleGray: 'rgb(233,237,244)',

  background: '#ffffff',
  gray: '#5A5A5A',
  //textColorTitle: '#700019' /* 나의 업무 */,
  textColorTitle: '#5057E8',
  textColor: '#5d5d5d',
  lineColor:
    '#F5F5F5' /* 선색상, 백그라운드선일때 아랫꺼와 같이 사용. (6길이짜리) */,
  lineTopColor: '#E9E9E9' /* 백그라운드용 라인 */,
  TextColorBold: '#000',
  TextColorDisabled: '#c2c2c2',
  ChartColor: '#7799ff' /* 차트 */,
  ChartLine: '#979797',
  HeadBackground: '#f0f0f0', //헤더백그라운드칼라
  HeadBackgroundText: '#616161', //헤더글자색
  labelColor: '#a3a3a3', //인풋라벨칼라

  sucessBtnColor: '#974DF0', //#444444
  cancelBtnColor: 'white',
  inputBorderColor: '#d5dbd9', //200430 old:#6d7278

  mainColor: '#974DF0',
  fitColor: '#5B68E4',
  scheduleColor: '#6444E8',

  backColor: 'white', //열리는리스트 백 그라운드칼라
};
export const fonts = {
  font1: {
    // regular: 'NotoSansCJKkr-Regular',
    // bold: 'NotoSansCJKkr-Bold',
    // bolder: 'NotoSansCJKkr-Black',
    // thin: 'NotoSansCJKkr-Thin',
    regular: FontPretendardRegular,
    bold: FontPretendardSemiBold,
    bolder: FontPretendardSemiBold,
    thin: FontPretendardLight,
  },

  font2: {
    regular: 'Poppins-Regular',
    bold: 'Popins-Bold',
    bolder: 'Poppins-ExtraBold',
  },
};

export const mystyle = {
  borderWidth: 0.5,
  defFontSize: 15, //기본폰트 크기
  defFontSize2: 18, //중간폰트 크기
  minFontSize: 13, //작은크기
  bigFontSize: 29,
  pickerItemText: {
    fontSize: 13,
  },
  btnFontSize: 16, //버튼폰트사이즈

  mainColor1: colors.sucessBtnColor,
  blackFont: '#000000',
  mainColor2: colors.fitColor,
  blackFont2: '#333333',

  font1: fonts.font1.regular,
  font2: fonts.font2.regular,

  placeholderTextColor: '#B5B5B5',

  editButtonText: {
    textAlign: 'right',
    paddingTop: 3,
    fontSize: 13,
    color: colors.textColor,
  },

  errLabel: {
    color: colors.sucessBtnColor,
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 11,
  },

  backLine: {
    width: '100%',
    height: 6,
    backgroundColor: colors.lineColor,
    borderTopWidth: 0.5,
    borderTopColor: '#D7D7D7',
  },

  sldPager: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    zIndex: 2,
    borderRadius: 20,
    //backgroundColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  sldPagerTxt: {color: '#afafaf', fontSize: 13, marginLeft: 2},
  container1: {flex: 1, alignItems: 'center', justifyContent: 'center'},
};
