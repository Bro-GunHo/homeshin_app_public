import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import BackButton from '~/Components/BackButton';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorRed, ColorWhite} from '~/style/Color';
import {FontPretendardMedium} from '~/style/Font';
import {style} from './InspectionUserDetailStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView} from '~/Api';
import cusToast from '~/Components/CusToast';

const defList = {
  AB: [
    {label: '사안별 하자 목록', value: 1, key: 'inspectionViewABTab0'},
    {label: '화학물질 검출수준', value: 2, key: 'inspectionViewABTab1'},
    {label: '비고', value: 3, key: 'inspectionViewABTab2'},
  ],
  A: [
    {label: '사안별 하자 목록', value: 1, key: 'inspectionViewATab0'},
    {label: '비고', value: 3, key: 'inspectionViewATab1'},
  ],
  B: [
    {label: '화학물질 검출수준', value: 2, key: 'inspectionViewBTab0'},
    {label: '비고', value: 3, key: 'inspectionViewBTab1'},
  ],
};

function InspectionUserDetail({navigation, route, mt_idx, mt_level}) {
  const [statusType, setStatusType] = useState(1);

  const [pr_idx, setPr_idx] = useState(route.params.pr_idx);
  const [data, setData] = useState({});
  const [checklist_data, setChecklist_data] = useState({});
  const [chemical_data, setChemical_data] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState(defList.AB);
  const [optionType, setOptionType] = useState('AB');

  React.useEffect(() => {
    if (pr_idx) {
      getData();
    }
  }, [pr_idx]);

  const getData = () => {
    Api.send('proc_project_view', {pr_idx}, (responseJson) => {
      if (responseJson.result == 'Y') {
        if (!responseJson.item.project_data.length) {
          cusToast('점검표를 불러오는데 실패했습니다.');
          navigation.goBack();
          return;
        }

        // console.log('responseJson.item.', responseJson.item);

        let project_data = responseJson.item.project_data[0];
        let newList = defList[project_data.pr_option];
        setList(newList);
        setOptionType(project_data.pr_option);

        setData(project_data);
        setChecklist_data(responseJson.item.checklist_data);
        setChemical_data(responseJson.item.chemical_data);

        setStatusType(newList[0].value);
        // console.log('@@', responseJson.item.project_data[0]);
      } else {
        navigation.navigate.goBack();
      }
    });
  };

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'점검 현황 상세'}
      />
      <View style={{flex: 1, padding: 20}}>
        <Text style={[style.title, {fontSize: 24}]}>{data.mt_name}</Text>
        <Text
          style={{
            fontFamily: FontPretendardMedium,
            fontSize: 18,
            marginVertical: 15,
          }}>
          {data.mt_house_name} {data.mt_house_dong}
        </Text>
        <View style={style.section}>
          <Text style={style.title}>점검 내용</Text>
          <Text style={style.subTitle}>{data.pr_option_str}</Text>
        </View>
        <View style={style.section}>
          <Text style={style.title}>공급면적</Text>
          <Text style={style.subTitle}>{data.mt_house_size_str}</Text>
        </View>
        <View style={style.section}>
          <Text style={style.title}>전용면적</Text>
          <Text style={style.subTitle}>{data.mt_house_size2_str}</Text>
        </View>
        <View style={style.section}>
          <Text style={style.title}>점검 일시</Text>
          <Text style={style.subTitle}>{data.check_dt_str}</Text>
        </View>
        <View style={{paddingVertical: 20}}>
          {optionType == 'A' || optionType == 'AB' ? (
            <View style={{marginBottom: 5}}>
              <CustomButton
                label="사안별 하자 목록 작성"
                backgroundColor={ColorWhite}
                borderColor={'#E3E3E3'}
                borderRadius={5}
                onPress={() =>
                  // navigation.navigate('InspectionProblemEnroll', {
                  navigation.navigate('InspectionForm', {pr_idx: data.idx})
                }
              />
            </View>
          ) : null}
          {optionType == 'B' || optionType == 'AB' ? (
            <View style={{marginBottom: 5}}>
              <CustomButton
                label="화학물질 검출 수준 작성"
                backgroundColor={ColorWhite}
                borderColor={'#E3E3E3'}
                borderRadius={5}
                onPress={() =>
                  navigation.navigate('ChemistryForm', {pr_idx: data.idx})
                }
              />
            </View>
          ) : null}
          <View style={{marginBottom: 5}}>
            <CustomButton
              label="전체 보고서"
              labelColor={ColorWhite}
              backgroundColor={ColorRed}
              borderRadius={5}
              onPress={() =>
                navigation.navigate('InspectionViewDetail', {pr_idx: data.idx})
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    mt_idx: state.login.mt_idx,
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    mt_name: state.login.mt_name,
  };
};
export default connect(mapStateToProps)(InspectionUserDetail);
