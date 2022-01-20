import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Icon,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  IC_FOOT_PLUS,
  IC_FOOT_HOME,
  IC_FOOT_SEARCH,
  IC_FOOT_01,
  IC_FOOT_02,
  IC_FOOT_03,
} from '../utils/Icons';
import {colors, mystyle} from '../utils/Styles';

export default class NodataView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const msg = this.props.msg ? this.props.msg : '데이터가 없습니다.';

    return (
      <View
        style={[
          styles.container,
          this.props.mystyle ? this.props.mystyle : null,
        ]}>
        <Text style={styles.Text}>{msg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    // borderBottomColor: colors.lineColor,
    // borderBottomWidth: 1,

    // borderTopColor: colors.lineColor,
    // borderTopWidth: 1,

    //justifyContent: 'space-around',
    paddingVertical: 20,
  },

  Text: {
    //fontSize: 20,
    textAlign: 'center',
    flex: 1,
    color: colors.textColor,
    fontSize: mystyle.defFontSize,

    // color: 'white',
  },
});
