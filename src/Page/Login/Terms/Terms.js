import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import BackButton from '~/Components/BackButton';
import CheckSelector from '~/Components/CheckSelector';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from './TermsStyle';
import Api from '~/Api';
import cusToast from '~/Components/CusToast';
import {set} from 'react-native-reanimated';

function Terms({navigation}) {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);

  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');

  const moveSignupPage = () => {
    if (checked1 == true && checked2 == true) {
      navigation.navigate('SignUp');
    } else {
      cusToast('모든 항목에 동의해 주세요');
    }
  };

  const getData = () => {
    Api.send('proc_list_content', {co_id: 2}, (responseJson) => {
      if (responseJson.result === 'Y') {
        if (responseJson.item.co_content)
          //responseJson.response.info = strip_tags(responseJson.response.info);
          setData1(responseJson.item.co_content);
      }
    });

    Api.send('proc_list_content', {co_id: 1}, (responseJson) => {
      if (responseJson.result === 'Y') {
        if (responseJson.item.co_content)
          //responseJson.response.info = strip_tags(responseJson.response.info);
          setData2(responseJson.item.co_content);
      }
    });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle="약관동의"
      />
      <View style={{flex: 1, paddingHorizontal: 20, justifyContent: 'center'}}>
        <View style={{flex: 1, marginVertical: 10}}>
          <Text style={style.label}>이용약관</Text>
          <View style={style.scrollWrap}>
            <ScrollView>
              <Text>{data1}</Text>
            </ScrollView>
          </View>
          <Text style={[style.label, {marginTop: 15}]}>개인정보 처리방침</Text>
          <View style={style.scrollWrap}>
            <ScrollView>
              <Text>{data2}</Text>
            </ScrollView>
          </View>
        </View>
        <View style={{flex: 0.3}}>
          <View style={style.selectWrap}>
            <CheckSelector
              label="이용약관에 동의합니다 (필수)"
              status={checked1}
              onPress={() => setChecked1(!checked1)}
            />
          </View>
          <View style={style.selectWrap}>
            <CheckSelector
              label="개인정보 처리방침에 동의합니다 (필수)"
              status={checked2}
              onPress={() => setChecked2(!checked2)}
            />
          </View>
        </View>
        <View>
          <CustomButton
            label="확인"
            labelColor={ColorWhite}
            backgroundColor={ColorRed}
            borderRadius={5}
            onPress={() => moveSignupPage()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Terms;
