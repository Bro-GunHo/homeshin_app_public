import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import {ColorRed, ColorWhite, ColorBlack} from '~/style/Color';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';
import CustomButton from './CustomButton';
import FastImage from 'react-native-fast-image';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView} from '~/Api';
import cusToast from '~/Components/CusToast';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/AntDesign';

function Remarks({data, navigation, mt_level, mt_idx, mt_name, mt_img_big}) {
  const [pr_checklist_etc, setPr_checklist_etc] = useState(
    data.pr_checklist_etc ? data.pr_checklist_etc : '',
  );

  const _submit = () => {
    // if (!ch_sub) {
    //   cusToast('화학물질을 입력해주세요.');
    //   return false;
    // }

    let sendObj = {
      mt_idx: mt_idx,
      pr_idx: data.idx,
      pr_checklist_etc: pr_checklist_etc,
    };

    Api.send('proc_project_done', sendObj, (responseJson) => {
      if (responseJson.result == 'Y') {
        Alert.alert('처리되었습니다.', '', [
          {text: '확인', onPress: () => navigation.goBack()},
        ]);
      }
    });
  };

  return (
    <ScrollView style={style.container} bounces={false}>
      {mt_level == 7 ? (
        <View>
          {!data.done_dt ? <NodataView msg="완료되지 않았습니다." /> : null}
          {
            //책임자는 작업완료 가능
            mt_level == 7 ? (
              <View>
                <View style={style.section}>
                  <Text style={style.title}>비고</Text>
                </View>
                <View
                  style={{
                    padding: 20,
                    backgroundColor: ColorWhite,
                    borderBottomWidth: 1,
                    borderColor: '#E3E3E3',
                  }}>
                  <View style={style.inputBox}>
                    <TextInput
                      style={[
                        style.input,
                        {textAlignVertical: 'top', minHeight: 60},
                      ]}
                      placeholder="비고입력"
                      multiline
                      value={pr_checklist_etc}
                      onChangeText={(text) => setPr_checklist_etc(text)}
                    />
                  </View>
                </View>
                <View style={style.section}>
                  <Text style={style.title}>서명</Text>
                </View>
                <View style={{padding: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={style.title}>확인자명</Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: FontPretendardRegular,
                          marginLeft: 5,
                        }}>
                        {data.pr_checklist_eng ? data.pr_checklist_eng : ' '}
                      </Text>
                    </View>
                    {data.pr_checklist_logo_big ? (
                      <FastImage
                        source={{uri: data.pr_checklist_logo_big}}
                        style={{height: 80, width: 80}}
                        resizeMode="contain"
                      />
                    ) : null}
                  </View>
                </View>
                <View style={{padding: 20}}>
                  <View style={{marginBottom: 7}}>
                    <CustomButton
                      label={'작업 완료'}
                      labelColor={ColorBlack}
                      borderColor={'#E3E3E3'}
                      borderRadius={5}
                      onPress={() => _submit()}
                    />
                  </View>

                  <CustomButton
                    label={'결과 보고서 다운로드(PDF)'}
                    labelColor={ColorWhite}
                    backgroundColor={ColorRed}
                    borderRadius={5}
                    onPress={() => {
                      navigation.navigate('Word', {pr_idx: data.idx});
                    }}
                  />
                </View>
              </View>
            ) : null
          }
        </View>
      ) : !data.done_dt ? (
        <NodataView msg="완료되지 않았습니다." />
      ) : (
        <View>
          <View style={style.section}>
            <Text style={style.title}>비고</Text>
          </View>
          <View
            style={{
              padding: 20,
              backgroundColor: ColorWhite,
              borderBottomWidth: 1,
              borderColor: '#E3E3E3',
            }}>
            <Text style={style.subTitle}>{data.pr_checklist_etc}</Text>
          </View>
          <View style={style.section}>
            <Text style={style.title}>서명</Text>
          </View>
          <View style={{padding: 20}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.title}>확인자명</Text>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: FontPretendardRegular,
                    marginLeft: 5,
                  }}>
                  {data.pr_checklist_eng ? data.pr_checklist_eng : ' '}
                </Text>
              </View>
              {data.pr_checklist_logo_big ? (
                <FastImage
                  source={{uri: data.pr_checklist_logo_big}}
                  style={{height: 80, width: 80}}
                  resizeMode="contain"
                />
              ) : null}
            </View>
          </View>
          <View style={{padding: 20}}>
            <CustomButton
              label={'결과 보고서 다운로드(PDF)'}
              labelColor={ColorWhite}
              backgroundColor={ColorRed}
              borderRadius={5}
              onPress={() => {
                navigation.navigate('Word', {pr_idx: data.idx});
              }}
            />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  section: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderColor: '#E3E3E3',
    borderBottomWidth: 1,
  },
  title: {
    fontFamily: FontPretendardBold,
    fontSize: 15,
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: FontPretendardRegular,
    fontSize: 15,
  },
  inputBox: {
    borderColor: '#E3E3E3',
    borderRadius: 5,
    borderWidth: 1,
    padding: 15,
  },
  input: {
    fontSize: 16,
    fontFamily: FontPretendardRegular,
  },
});

const mapStateToProps = (state) => {
  return {
    mt_idx: state.login.mt_idx,
    mt_id: state.login.mt_id,
    mt_level: state.login.mt_level,
    mt_name: state.login.mt_name,
    mt_img_big: state.login.mt_img_big,
  };
};
export default connect(mapStateToProps)(Remarks);
