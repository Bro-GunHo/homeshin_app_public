import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AccordionCard from '~/Components/AccordionCard';
import BackButton from '~/Components/BackButton';
import DefaultHeader from '~/Components/DefaultHeader';
import DetailChemistryCard from '~/Components/DetailChemistryCard';
import DetailProblemCard from '~/Components/DetailProblemCard';
import Remarks from '~/Components/Remarks';
import TabBar from '~/Components/TabBar';
import {ColorRed} from '~/style/Color';
import {style} from './InspectionViewDetailStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView} from '~/Api';
import cusToast from '~/Components/CusToast';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';

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

function InspectionViewDetail({navigation, route, mt_idx, mt_level}) {
  const [statusType, setStatusType] = useState(1);

  const [pr_idx, setPr_idx] = useState(route.params.pr_idx);
  const [data, setData] = useState({});
  const [checklist_data, setChecklist_data] = useState([]);
  const [chemical_data, setChemical_data] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [list, setList] = useState(defList.AB);
  const [optionType, setOptionType] = useState('AB');

  // React.useEffect(() => {
  //   if (pr_idx) {
  //     getData();
  //   }
  // }, [pr_idx]);

  useFocusEffect(
    React.useCallback(() => {
      if (pr_idx) {
        getData();
      }
    }, [pr_idx]),
  );

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

        setData(project_data);
        setChecklist_data(responseJson.item.checklist_data);
        setChemical_data(responseJson.item.chemical_data);

        if (project_data.pr_option != optionType) {
          setStatusType(newList[0].value);
        }
        setOptionType(project_data.pr_option);
        // console.log('@@', responseJson.item.project_data[0]);
      } else {
        navigation.navigate.goBack();
      }
    });
  };

  const _moveWrite = (type) => {
    if (type == 'checklist')
      navigation.navigate('InspectionForm', {pr_idx: pr_idx});
    else navigation.navigate('ChemistryForm', {pr_idx: pr_idx});
  };

  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'점검현황조회 상세'}
      />
      <View style={{flex: 1}}>
        <TabBar list={list} setValue={setStatusType} value={statusType} />
        {statusType === 1 && (
          <FlatList
            bounces={false}
            data={checklist_data}
            ListEmptyComponent={<NodataView msg="등록된 내용이 없습니다." />}
            ListFooterComponent={
              <View
                style={{borderBottomWidth: 1, borderColor: '#E2E2E2'}}></View>
            }
            keyExtractor={(item) => `item-${item.idx}`}
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={style.title}>
                  <Text style={{color: ColorRed}}>사안별 하자</Text> 목록
                </Text>
                {mt_level != 2 ? (
                  <TouchableOpacity
                    onPress={() => _moveWrite('checklist')}
                    style={{marginRight: 20}}>
                    <Icon name="form" size={20} />
                  </TouchableOpacity>
                ) : null}
              </View>
            }
            // extraData={checklist_data}
            ListHeaderComponentStyle={{padding: 20}}
            renderItem={({item}) => (
              <AccordionCard
                key={'checklist_' + item.idx}
                label={item.ck_space + ' ' + item.ck_location}
                item={item}
                content={
                  <DetailProblemCard
                    item={item}
                    navigation={navigation}
                    refresh={() => getData()}
                  />
                }
              />
            )}
          />
        )}
        {statusType === 2 && (
          <FlatList
            bounces={false}
            data={chemical_data}
            extraData={chemical_data}
            keyExtractor={(item) => `item-chem-${item.idx}`}
            ListEmptyComponent={<NodataView msg="등록된 내용이 없습니다." />}
            ListFooterComponent={
              <View
                style={{borderBottomWidth: 1, borderColor: '#E2E2E2'}}></View>
            }
            ListHeaderComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={style.title}>
                  <Text style={{color: ColorRed}}>화학물질 검출</Text> 수준
                </Text>
                {mt_level != 2 ? (
                  <TouchableOpacity
                    onPress={() => _moveWrite('chemical')}
                    style={{marginRight: 20}}>
                    <Icon name="form" size={20} />
                  </TouchableOpacity>
                ) : null}
              </View>
            }
            ListHeaderComponentStyle={{padding: 20}}
            renderItem={({item}) => (
              <AccordionCard
                key={'chemical_' + item.idx}
                label={item.ch_sub}
                content={
                  <DetailChemistryCard
                    data={item.ch_data_arr}
                    ch_idx={item.idx}
                    pr_idx={item.pr_idx}
                    navigation={navigation}
                    refresh={() => getData()}
                  />
                }
              />
            )}
          />
        )}
        {statusType === 3 && <Remarks data={data} navigation={navigation} />}
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
export default connect(mapStateToProps)(InspectionViewDetail);
