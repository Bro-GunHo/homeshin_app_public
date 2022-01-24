import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ColorRed, ColorWhite} from '~/style/Color';
import {
  FontPretendardBold,
  FontPretendardMedium,
  FontPretendardRegular,
} from '~/style/Font';
import CustomButton from './CustomButton';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView, Loaders} from '~/Api';
import cusToast from '~/Components/CusToast';

/*
 type 으로 구분하여 해당 컴포넌트를 커스텀 합니다.
*/

function InspectionCard({item, navigation, statusType, mt_level, mt_idx}) {
  console.log('data', item);
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('InspectionUserDetail', {pr_idx: item.idx})
      }
      style={{
        padding: 15,
        borderColor: '#E2E2E2',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
      }}
      disabled={mt_level == '2'}
      key={'plistKey_' + item.idx.toString()}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={{fontSize: 15, fontFamily: FontPretendardBold}}>
          {item.mt_name}
        </Text>
        <Text
          style={{
            fontFamily: FontPretendardRegular,
            color: '#9E9E9E',
            fontSize: 14,
            marginLeft: 10,
          }}>
          {item.ins_dt_str}
        </Text>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View
            style={{
              backgroundColor: '#E3E3E3',
              borderRadius: 25,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text style={{fontFamily: FontPretendardBold, color: '#818181'}}>
              {item.pr_status_str2}
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={{fontFamily: FontPretendardMedium, fontSize: 15}}>
          {item.mt_house_name} {item.mt_house_dong}
        </Text>
      </View>
      <View style={{marginBottom: 10}}>
        <Text
          style={{
            fontFamily: FontPretendardRegular,
            fontSize: 14,
            color: '#5D5D5D',
          }}>
          {item.pr_option_str}
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <Text style={{fontFamily: FontPretendardRegular, fontSize: 14}}>
          <Text>전용 면적 {item.mt_house_size_str}</Text>
          <Text>/</Text>
          <Text>공급 면적 {item.mt_house_size2_str}</Text>
        </Text>
      </View>
      <View style={{marginBottom: 10}}>
        <Text style={{fontFamily: FontPretendardRegular, fontSize: 14}}>
          점검 일시 <Text style={{color: '#9E9E9E'}}>{item.check_dt_str}</Text>
        </Text>
      </View>
      {mt_level == '2' && item.pr_status == 'A' && (
        <View style={{marginVertical: 10}}>
          <CustomButton
            label={'수정'}
            labelColor={ColorRed}
            labelSize={15}
            backgroundColor={ColorWhite}
            borderColor={ColorRed}
            borderRadius={5}
            onPress={() =>
              navigation.navigate('InspectionEdit', {pr_idx: item.idx})
            }
          />
        </View>
      )}
      {mt_level == '2' && item.pr_status == 'C' && (
        <View style={{marginVertical: 10}}>
          <CustomButton
            label={'점검 결과 확인'}
            labelColor={ColorRed}
            labelSize={15}
            backgroundColor={ColorWhite}
            borderColor={ColorRed}
            borderRadius={5}
            onPress={() =>
              navigation.navigate('InspectionViewDetail', {pr_idx: item.idx})
            }
          />
        </View>
      )}
    </TouchableOpacity>
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
export default connect(mapStateToProps)(InspectionCard);
