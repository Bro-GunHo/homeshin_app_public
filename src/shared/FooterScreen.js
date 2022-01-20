import React, {Component} from 'react';
import {
  View,
  //Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
  Icon,
  Toast,
} from 'native-base';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ActionButton from 'react-native-circular-action-menu';

import QrcodeScan from '../shared/QrcodeScan';
import Api from '../models/Api';

import {
  IC_FOOT_PLUS,
  IC_FOOT_HOME,
  IC_FOOT_SEARCH,
  IC_FOOT_01,
  IC_FOOT_02,
  IC_FOOT_03,
} from '../utils/Icons';
import {colors, mystyle} from '../utils/Styles';
//import Dialog from 'react-native-popup-dialog';

import Dialog from '../shared/Dialog';

export default class FooterScreen extends Component {
  constructor(props) {
    super(props);

    const {state, descriptors, navigation} = this.props;
    this.state = {
      active: false,
      anim: new Animated.Value(50),
      dialogVisible: false,
      dialogPopVisible: false,
      dialogPopVisibleUsed: false,
      qr_code: '',
      qr_code_assetData: {},
      isMemoReset: this.props.isMemoReset, //메모 화면 리셋해야되는지 확인, 함수가 들어있으면 함수 실행
    };
  }

  qrcodeSuccess = async (data) => {
    console.log('scan', data);

    //Toast.show({text: data});

    this.setState({dialogVisible: false, dialogPopVisibleUsed: false});

    const responseJson = await Api.send('proc_qrcode_view', {
      cp_idx: Api.state.cp_idx,
      mb_id: Api.state.mb_id,
      qr_code: data,
    });

    if (responseJson.result == 'Y') {
      //등록된게 있으면 바로 보냄
      let asset_data = responseJson.item.list[0].asset_data;

      if (responseJson.item.isUsed === true) {
        this.setState({
          dialogPopVisibleUsed: true,
          qr_code: data,
          qr_code_assetData: asset_data,
        });
      } else {
        this.setState({
          dialogPopVisible: true,
          qr_code: data,
          qr_code_assetData: asset_data,
        });
      }
    }
  };

  qrcodeOpen = () => {
    this.setState({dialogVisible: true});
  };

  popClose = () => {
    this.setState({dialogPopVisible: false, dialogPopVisibleUsed: false});
  };

  parnetBarButton() {
    if (this.state.active) {
      this.reset();
      return;
    }

    Animated.spring(this.state.anim, {
      toValue: 150,
      duration: 250,
    }).start();

    this.setState({active: true});
  }

  reset() {
    Animated.spring(this.state.anim, {
      toValue: 50,
      duration: 250,
    }).start();

    this.setState({active: false});
  }

  render() {
    return (
      <View>
        <Animated.View style={[styles.AnimView, {height: this.state.anim}]}>
          <View style={styles.container}>
            {/* // <Footer style={styles.container}>
        //   <FooterTab style={{backgroundColor: 'white' }}> */}
            <Button
              style={styles.buttonStyle}
              onPress={() => this.props.navigation.navigate('HOME')}>
              <Image source={IC_FOOT_HOME} style={{width: 30, height: 30}} />
            </Button>

            <Button style={styles.buttonStyle} />

            {/* <ActionButton  startDegree={-140} endDegree={-40}> */}

            {/* <Button >
            <Image source={IC_FOOT_PLUS} style={{width:30, height:30 }}/>
            </Button> */}

            <Button
              style={styles.buttonStyle}
              onPress={() =>
                this.props.navigation.navigate('SearchScreen', {
                  foreceReset: true,
                })
              }>
              <Image source={IC_FOOT_SEARCH} style={{width: 30, height: 30}} />
            </Button>

            {/* //   </FooterTab>
        // </Footer> */}
          </View>

          <ActionButton
            size={30}
            buttonColor="white"
            buttonTextColor="black"
            btnOutRange="white"
            btnOutRangeTxt="black"
            radius={80}
            outRangeScale={1}
            startDegree={-150}
            endDegree={-30}
            icon={
              <Image source={IC_FOOT_PLUS} style={{width: 30, height: 30}} />
            }
            autoInactive={true}
            parnetBarButton={this.parnetBarButton.bind(this)}
            parnetBarReset={this.reset.bind(this)}>
            <ActionButton.Item
              buttonColor="white"
              title="업무등록"
              onPress={() => {
                //console.log('!');
                //this.props.navigation.navigate('WorkListScreen');

                this.props.navigation.navigate('WorkWriteScreen', {
                  mode: 'write',
                  halfscreen: false,
                });
              }}
              size={45}>
              <Image source={IC_FOOT_01} style={styles.actionButtonIcon} />
            </ActionButton.Item>
            <ActionButton.Item
              buttonColor="white"
              title="QR코드"
              onPress={this.qrcodeOpen}
              size={45}>
              <Image source={IC_FOOT_02} style={styles.actionButtonIcon} />
            </ActionButton.Item>

            <ActionButton.Item
              buttonColor="white"
              title="에셋등록"
              onPress={() =>
                this.props.navigation.navigate('CategoryScreen', {
                  mode: 'select',
                  halfscreen: false,
                })
              }
              size={45}>
              <Image source={IC_FOOT_03} style={styles.actionButtonIcon} />
            </ActionButton.Item>
          </ActionButton>
        </Animated.View>

        <QrcodeScan
          visible={this.state.dialogVisible}
          close={() => this.setState({dialogVisible: false})}
          dialogTitle="QR Code 스캔하기"
          onSuccess={(datas) => this.qrcodeSuccess(datas.data)}
        />

        <Dialog
          visible={this.state.dialogPopVisible}
          dialogTitle="신규 QR Code 발견"
          width={0.9}
          close={this.popClose}
          content={
            <View
              style={{
                width: '100%',
                height: 'auto',
                paddingHorizontal: 5,
                paddingTop: 20,
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Button
                  success
                  style={{flex: 1, height: 70}}
                  onPress={() => {
                    this.props.navigation.navigate('CategoryScreen', {
                      mode: 'select',
                      halfscreen: false,
                      qr_code: this.state.qr_code,
                    });

                    this.setState({dialogPopVisible: false});
                  }}>
                  <Text style={{width: '100%', textAlign: 'center'}}>
                    신규등록
                  </Text>
                </Button>
                <View style={{width: '5%'}} />
                <Button
                  primary
                  style={{flex: 1, height: 70}}
                  onPress={() => {
                    this.props.navigation.navigate('CategoryScreen', {
                      mode: 'select',
                      halfscreen: false,
                      qr_code: this.state.qr_code,
                      qrLinkMode: true,
                      workModeAssetSelected: async (cca_id) => {
                        let responseJson = await Api.send(
                          'proc_qrcode_link_asset',
                          {
                            cca_id: cca_id,
                            qr_code: this.state.qr_code,
                            mb_id: Api.state.mb_id,
                            cp_idx: Api.state.cp_idx,
                          },
                        );

                        if (responseJson.result == 'Y') {
                          //수정으로 보냄
                          this.props.navigation.navigate('AssetWriteScreen', {
                            mode: 'edit',
                            cca_id: cca_id,
                            viewMode: 'view',
                          });
                        }
                      },
                    });

                    this.setState({dialogPopVisible: false});
                  }}>
                  <Text style={{width: '100%', textAlign: 'center'}}>
                    기존목록에서 연결
                  </Text>
                </Button>
              </View>
            </View>
          }
        />

        <Dialog
          visible={this.state.dialogPopVisibleUsed}
          dialogTitle="기존 QR Code 발견"
          width={0.9}
          close={this.popClose}
          content={
            <View
              style={{
                width: '100%',
                height: 'auto',
                paddingHorizontal: 5,
                paddingTop: 20,
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <Button
                  success
                  style={{flex: 1, height: 70}}
                  onPress={() => {
                    this.props.navigation.navigate('AssetWriteScreen', {
                      cca_parent: this.state.qr_code_assetData.cca_parent,
                      mode: 'edit',
                      cca_step: this.state.qr_code_assetData.cca_step,
                      cca_id: this.state.qr_code_assetData.cca_id,
                      viewMode: 'view',
                    });
                    this.setState({dialogPopVisibleUsed: false});
                  }}>
                  <Text style={{width: '100%', textAlign: 'center'}}>
                    연결된 자산으로 이동
                  </Text>
                </Button>
                <View style={{width: '5%'}} />
                <Button
                  primary
                  style={{flex: 1, height: 70}}
                  onPress={async () => {
                    let responseJson = await Api.send('proc_memo_write', {
                      mb_id: Api.state.mb_id,
                      cp_idx: Api.state.cp_idx,
                      type: 'qrcode',
                      cca_id: this.state.qr_code_assetData.cca_id,
                    });

                    if (responseJson.result == 'Y') {
                      Toast.show({text: '기록되었습니다.'});

                      console.log('isMemoReset', this.props.isMemoReset); //메모화면 보고있을때 존재하는 리셋함수
                      if (typeof this.state.isMemoReset == 'function') {
                        this.state.isMemoReset();
                      }
                    }

                    this.setState({dialogPopVisibleUsed: false});
                  }}>
                  <Text style={{width: '100%', textAlign: 'center'}}>
                    간편 점검 기록 하기
                  </Text>
                </Button>
              </View>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AnimView: {
    borderTopColor: colors.lineColor,
    borderTopWidth: mystyle.borderWidth,
    height: 50,
    width: '100%',
    alignItems: 'flex-end',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    // position: 'absolute',
    // opacity: 0.0,
    //backgroundColor: 'red',
    //backgroundColor: 'rgba(0, 0, 0, 0)',
    //backgroundColor:'rgba(255,255,255,0.0)',
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    right: 0,
  },

  container: {
    overflow: 'hidden',

    width: '100%',
    // height:'100%',
    flexDirection: 'row',
    // height:300,

    alignItems: 'center',
    justifyContent: 'space-evenly',

    // padding: wp('5%'),
    backgroundColor: 'white',
  },

  buttonStyle: {
    // flex: 1,
    width: 85,
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    // borderRadius: 0,

    borderColor: 'white',
    elevation: 0,
    paddingBottom: 10,
  },

  wrapContent: {
    width: '100%',
    height: '100%',
    // paddingBottom: '5%',

    alignItems: 'center',
  },
  content: {
    width: '100%',
    height: '100%',
    //alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#46c3ad',
  },

  actionButtonIcon: {
    // fontSize: 20,
    // height: 33,
    // width: 33,

    height: 41,
    width: 41,

    // color: 'white',
  },
});
