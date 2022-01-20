import React, {Component} from 'react';
import {
  Alert,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
  TouchableWithoutFeedback,
  ListView,
} from 'react-native';
import {colors, mystyle} from '../utils/Styles';
import {IC_ARROW_UP, IC_ARROW_DOWN} from '../utils/Icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Card, CardItem, Left, Right} from 'native-base';
import Dialog from './Dialog';

/*

array = 
	[
		{			
			"cca_id": "15",
			"cp_idx": "1",
			"cca_value": "금형실",
			"cca_parent": "2",
			"cca_order": "999",
			"cca_step": "2",
			"ins_dt": "2020-03-03 18:28:25",
			"del_flag": "N",
			"child_cnt": "2",
			"work_cnt": "0",
			"items": [{
				"cca_id": "22",
				"cp_idx": "1",
				"cca_value": "TEST",
				"cca_parent": "15",
				"cca_order": "999",
				"cca_step": "3",
				"ins_dt": "2020-03-04 16:00:39",
				"del_flag": "N",
				"child_cnt": "1",
				"work_cnt": "0",
				"items": [{
					"cca_id": "24",
					"cp_idx": "1",
					"cca_value": "TEST1-1",
					"cca_parent": "22",
					"cca_order": "999",
					"cca_step": "4",
					"ins_dt": "2020-03-04 19:24:03",
					"del_flag": "N",
					"child_cnt": "1",
					"work_cnt": "0",
					"items": [{
						"cca_id": "25",
						"cp_idx": "1",
						"cca_value": "TEST1-1-1",
						"cca_parent": "24",
						"cca_order": "999",
						"cca_step": "5",
						"ins_dt": "2020-03-05 13:52:52",
						"del_flag": "N",
						"child_cnt": "0",
						"work_cnt": "0"
					}]
				}]
			}, {
				"cca_id": "23",
				"cp_idx": "1",
				"cca_value": "TEST2",
				"cca_parent": "15",
				"cca_order": "999",
				"cca_step": "3",
				"ins_dt": "2020-03-04 17:55:04",
				"del_flag": "N",
				"child_cnt": "0",
				"work_cnt": "0",
				"items": []
			}]
		}, {
			"cca_id": "16",
			"cp_idx": "1",
			"cca_value": "공작실",
			"cca_parent": "2",
			"cca_order": "999",
			"cca_step": "2",
			"ins_dt": "2020-03-03 18:30:01",
			"del_flag": "N",
			"child_cnt": "1",
			"work_cnt": "0",
			"items": [{
				"cca_id": "26",
				"cp_idx": "1",
				"cca_value": "공작실 1번",
				"cca_parent": "16",
				"cca_order": "999",
				"cca_step": "3",
				"ins_dt": "2020-03-05 16:39:46",
				"del_flag": "N",
				"child_cnt": "0",
				"work_cnt": "0",
				"items": []
			}]
		}]
	]
    
*/

class Expandable_ListView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: this.props.item,
      layout_Height: 120,
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
      setObj.layout_Height = 120;
      this.setState(() => {
        return setObj;
      });
    }
  }

  RowContent = function({keys, name, value}) {
    return (
      <View style={styles.rowTextBoxTop} key={keys} pointerEvents="none">
        <View style={styles.rowTextBoxLeftBox}>
          <Text style={styles.rowTextBoxLeftText}>{name}</Text>
        </View>
        <View style={styles.rowTextBoxRightBox}>
          <Text style={styles.rowTextBoxRightText}>{value}</Text>
        </View>
      </View>
    );
  };

  render() {
    const rowItem = this.state.item;

    return (
      <View
        pointerEvents="box-none"
        style={{
          borderBottomColor: colors.lineColor,
          borderBottomWidth: mystyle.borderWidth,
          height: this.state.layout_Height,
          overflow: 'hidden',
        }}>
        <TouchableWithoutFeedback
          activeOpacity={0.5}
          onPress={this.props.onClickFunction}>
          <View style={styles.rowFront}>
            <View
              style={{
                width: 30,
                position: 'absolute',
                bottom: rowItem.expanded ? 10 : null,
                top: rowItem.expanded ? null : 85,
                right: 10,
                justifyContent: 'center',
              }}>
              {rowItem.expanded ? (
                <Image source={IC_ARROW_UP} style={{width: 25, height: 25}} />
              ) : (
                <Image source={IC_ARROW_DOWN} style={{width: 25, height: 25}} />
              )}
            </View>

            <View style={styles.rowTextBox}>
              <View style={styles.rowTextBoxTop}>
                <Text>{rowItem.wo_set_dt_str}</Text>
              </View>
              <View style={styles.rowTextBoxTop}>
                <View style={styles.rowTextBoxLeftBox}>
                  <Text style={styles.rowTextBoxLeftText}>작업명</Text>
                </View>
                <View style={styles.rowTextBoxRightBox}>
                  <Text style={styles.rowTextBoxRightText}>
                    {rowItem.wo_name}
                  </Text>
                </View>
              </View>
              <View style={styles.rowTextBoxTop}>
                <View style={styles.rowTextBoxLeftBox}>
                  <Text style={styles.rowTextBoxLeftText}>작업번호</Text>
                </View>
                <View style={styles.rowTextBoxRightBox}>
                  <Text style={styles.rowTextBoxRightText}>
                    {rowItem.wo_code}
                  </Text>
                </View>
              </View>

              {/* {RowContent(
                rowItem.wo_idx + '_0',
                '해쉬태그',
                rowItem.wo_hashtag,
              )}
              {RowContent(
                rowItem.wo_idx + '_1',
                '담당자',
                rowItem.wo_workers_nm_all,
              )} */}
              <this.RowContent
                keys={rowItem.wo_idx + '_0'}
                name="해쉬태그"
                value={rowItem.wo_hashtag}
              />

              <View style={styles.rowTextBoxTop}>
                <View style={styles.rowTextBoxLeftBox}>
                  <Text style={styles.rowTextBoxLeftText}>관련자산</Text>
                </View>
                <View style={styles.rowTextBoxRightBox}>
                  <Text style={styles.rowTextBoxRightText}>
                    {rowItem.cate_no_nm}
                  </Text>
                </View>
              </View>

              <this.RowContent
                keys={rowItem.wo_idx + '_1'}
                name="담당자"
                value={rowItem.wo_workers_nm}
              />
              <this.RowContent
                keys={rowItem.wo_idx + '_2'}
                name="납기일"
                value={rowItem.wo_set_dt_str}
              />
              <this.RowContent
                keys={rowItem.wo_idx + '_3'}
                name="위치"
                value={rowItem.as_location_nm}
              />
              <this.RowContent
                keys={rowItem.wo_idx + '_4'}
                name="예상작업시간"
                value={rowItem.wo_time_str}
              />
              <this.RowContent
                keys={rowItem.wo_idx + '_5'}
                name="작업내용 "
                value={rowItem.wo_memo}
              />
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

  update_Layout = index => {
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
                key={row.wo_idx}
                pkey={row.wo_idx}
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
    paddingHorizontal: 10,
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
    alignContent: 'flex-start',
    paddingHorizontal: 10,
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
    width: '40%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  rowTextBoxLeftText: {
    textAlign: 'left',
    fontSize: mystyle.defFontSize,
    paddingLeft: 0,
    fontWeight: 'bold',
  },
  rowTextBoxRightBox: {
    width: '60%',
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
