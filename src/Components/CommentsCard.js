import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';

function CommentsCard({data, mt_idx, mt_name, _delete}) {
  return (
    <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5,
          marginHorizontal: 5,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{fontFamily: FontPretendardBold, fontSize: 15}}>
            {data.mt_name}
          </Text>
          <Text
            style={{
              fontFamily: FontPretendardRegular,
              fontSize: 14,
              color: '#9E9E9E',
              marginLeft: 5,
            }}>
            {data.ins_dt_str}
          </Text>
        </View>
        {data.mt_idx == mt_idx ? (
          <TouchableOpacity onPress={() => _delete(data.idx)}>
            <Icon name="close" size={20} />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{borderRadius: 10, backgroundColor: '#F5F5F5', padding: 15}}>
        <Text>{data.cont}</Text>
      </View>
    </View>
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
export default connect(mapStateToProps)(CommentsCard);
