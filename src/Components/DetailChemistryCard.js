import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView} from '~/Api';
import cusToast from '~/Components/CusToast';
import CustomButton from './CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';

function DetailChemistryCard(props) {
  const {navigation, data, pr_idx, ch_idx, mt_level, mt_idx, refresh} = props;

  // console.log('props', props);
  const _delete = (idx) => {
    Alert.alert('삭제하시겠습니까?', '', [
      {text: '취소'},
      {
        text: '확인',
        onPress: () => {
          Api.send(
            'proc_chemical_del',
            {idx: ch_idx, pr_idx: pr_idx, mt_idx: mt_idx},
            (responseJson) => {
              if (responseJson.result == 'Y') {
                Alert.alert('삭제되었습니다.', '', [
                  {
                    text: '확인',
                    onPress: () => {
                      refresh();
                    },
                  },
                ]);
              }
            },
          );
        },
      },
    ]);
  };

  const _edit = (idx) => {
    navigation.navigate('ChemistryForm', {pr_idx: pr_idx, idx: ch_idx});
  };

  return (
    <View style={style.container}>
      {data.length ? (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 1}}>
            {data.map((item, index) => (
              <View
                style={[style.section, {marginBottom: 5}]}
                key={'dctc_' + ch_idx + '_' + index.toString()}>
                <Text style={style.title}>{item.loc}</Text>
                <Text style={style.subTitle}>{item.cont}</Text>
              </View>
            ))}
          </View>

          {mt_level > 2 ? (
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => _edit(data.idx)}
                style={{marginRight: 20}}>
                <Icon name="edit" size={20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => _delete(data.idx)}>
                <Icon name="delete" size={20} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : (
        <NodataView msg="등록된 자료가 없습니다." />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    marginVertical: 5,
  },
  title: {
    fontFamily: FontPretendardBold,
    fontSize: 15,
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: FontPretendardRegular,
    fontSize: 15,
    color: '#333',
  },
});

const mapStateToProps = (state) => {
  return {
    mt_idx: state.login.mt_idx,
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    mt_name: state.login.mt_name,
  };
};
export default connect(mapStateToProps)(DetailChemistryCard);
