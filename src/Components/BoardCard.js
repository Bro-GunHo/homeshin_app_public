import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';

function BoardCard({data, navigaion}) {
  return (
    <TouchableOpacity
      style={style.container}
      onPress={() => navigaion.navigate('FreeBoardDetail', {idx: data.idx})}>
      <View style={{flex: 1}}>
        <Text style={style.title} numberOfLines={2}>
          {data.nt_title}
        </Text>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
          <Text style={[style.subTitle, {color: '#717171', marginRight: 10}]}>
            {data.mt_name}
          </Text>
          <Text style={style.subTitle}>{data.nt_wdate_str}</Text>
        </View>
      </View>
      <Icon name="right" color={'#999999'} size={20} />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
    paddingVertical: 10,
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
    fontSize: 13,
    color: '#999999',
  },
});

export default BoardCard;
