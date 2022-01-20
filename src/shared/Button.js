// @flow
import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  //Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import {colors, mystyle} from '../utils/Styles';
import Text from '../shared/Text';

type Props = {
  containerStyle?: ViewStyle,
  disabledStyle?: ViewStyle,
  isLoading?: boolean,
  isDisabled?: boolean,
  style?: ViewStyle,
  textStyle?: TextStyle,
  imgLeftStyle?: ImageStyle,
  indicatorColor?: string,
  children?: string,
  onPress?: () => void,
  imgLeftSrc?: any,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  btnLogin: {
    backgroundColor: colors.sucessBtnColor,
    borderColor: colors.sucessBtnColor,
    borderWidth: 0.5,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtLogin: {
    fontSize: mystyle.btnFontSize,
    color: 'white',
    fontFamily: mystyle.font,
  },

  btnDefault: {
    backgroundColor: 'transparent',
    borderColor: colors.sucessBtnColor,
    borderRadius: 7,
    borderWidth: 1,
    height: 44,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtDefault: {
    fontSize: mystyle.btnFontSize,
    //fontWeight: 'bold',
    color: colors.sucessBtnColor,
    fontFamily: mystyle.font,
  },

  btnFit: {
    backgroundColor: 'transparent',
    borderColor: colors.fitColor,
    borderRadius: 7,
    borderWidth: 0.5,
    height: 45,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtFit: {
    fontSize: mystyle.btnFontSize,
    //fontWeight: 'bold',
    color: colors.fitColor,
    fontFamily: mystyle.font,
  },

  btnFitOn: {
    backgroundColor: colors.fitColor,
    borderColor: colors.fitColor,
    borderRadius: 7,
    borderWidth: 0.5,
    height: 45,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtFitOn: {
    fontSize: mystyle.btnFontSize,
    //fontWeight: 'bold',
    color: 'white',
    fontFamily: mystyle.font,
  },

  btnDefaultOn: {
    backgroundColor: colors.sucessBtnColor,
    borderColor: colors.sucessBtnColor,
    borderRadius: 7,
    borderWidth: 0.5,
    height: 45,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtDefaultOn: {
    fontSize: mystyle.btnFontSize,
    //fontWeight: 'bold',
    color: 'white',
    fontFamily: mystyle.font,
  },

  btn: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderWidth: 0.5,
    width: '100%',
    height: 45,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnDisabled: {
    backgroundColor: 'rgb(205,205,205)',
    borderColor: colors.lineColor,
    borderRadius: 7,
    borderWidth: 1,
    height: 45,
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  txt: {
    fontSize: mystyle.defFontSize,
    color: 'white',
  },
  imgLeft: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 16,
  },
});

export default class Shared extends Component<Props> {
  static defaultProps = {
    containerStyle: styles.container,
    isLoading: false,
    isDisabled: false,
    style: {},
    textStyle: {},
    imgLeftStyle: styles.imgLeft,
    indicatorColor: 'white',
    disabledStyle: {},
    styleType: 0,
  };

  constructor(props) {
    super(props);

    if (this.props.styleType == 1) {
      //파랑색
      this.btnStyle = {...styles.btnFit, ...this.props.style};
      this.txtStyle = {...styles.txtFit, ...this.props.textStyle};
    } else if (this.props.styleType == 11) {
      this.btnStyle = {...styles.btnFitOn, ...this.props.style};
      this.txtStyle = {...styles.txtFitOn, ...this.props.textStyle};
    } else if (this.props.styleType === 2) {
      this.btnStyle = {...styles.btnLogin, ...this.props.style};
      this.txtStyle = {...styles.txtLogin, ...this.props.textStyle};
    } else if (this.props.styleType === 22) {
      this.btnStyle = {...styles.btnDefaultOn, ...this.props.style};
      this.txtStyle = {...styles.txtDefaultOn, ...this.props.textStyle};
    } else {
      //보라색
      this.btnStyle = {...styles.btnDefault, ...this.props.style};
      this.txtStyle = {...styles.txtDefault, ...this.props.textStyle};
    }

    this.disabledStyle = {...styles.btnDisabled, ...this.props.style};
  }

  UNSAFE_componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate() {
    return true;
  }

  render() {
    if (this.props.isDisabled) {
      return (
        <View style={this.props.containerStyle}>
          <View style={this.disabledStyle}>
            <Text style={this.props.textStyle}>{this.props.children}</Text>
          </View>
        </View>
      );
    }
    if (this.props.isLoading) {
      return (
        <View style={this.props.containerStyle}>
          <View style={this.btnStyle}>
            <ActivityIndicator size="small" color={this.props.indicatorColor} />
          </View>
        </View>
      );
    }
    return (
      <View style={this.props.containerStyle} pointerEvents="box-none">
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={this.btnStyle}>
            {this.props.imgLeftStyle ? (
              <Image
                style={this.props.imgLeftStyle}
                source={this.props.imgLeftSrc}
              />
            ) : (
              <View />
            )}
            <Text style={this.txtStyle}>{this.props.children}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
