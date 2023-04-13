import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Linking,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/AntDesign';
import CustomButton from '~/Components/CustomButton';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from './HomeStyle';
import {connect, useDispatch} from 'react-redux';
import Api from '~/Api';
import cusToast from '~/Components/CusToast';
import messaging from '@react-native-firebase/messaging';
function Home(props) {
  const {navigation, mt_idx, mt_id, mt_level} = props;
  const [linkTel, setLinkTel] = useState('');
  const [linkKakao, setLinkKakao] = useState('');

  // console.log(props);
  // console.log(Api.state.baseCode.HELP);

  useEffect(() => {
    //고객센터
    if (Api.state.baseCode && Api.state.baseCode.HELP) {
      for (const iterator of Api.state.baseCode.HELP) {
        if (iterator.cd_c == 'TEL') setLinkTel(iterator.cd_memo);
        if (iterator.cd_c == 'KAKAO') setLinkKakao(iterator.cd_memo);
      }
    }

    messaging().onMessage(async (remoteMessage) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('A new FCM message arrived!', remoteMessage.data);

      Alert.alert(
        remoteMessage.data.title,
        remoteMessage.data.body,
        [
          // {
          //   text: '취소',
          //   onPress: () => console.log('Cancel'),
          //   style: 'cancel',
          // },
          {
            text: '확인',
            onPress: () => {
              callScreen(props, remoteMessage.data);
            },
          },
        ],
        {cancelable: false},
      );
    });
  }, []);

  const [loginType, setLoginType] = useState(mt_level == '2' ? 1 : 2); //1: 입주자(mt_level = 2) , 2: 점검자(mt_level=6) , 3: 책임자(mt_level=7)

  return (
    <SafeAreaView style={style.container}>
      <ScrollView
        contentContainerStyle={{
          minHeight: Dimensions.get('screen').height,
          justifyContent: 'flex-start',
          paddingTop: 35,
          // justifyContent: 'space-between',
        }}>
        {loginType == 2 ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            {props.mt_position ? (
              <Text style={[style.title, {fontSize: 13, textAlign: 'right'}]}>
                {props.mt_position}
              </Text>
            ) : null}
            <Text
              style={[
                style.title,
                {fontSize: 13, paddingRight: 20, paddingLeft: 6},
              ]}>
              {props.mt_name}
            </Text>
          </View>
        ) : null}
        <View style={[style.section, {justifyContent: 'flex-end'}]}>
          <View style={{alignItems: 'center'}}>
            <Text style={style.title}>안전한</Text>
            <Text style={style.title}>
              우리집 <Text style={{color: ColorRed}}>홈신</Text>
            </Text>
          </View>
          <View style={{marginVertical: 10, alignItems: 'center'}}>
            <Text style={style.subTitle}>홈신으로 간편하게</Text>
            <Text style={style.subTitle}>아파트 점검 신청해보세요</Text>
          </View>
        </View>
        <View>
          <FastImage
            source={require('~/Assets/Images/img_foundit.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Dimensions.get('screen').width -
                Dimensions.get('screen').width / 3,
            }}
          />
          <View style={{width: '100%', paddingHorizontal: 20}}>
            <CustomButton
              label={loginType === 1 ? '점검 신청' : '점검 현황'}
              labelColor={ColorWhite}
              borderRadius={5}
              backgroundColor={ColorRed}
              onPress={() =>
                loginType === 1
                  ? navigation.navigate('InspectionApply')
                  : navigation.navigate('InspectionHistory')
              }
            />
          </View>
        </View>
        <View style={[{paddingHorizontal: 20, marginTop: 20}]}>
          {loginType === 1 && (
            <View
              style={{
                flex: 1,
                backgroundColor: ColorWhite,
                padding: 10,
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomWidth: 1,
                  borderColor: '#E3E3E3',
                }}>
                <TouchableOpacity
                  style={[style.button, {padding: 10}]}
                  onPress={() => navigation.navigate('InspectionView')}>
                  <FastImage
                    source={require('~/Assets/Images/ic_checklook.png')}
                    style={{width: 55, height: 55}}
                  />
                  <View style={style.TitleWrap}>
                    <Text style={style.buttonTitle}>점검 현황</Text>
                    <Text style={style.buttonSubTitle}>사전점검 진행을</Text>
                    <Text style={style.buttonSubTitle}>확인해 주세요.</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: 1,
                    height: '100%',
                    backgroundColor: '#E3E3E3',
                  }}></View>
                <TouchableOpacity
                  style={[style.button, {padding: 10}]}
                  onPress={() =>
                    navigation.navigate('CompanyIntro', {tabNo: 1})
                  }>
                  <FastImage
                    source={require('~/Assets/Images/ic_company.png')}
                    style={{width: 55, height: 55}}
                  />
                  <View style={style.TitleWrap}>
                    <Text style={style.buttonTitle}>회사소개</Text>
                    <Text style={style.buttonSubTitle}>안전한 우리집,</Text>
                    <Text style={style.buttonSubTitle}>
                      홈신이 함께 합니다.
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  style={[style.button, {padding: 10}]}
                  onPress={() => navigation.navigate('FreeBoard')}>
                  <FastImage
                    source={require('~/Assets/Images/ic_board.png')}
                    style={{width: 55, height: 55}}
                  />
                  <View style={style.TitleWrap}>
                    <Text style={style.buttonTitle}>게시판</Text>
                    <Text style={style.buttonSubTitle}>아파트 입주민들과</Text>
                    <Text style={style.buttonSubTitle}>정보를 공유하세요.</Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    width: 1,
                    height: '100%',
                    backgroundColor: '#E3E3E3',
                  }}></View>
                <TouchableOpacity
                  style={[style.button, {padding: 10}]}
                  onPress={() => navigation.navigate('Setting')}>
                  <FastImage
                    source={require('~/Assets/Images/ic_setting.png')}
                    style={{width: 55, height: 55}}
                  />
                  <View style={style.TitleWrap}>
                    <Text style={style.buttonTitle}>설정</Text>
                    <Text style={style.buttonSubTitle}>내정보를 수정할</Text>
                    <Text style={style.buttonSubTitle}>수 있습니다.</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {loginType === 2 && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                padding: 20,
                alignItems: 'center',
                backgroundColor: ColorWhite,
              }}
              onPress={() => navigation.navigate('Setting')}>
              <FastImage
                source={require('~/Assets/Images/ic_setting.png')}
                style={{width: 55, height: 55}}
              />
              <View style={[style.TitleWrap, {flex: 1}]}>
                <Text style={style.buttonTitle}>설정</Text>
                <Text style={style.buttonSubTitle}>
                  내정보를 수정할 수 있습니다.
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#EEEEEE',
                  padding: 5,
                  borderRadius: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="right" color={'#AAAAAA'} />
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            // backgroundColor: ColorWhite,
            marginHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
            // height: 40,
            marginTop: 40,
            padding: 10,
            marginBottom: 20,
          }}>
          {/* <Icon name="phone" color="#222"></Icon> */}
          <Text style={style.buttonTitle}>고객센터</Text>
          <Text style={style.buttonSubTitle}>전화(1533-2711)</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 5,
            }}>
            <TouchableOpacity
              onPress={() => {
                if (linkTel) Api.dialCall(linkTel);
                else cusToast('전화번호를 불러오는데 실패했습니다.');
              }}>
              <FastImage
                source={require('~/Assets/Images/list_call.png')}
                style={{width: 45, height: 45}}
              />
            </TouchableOpacity>
            <View style={{width: 20}}></View>
            <TouchableOpacity
              onPress={() => {
                if (linkKakao) Linking.openURL(linkKakao);
                else cusToast('카카오주소를 불러오는데 실패했습니다.');
              }}>
              <FastImage
                source={require('~/Assets/Images/list_kakao.png')}
                style={{width: 45, height: 45}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
// export default Home;

const mapStateToProps = (state) => {
  return {
    mt_idx: state.login.mt_idx,
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    mt_name: state.login.mt_name,
    mt_position: state.login.mt_position,
  };
};
export default connect(mapStateToProps)(Home);
