import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import CheckSelector from '~/Components/CheckSelector';
import CustomButton from '~/Components/CustomButton';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from '~/Page/Login/LoginStyle';
import FastImage from 'react-native-fast-image';

function Login({navigation}) {
  const [loginType, setLoginType] = useState(2);

  return (
    <SafeAreaView style={style.continer}>
      <View style={style.section}>
        <View style={style.wrapper}>
          <Text style={style.title}>앞으로 안전한 우리집</Text>
        </View>
        <View style={style.wrapper}>
          <View>
            <Text style={[style.title, {color: ColorRed}]}>홈</Text>
            <View style={style.circleWrapper}>
              <View style={style.circle} />
            </View>
          </View>
          <View>
            <Text style={[style.title, {color: ColorRed}]}>신</Text>
            <View style={style.circleWrapper}>
              <View style={style.circle} />
            </View>
          </View>
          <Text style={style.title}>이 함께하겠습니다.</Text>
        </View>
        <Text style={style.subTitle}>
          로그인을 위해 해당하는 유형을 선택해 주세요.
        </Text>
      </View>
      <View
        style={[
          style.section,
          {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginVertical: 40,
          },
        ]}>
        <CheckSelector
          label="입주자"
          status={loginType === 2}
          onPress={() => setLoginType(2)}
        />
        <CheckSelector
          label="작업자"
          status={loginType === 6}
          onPress={() => setLoginType(6)}
        />
        <CheckSelector
          label="기술자"
          status={loginType === 7}
          onPress={() => setLoginType(7)}
        />
      </View>
      <View style={[style.section, {width: '100%', justifyContent: 'center'}]}>
        <View style={{alignItems: 'center'}}>
          <FastImage
            source={require('~/Assets/Images/img_twopeople.png')}
            style={{width: 220, height: 230}}
          />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <CustomButton
            label="선택"
            labelColor={ColorWhite}
            backgroundColor={ColorRed}
            borderRadius={5}
            onPress={() => navigation.navigate('SignIn', {loginType})}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
