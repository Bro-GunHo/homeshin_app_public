import React, {useState, useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import BackButton from '~/Components/BackButton';
import DefaultHeader from '~/Components/DefaultHeader';
import InspectionCard from '~/Components/InspectionCard';
import TabBar from '~/Components/TabBar';
import {style} from './InsepctionHistoryStyle';
import {ColorRed} from '~/style/Color';
import Icon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Feather';
import {FontPretendardRegular, FontPretendardSemiBold} from '~/style/Font';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';
import {useFocusEffect} from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';

var minute_option = [
  {
    key: 0,
    label: '통합검색',
    value: 'all',
  },
  {key: 1, label: '이름', value: 'mt_name'},
  {
    key: 2,
    label: '아파트명',
    value: 'mt_house_name',
  },
];

//작업자용 점검 목록

const list = [
  {label: '접수', value: 1, key: 'IH_woker_2'},
  {label: '점검완료', value: 2, key: 'IH_woker_3'},
];

function InspectionHistory({navigation, mt_idx, mt_level}) {
  const [statusType, setStatusType] = useState(1);
  const [searchType, setSearchType] = useState('통합검색');
  const [searchTypeValue, setSearchTypeValue] = useState('all');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [listDataNull, setListDataNull] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getData(0, true);
    }, [statusType, searchText]),
  );

  const getData = (pagination = 0, refresh = refreshing) => {
    setPage(pagination);
    setIsLoading(true);

    let pr_status = '';
    if (statusType == 0) pr_status = 'A';
    else if (statusType == 1) pr_status = 'B';
    else if (statusType == 2) pr_status = 'C';
    Api.send(
      'proc_project_list',
      {
        type: mt_level,
        mt_idx,
        pr_status,
        search_type: searchTypeValue,
        search_text: searchText,
        limit_count: rows,
        last_idx: rows * pagination,
      },
      (responseJson) => {
        try {
          if (responseJson.result == 'Y') {
            let arrItems = responseJson.item;
            setIsLoading(false);
            setRefreshing(false);
            setData(refresh ? arrItems : data.concat(arrItems));
            setFetchingStatus(responseJson.item.length === 0 ? false : true);
            setListDataNull(false);
          } else {
            setData([]);
            setRefreshing(false);
            setFetchingStatus(false);
            setListDataNull(true);
          }
        } catch (e) {
          setData([]);
          setRefreshing(false);
          setFetchingStatus(false);
          setListDataNull(true);
        }
      },
    );
  };

  const handleScroll = (e) => {
    let scrollY =
      e.nativeEvent.contentOffset.y + e.nativeEvent.layoutMeasurement.height;
    if (scrollY >= e.nativeEvent.contentSize.height - 250) {
      if (fetchingStatus && isLoading === false) {
        setIsLoading(true);
        setRefreshing(false);
        getData(fetchingStatus ? page + 1 : page);
      }
    }
  };

  const _handleRefresh = () => {
    setIsLoading(true);
    setRefreshing(true);
    getData(0, true);
  };

  return (
    <SafeAreaView style={style.container}>
      <Loaders views={isLoading} />
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'점검현황조회'}
      />
      <View style={{flex: 1}}>
        <TabBar list={list} setValue={setStatusType} value={statusType} />
        {/* 검색 */}
        <View
          style={{
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            // height: 85,
            width: '100%',
            // height: 85,
            justifyContent: 'center',
            // backgroundColor: 'red',
          }}>
          <ModalSelector
            data={minute_option}
            initValue="시간 선택"
            accessible={true}
            backdropPressToClose={true}
            cancelText={'취소'}
            cancelButtonAccessibilityLabel={'취소'}
            // style={}
            style={{width: 120, height: '100%'}}
            selectStyle={{position: 'relative'}}
            onChange={(option) => {
              setSearchTypeValue(option.value);
              setSearchType(option.label);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // paddingVertical: 11,

                paddingHorizontal: 15,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: '#E3E3E3',
                marginRight: 5,
                justifyContent: 'space-between',
                width: 120,
                height: 45,
              }}>
              <Text
                style={{
                  fontFamily: FontPretendardSemiBold,
                  fontSize: 15,
                  marginRight: 5,
                }}>
                {searchType}
              </Text>
              <Icon name="down" size={16} />
            </View>
          </ModalSelector>
          <View
            style={{
              flex: 1,
              marginLeft: 5,
              // paddingVertical: Platform.OS == 'android' ? 0 : 9,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: 5,
              borderColor: '#E3E3E3',
            }}>
            <TextInput
              style={{
                flex: 1,
                height: 43,
                fontFamily: FontPretendardRegular,
              }}
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <TouchableOpacity onPress={() => getData()}>
              <FIcon name="search" size={18} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          bounces={false}
          data={data}
          scrollEnabled={true}
          refreshing={refreshing}
          onRefresh={_handleRefresh}
          keyExtractor={(item, index) => `List-${item.idx}`}
          contentContainerStyle={{paddingHorizontal: 20, paddingBottom: 10}}
          ListHeaderComponentStyle={{paddingVertical: 20}}
          onScroll={(event) => handleScroll(event)}
          renderItem={({item}) => (
            <InspectionCard
              navigation={navigation}
              item={item}
              type={'expert'}
            />
          )}
          ListEmptyComponent={() => {
            if (data.length === 0 && listDataNull === true) {
              return <NodataView />;
            } else {
              return <View style={{marginBottom: 20}} />;
            }
          }}
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
export default connect(mapStateToProps)(InspectionHistory);
