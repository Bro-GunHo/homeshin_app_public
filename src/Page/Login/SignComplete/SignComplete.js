import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomButton from '~/Components/CustomButton';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from './SignCompleteStyle';

function SignComplete({navigation}) {
  return (
    <SafeAreaView style={style.continer}>
      <View style={[style.section, {justifyContent: 'flex-end'}]}>
        <View style={style.wrapper}>
          <Text style={style.title}>회원가입이</Text>
        </View>
        <View style={style.wrapper}>
          <Text style={style.title}>완료되었습니다.</Text>
        </View>
        <Text style={style.subTitle}>
          다양한 서비스들을 이용해보실 수 있어요.
        </Text>
      </View>
      <View>
        <FastImage
          source={require('~/Assets/Images/img_logo.png')}
          style={{width: 230, height: 230}}
        />
      </View>
      <View
        style={[style.section, {width: '100%', justifyContent: 'flex-start'}]}>
        <View style={{paddingHorizontal: 20}}>
          <CustomButton
            label="홈으로"
            labelColor={ColorWhite}
            backgroundColor={ColorRed}
            borderRadius={5}
            onPress={() =>
              navigation.reset({
                index: 1,
                routes: [{name: 'Home'}],
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignComplete;
