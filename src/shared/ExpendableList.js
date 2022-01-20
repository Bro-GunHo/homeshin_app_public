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
import {IC_ARROW_M, IC_ARROW_R} from '../utils/Icons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Card, CardItem, Left, Right} from 'native-base';
import Dialog from '../shared/Dialog';

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

    //(this.props.item.items && this.props.item.items.length)?[this.props.item.items]:new Array()

    this.state = {
      item: this.props.item,
      layout_Height: 0,
      AccordionData:
        this.props.item.items && this.props.item.items.length
          ? this.props.item.items
          : new Array(),
      dialogVisible: false,
      _writeSelected: this.props._writeSelected,
    };

    //console.log('Expandable_ListView->AccordionData', this.props);
  }

  //컴포넌트의 변화를 감지함
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(
    //   'componentWillReceiveProps',
    //   this.state.item.cca_id,
    //   nextProps.item.expanded,
    // );

    let setObj = {};
    if (nextProps._writeSelected != this.state._writeSelected) {
      setObj._writeSelected = nextProps._writeSelected;
    }

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

    //console.log('_writeSelected', nextProps._writeSelected);
  }

  //재 랜더링 여부를 결정
  shouldComponentUpdate(nextProps, nextState) {
    //console.log('shouldComponentUpdate', nextProps);

    // console.log(
    //   'shouldComponentUpdate',
    //   this.state.item.cca_id,
    //   nextState,
    //   this.state.layout_Height,
    //   nextState.layout_Height,
    // );

    return true;

    // if (this.state.layout_Height !== nextState.layout_Height) {
    // 	console.log('open', this.state.item);
    //   return true;
    // }
    // return false;
  }

  show_Selected_Category = item => {
    // Write your code here which you want to execute on sub category selection.
    Alert.alert(item);
  };

  update_Layout = (index, step) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    //console.log(step, this.state.AccordionData);

    const array = [...this.state.AccordionData];

    array[index]['expanded'] = !array[index]['expanded'];

    this.props._click(array[index]);

    this.setState(() => {
      return {
        AccordionData: array,
      };
    });
  };

  _dialog = (cca_id, cca_value) => {
    this.setState({dialogVisible: true});
  };

  _dialogClose = () => {
    this.setState({dialogVisible: false});
  };

  render() {
    const rowItem = this.state.item;

    return (
      <View
        pointerEvents="box-none"
        style={
          rowItem.cca_step == 1
            ? {
                //marginLeft: 50,
                marginVertical: 1,
                borderBottomColor: colors.lineColor,
                borderBottomWidth: mystyle.borderWidth,
              }
            : null
        }>
        <View style={styles.rowFront} pointerEvents="box-none">
          <View style={[styles.rowTextBox]} pointerEvents="box-none">
            <View
              style={[
                styles.rowTextBoxTop,
                rowItem.cca_step == 1
                  ? {paddingVertical: 15}
                  : {paddingVertical: 0},
              ]}
              pointerEvents="box-none">
              <View
                style={[
                  styles.rowTextBoxLeftBox,
                  {paddingLeft: 20 * (rowItem.cca_step - 1)},
                ]}
                pointerEvents="box-none">
                <View
                  style={{
                    width: 60,
                    height: '100%',
                    // backgroundColor: 'red',
                  }}>
                  {/* <Icon name={(rowItem.expanded)?'chevron-down':'chevron-right'} color={colors.lineColor} /> */}

                  <TouchableWithoutFeedback
                    onPress={() => this.props.onClickFunction()}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginLeft: 15,
                      }}
                      pointerEvents="box-only">
                      {this.state.AccordionData.length ? (
                        rowItem.expanded ? (
                          <Image
                            source={IC_ARROW_M}
                            style={{width: 17, height: 17}}
                          />
                        ) : (
                          <Image
                            source={IC_ARROW_R}
                            style={{width: 17, height: 17}}
                          />
                        )
                      ) : null}
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{flex: 1}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.mode != 'select'
                        ? this.props._edit(rowItem)
                        : this.props.onClickFunction()
                    }>
                    <Text
                      style={[
                        styles.rowTextBoxLeftText,
                        rowItem.cca_step == 1 ? {fontWeight: 'bold'} : null,
                        this.state._writeSelected == rowItem.cca_id
                          ? {color: colors.dodgerBlue}
                          : null,
                      ]}>
                      {rowItem.cca_value}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.rowTextBoxRightBox}>
                {
                  //등록일때만 수정버튼 보여줌 -> 수정버튼 삭제
                  //this.props.mode == 'write' ? (
                  /*
                  this.props.mode == 'write123123' ? (
                    <View>
                      <TouchableOpacity
                        style={{
                          width: 30,
                          height: 20,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        onPress={() =>
                          this._dialog(rowItem.cca_id, rowItem.cca_value)
                        }>
                        <Icon name="ellipsis-v" color={colors.lineColor} />
                      </TouchableOpacity>
                      <Dialog
                        visible={this.state.dialogVisible}
                        close={() => this.setState({dialogVisible: false})}
                        dialogTitle={rowItem.cca_value}
                        content={
                          <View style={styles.dialog}>
                            <View style={styles.dialogItem}>
                              <TouchableOpacity
                                onPress={() => {
                                  this._dialogClose();
                                  this.props._write(rowItem);
                                }}>
                                <Text>하위자산 등록</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.dialogItem}>
                              <TouchableOpacity
                                onPress={() => {
                                  this._dialogClose();
                                  this.props._edit(rowItem);
                                }}>
                                <Text>자산 수정</Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.dialogItem}>
                              <TouchableOpacity
                                onPress={() => {
                                  this._dialogClose();
                                  this.props._delete(rowItem);
                                }}>
                                <Text>자산 삭제</Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        }
                      />
                    </View>
                  ) : null
                      */
                }

                {rowItem.cca_step == 1 ? (
                  <Text style={styles.rowTextBoxRightText}>
                    {rowItem.child_cnt ? rowItem.child_cnt : 0}
                  </Text>
                ) : rowItem.work_color === null || rowItem.work_color == '0' ? (
                  <View style={styles.nobullet} />
                ) : (
                  <View style={styles['bullet' + rowItem.work_color]}>
                    <View style={styles['bulletIn' + rowItem.work_color]} />
                  </View>
                )}
                {/*
                    (rowItem.cca_step >2)?  
                    (<View style={styles.bullet} ></View>):
                    (<Text style={styles.rowTextBoxRightText}>{rowItem.work_cnt}</Text>)
                    */}
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            height: this.state.layout_Height,
            overflow: 'hidden',
            paddingLeft: 10,
          }}
          pointerEvents="box-none">
          {this.state.AccordionData.length
            ? this.state.AccordionData.map((row, key) => (
                <Expandable_ListView
                  key={row.cca_id}
                  pkey={row.cca_id}
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

    this.props._click(array[index]);

    this.setState(() => {
      return {
        AccordionData: array,
      };
    });
  };

  render() {
    return (
      <View pointerEvents="box-none">
        {this.state.AccordionData.length
          ? this.state.AccordionData.map((row, key) => (
              <Expandable_ListView
                key={row.cca_id}
                pkey={row.cca_id}
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
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    borderTopColor: colors.lineColor,
    borderTopWidth: mystyle.borderWidth,
  },
  rowFront: {
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    // borderBottomColor: colors.lineColor,
    // borderBottomWidth: 1,
    //justifyContent: 'space-around',
    paddingVertical: 10,
    //paddingHorizontal: 0,
    paddingRight: 20,
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
    flex: 1,
    flexDirection: 'column',
    alignContent: 'space-around',
    paddingHorizontal: 0,
    width: '100%',
  },
  rowTextBoxTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingVertical: 10,
    paddingLeft: 0,
  },
  //rowTextBoxBottom: { flex:1, flexDirection: 'row', justifyContent: 'space-around', paddingLeft:10 },
  rowTextBoxLeftBox: {
    //marginLeft: -50,
    // width: '60%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  rowTextBoxLeftText: {
    textAlign: 'left',
    fontSize: mystyle.defFontSize,
    paddingLeft: 0,
    color: colors.textColor,
  },
  rowTextBoxRightBox: {
    // width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rowTextBoxRightText: {
    marginLeft: 15,
    width: 40,
    height: 18,
    lineHeight: 18,
    textAlign: 'right',
    fontSize: mystyle.defFontSize,
    color: colors.textColor,
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
  dialogItem: {padding: 20, fontSize: mystyle.defFontSize},

  nobullet: {
    width: 14,
    height: 14,
  },

  bullet0: {
    //marginLeft: 15,
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    borderColor: colors.Bullet4,
    borderWidth: 1,
  },

  bullet1: {
    //marginLeft: 15,
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    borderColor: colors.Bullet1,
    borderWidth: 1,
  },
  bullet2: {
    //marginLeft: 15,
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    borderColor: colors.Bullet2,
    borderWidth: 1,
  },
  bullet3: {
    //marginLeft: 15,
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    borderColor: colors.Bullet3,
    borderWidth: 1,
  },
  bullet4: {
    //marginLeft: 15,
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    borderColor: colors.Bullet4,
    borderWidth: 1,
  },

  bulletIn0: {
    margin: 2,
    width: 8,
    height: 8,
    borderRadius: 9 / 2,
    borderColor: colors.Bullet4,
    backgroundColor: colors.Bullet0,
    borderWidth: 1,
  },

  bulletIn1: {
    margin: 2,
    width: 8,
    height: 8,
    borderRadius: 9 / 2,
    borderColor: colors.Bullet1,
    backgroundColor: colors.Bullet1,
    borderWidth: 1,
  },
  bulletIn2: {
    margin: 2,
    width: 8,
    height: 8,
    borderRadius: 9 / 2,
    borderColor: colors.Bullet2,
    backgroundColor: colors.Bullet2,
    borderWidth: 1,
  },
  bulletIn3: {
    margin: 2,
    width: 8,
    height: 8,
    borderRadius: 9 / 2,
    borderColor: colors.Bullet3,
    backgroundColor: colors.Bullet3,
    borderWidth: 1,
  },
  bulletIn4: {
    margin: 2,
    width: 8,
    height: 8,
    borderRadius: 9 / 2,
    borderColor: colors.Bullet4,
    backgroundColor: colors.Bullet4,
    borderWidth: 1,
  },
});
