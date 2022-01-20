import React, {Component} from 'react';
import {
  Alert,
  LayoutAnimation,
  StyleSheet,
  View,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
  TouchableWithoutFeedback,
  ListView,
} from 'react-native';
import {colors, mystyle} from '../utils/Styles';
import {ICO_ARRV_ON, ICO_ARRV_OFF} from '../utils/Icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '../shared/Text';

import {Card, CardItem, Left, Right} from 'native-base';
//import Dialog from './Dialog';

class Expandable_ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      layout_Height: 0,
      AccordionData: new Array(),
    };

    console.log('Expandable_ListView->AccordionData', this.props);
  }

  //컴포넌트의 변화를 감지함
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(
    //   'componentWillReceiveProps',
    //   this.state.item.cca_id,
    //   nextProps.item.expanded,
    // );

    let setObj = {};

    if (nextProps.item.expanded) {
      setObj.layout_Height = null;
      this.setState(() => {
        return setObj;
      });
    } else {
      setObj.layout_Height = 0;
      this.setState(() => {
        return setObj;
      });
    }
  }

  render() {
    const rowItem = this.state.item;

    return (
      <View pointerEvents="box-none" key={'rowItem_' + rowItem.idx}>
        <TouchableWithoutFeedback
          activeOpacity={0.5}
          onPress={this.props.onClickFunction}>
          <View style={styles.rowFront}>
            <View
              style={{
                width: 30,
                position: 'absolute',
                top: 22,
                right: 10,
                justifyContent: 'center',
              }}>
              {rowItem.expanded ? (
                <Image source={ICO_ARRV_OFF} style={{width: 25, height: 25}} />
              ) : (
                <Image source={ICO_ARRV_ON} style={{width: 25, height: 25}} />
              )}
            </View>

            <View style={styles.rowTextBox}>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#EBEBEB',
                  paddingVertical: 13,
                }}>
                <View style={[styles.rowTextBoxFullBox, {paddingRight: 60}]}>
                  <Text
                    style={{fontSize: 16, lineHeight: 24, fontWeight: 'bold'}}>
                    {rowItem.nt_title}
                  </Text>
                </View>
                <View style={styles.rowTextBoxFullBox}>
                  <Text
                    style={{fontSize: 12, lineHeight: 18, color: '#B6B6B6'}}>
                    {rowItem.nt_wdate_str}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#F8F8F8',
                  height: this.state.layout_Height,
                  overflow: 'hidden',
                }}
                pointerEvents="none">
                <View
                  style={{
                    padding: 16,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text style={styles.rowTextBoxFullText}>
                    {rowItem.nt_content}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.state = {
      AccordionData: [...this.props.dataSource],
      _writeSelected: this.props.writeSelected,
    };
  }

  //컴포넌트의 변화를 감지함
  UNSAFE_componentWillReceiveProps(nextProps) {
    //console.log('::::componentWillReceiveProps', nextProps);

    //console.log('__writeSelected', nextProps._writeSelected);

    this.setState({
      AccordionData: [...nextProps.dataSource],
      _writeSelected: nextProps._writeSelected,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  update_Layout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = [...this.state.AccordionData];

    array[index].expanded = !array[index].expanded;

    //this.props._click(array[index]);

    this.setState(() => {
      return {
        AccordionData: array,
      };
    });
  };

  render() {
    return (
      <View pointerEvents="box-none" style={styles.workSwipeList}>
        {this.state.AccordionData.length
          ? this.state.AccordionData.map((row, key) => (
              <Expandable_ListView
                key={row.idx}
                pkey={row.idx}
                onClickFunction={this.update_Layout.bind(this, key)}
                item={row}
                _edit={this.props._edit}
                _write={this.props._write}
                _delete={this.props._delete}
                _click={this.props._click}
                mode={this.props.mode}
                _writeSelected={this.state._writeSelected}
              />
            ))
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  workSwipeList: {
    // flex: 1,
    flexDirection: 'column',
    // borderTopColor: colors.lineColor,
    // borderTopWidth: 1,
  },
  rowFront: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
    // borderBottomColor: colors.lineColor,
    // borderBottomWidth: 1,
    //paddingVertical: 10,
    //paddingHorizontal: 10,
  },
  bullet: {
    marginLeft: 15,
    width: 15,
    height: 15,
    borderRadius: 15 / 2,
    borderColor: colors.lineColor,
    borderWidth: 1,
  },
  rowTextBox: {
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  rowTextBoxTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingVertical: 5,
    paddingLeft: 0,
  },
  //rowTextBoxBottom: { flex:1, flexDirection: 'row', justifyContent: 'space-around', paddingLeft:10 },

  rowTextBoxLeftBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rowTextBoxFullBox: {
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  rowTextBoxLeftText: {
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  rowTextBoxFullText: {
    color: colors.textColor,
    lineHeight: 16,
    fontSize: 14,
  },
  rowTextBoxRightBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  rowTextBoxRightText: {
    //marginLeft: 15,
    marginRight: 30,
    // lineHeight: 15,
    textAlign: 'right',
    fontSize: mystyle.defFontSize,
    color: colors.textColor,
    //color: colors.lineColor,
  },

  MainContainer: {
    // flex: 1,
    // justifyContent: 'center',
    //paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    // backgroundColor: '#F5FCFF',
  },

  /* 다이얼로그 */
  dialog: {
    width: 250,
    height: 200,
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  dialogItem: {padding: 20, fontSize: 20},
});
