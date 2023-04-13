import React, {useState} from 'react';
import {FlatList, SafeAreaView, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import BackButton from '~/Components/BackButton';
import BoardCard from '~/Components/BoardCard';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorRed, ColorWhite} from '~/style/Color';
import {style} from './FreeBoradStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';
import {useFocusEffect} from '@react-navigation/native';
import ModalSelector from 'react-native-modal-selector';

function FreeBoard({navigation, mt_idx}) {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState(20);
  const [page, setPage] = useState(0);
  const [listDataNull, setListDataNull] = useState(false);
  const [fetchingStatus, setFetchingStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  const getData = (pagination = 0, refresh = refreshing) => {
    setPage(pagination);
    setIsLoading(true);

    Api.send(
      'proc_board_qna_list',
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
        headerTitle={'자유게시판'}
      />
      <FlatList
        bounces={false}
        style={{flex: 1}}
        data={data}
        // ListEmptyComponent={<NodataView msg="게시글이 없습니다." />}
        contentContainerStyle={{paddingHorizontal: 20}}
        renderItem={({item}) => (
          <BoardCard data={item} navigaion={navigation} />
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
export default connect(mapStateToProps)(FreeBoard);
