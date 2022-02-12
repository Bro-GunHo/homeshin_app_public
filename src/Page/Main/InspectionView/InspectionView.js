import React, {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import {BackHome, BackButton} from '~/Components/BackButton';
import DefaultHeader from '~/Components/DefaultHeader';
import InspectionCard from '~/Components/InspectionCard';
import TabBar from '~/Components/TabBar';
import {ColorRed} from '~/style/Color';
import {style} from './InspectionViewStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';
import {useFocusEffect} from '@react-navigation/native';

const list = [
  {label: '신청', value: 0, key: 'iViewTab0'},
  {label: '접수', value: 1, key: 'iViewTab1'},
  {label: '점검완료', value: 2, key: 'iViewTab2'},
];

function InspectionView({navigation, mt_idx, mt_level}) {
  const [statusType, setStatusType] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [statusType]),
  );

  // useEffect(() => {
  //   getData();
  // }, [statusType]);

  const getData = () => {
    setIsLoading(true);

    let pr_status = '';
    if (statusType == 0) pr_status = 'A';
    else if (statusType == 1) pr_status = 'B';
    else if (statusType == 2) pr_status = 'C';
    Api.send(
      'proc_project_list',
      {type: mt_level, mt_idx, pr_status},
      (responseJson) => {
        if (responseJson.result == 'Y') {
          setIsLoading(false);
          setData(responseJson.item);
        }
      },
    );
  };

  return (
    <SafeAreaView style={style.container}>
      <Loaders views={isLoading} />

      <DefaultHeader
        headerLeft={<BackHome navigation={navigation} />}
        headerTitle={'점검 현황'}
      />

      <View style={{flex: 1}}>
        <TabBar list={list} setValue={setStatusType} value={statusType} />
        <FlatList
          bounces={false}
          data={data}
          scrollEnabled={true}
          keyExtractor={(item, index) => `List-${item.idx}`}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 10}}
          ListHeaderComponent={
            <Text style={[style.title]}>
              총 <Text style={{color: ColorRed}}>{data.length}</Text>개{' '}
              {list[statusType].label}
            </Text>
          }
          ListHeaderComponentStyle={{paddingVertical: 20}}
          renderItem={({item}) => (
            <InspectionCard
              navigation={navigation}
              item={item}
              statusType={statusType}
            />
          )}
          ListEmptyComponent={<NodataView />}
        />
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
export default connect(mapStateToProps)(InspectionView);
