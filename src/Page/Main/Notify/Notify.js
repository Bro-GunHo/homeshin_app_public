import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BackButton from '~/Components/BackButton';
import BoardCard from '~/Components/BoardCard';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from './NotifyStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';
import {useFocusEffect} from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';

function Notify({navigation, mt_idx, mt_level}) {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [listDataNull, setListDataNull] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loginType, setLoginType] = useState(mt_level == '2' ? 1 : 2);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  const getData = (pagination = 0, refresh = refreshing) => {
    setPage(pagination);
    setIsLoading(true);

    let method = mt_level == '2' ? 'proc_list_push' : 'proc_list_push_trainer';

    Api.send(
      method,
      {
        mt_idx,
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
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'알림 내역'}
      />
      <FlatList
        bounces={false}
        style={{flex: 1}}
        data={data}
        // ListEmptyComponent={<NodataView msg="게시글이 없습니다." />}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => (
          <TouchableOpacity
            key={'notify_item' + item.idx}
            style={style.itemContainer}
            disabled={!item.param1}
            onPress={() => {
              if (loginType == 1)
                navigation.navigate('InspectionUserDetail', {
                  pr_idx: item.param1,
                });
              else
                navigation.navigate('InspectionUserDetail', {
                  pr_idx: item.param1,
                });
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 5,
                  justifyContent: 'space-between',
                }}>
                <Text style={[style.title, ,]}>{item.title}</Text>
                <Text style={style.subTitle}>{item.ins_dt_str}</Text>
              </View>

              <Text
                style={
                  (style.subTitle, {color: '#717171', marginRight: 10, flex: 1})
                }
                numberOfLines={2}>
                {item.msg}
              </Text>
            </View>
            {/* <Icon name="right" color={'#999999'} size={20} /> */}
          </TouchableOpacity>
        )}
        scrollEnabled={true}
        refreshing={refreshing}
        onRefresh={_handleRefresh}
        keyExtractor={(item, index) => `List-${item.idx}`}
        onScroll={(event) => handleScroll(event)}
      />
      <View>{/* 페이지네이션 */}</View>
      <TouchableOpacity
        style={{position: 'absolute', bottom: 50, right: 10}}
        onPress={() => navigation.navigate('FreeBoardEnroll')}>
        <View
          style={{backgroundColor: ColorRed, padding: 10, borderRadius: 50}}>
          <Icon name="plus" color={ColorWhite} size={20} />
        </View>
      </TouchableOpacity>
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
export default connect(mapStateToProps)(Notify);
