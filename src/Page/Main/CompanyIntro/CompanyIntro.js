import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ScrollView, Text} from 'react-native';
import BackButton from '~/Components/BackButton';
import DefaultHeader from '~/Components/DefaultHeader';
import TabBar from '~/Components/TabBar';
import {style} from './CompanyIntroStyle';
import Api from '~/Api';

const list = [
  {label: '회사소개', value: 1, key: 1, co_id: 4},
  {label: '이용약관', value: 2, key: 2, co_id: 2},
  {label: '개인정보처리방침', value: 3, key: 3, co_id: 1},
];

function CompanyIntro({navigation, route}) {
  let tabNo = route.params.tabNo ? route.params.tabNo : 1;
  const [statusType, setStatusType] = useState(tabNo);

  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [data3, setData3] = useState('');

  const getData = () => {
    Api.send('proc_list_content', {co_id: 1}, (responseJson) => {
      if (responseJson.result === 'Y') {
        if (responseJson.item.co_content)
          //responseJson.response.info = strip_tags(responseJson.response.info);
          setData1(responseJson.item.co_content);
      }
    });

    Api.send('proc_list_content', {co_id: 2}, (responseJson) => {
      if (responseJson.result === 'Y') {
        if (responseJson.item.co_content)
          //responseJson.response.info = strip_tags(responseJson.response.info);
          setData2(responseJson.item.co_content);
      }
    });

    Api.send('proc_list_content', {co_id: 4}, (responseJson) => {
      if (responseJson.result === 'Y') {
        if (responseJson.item.co_content)
          //responseJson.response.info = strip_tags(responseJson.response.info);
          setData3(responseJson.item.co_content);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'회사소개'}
      />
      <TabBar list={list} value={statusType} setValue={setStatusType} />
      {statusType == 1 ? (
        <ScrollView style={[style.section, {padding: 20}]}>
          <Text style={style.textarea}>{data3}</Text>
        </ScrollView>
      ) : statusType == 2 ? (
        <ScrollView style={[style.section, {padding: 20}]}>
          <Text style={style.textarea}>{data2}</Text>
        </ScrollView>
      ) : statusType == 3 ? (
        <ScrollView style={[style.section, {padding: 20}]}>
          <Text style={style.textarea}>{data1}</Text>
        </ScrollView>
      ) : null}
    </SafeAreaView>
  );
}

export default CompanyIntro;
