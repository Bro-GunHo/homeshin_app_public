import React, {useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import AccordionCard from '~/Components/AccordionCard';
import BackButton from '~/Components/BackButton';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import InspectionForm from '~/Components/InspectionForm';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
import {style} from './InspectionProblemEnrollStyle';
import {connect, useDispatch} from 'react-redux';
import Api, {NodataView} from '~/Api';
import cusToast from '~/Components/CusToast';

function InspectionProblemEnroll({navigation}) {
  const [data, setData] = useState(['']);
  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle="사안별 하자 목록"
      />
      <View style={{flex: 1}}>
        <FlatList
          bounces={false}
          style={{flex: 1}}
          data={data}
          keyExtractor={(item, index) => `form-${index}`}
          ListHeaderComponent={
            <View style={{padding: 20}}>
              <Text style={[style.title, {fontSize: 24}]}>
                <Text style={{color: ColorRed}}>사안별 하자</Text>목록 작성
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <AccordionCard label={'공간'} content={<InspectionForm />} />
          )}
          ListFooterComponent={
            <View style={{padding: 20}}>
              <View style={{marginVertical: 3}}>
                <CustomButton
                  label="공간 추가"
                  labelColor={ColorBlack}
                  backgroundColor={ColorWhite}
                  borderColor={'#E3E3E3'}
                  borderRadius={5}
                />
              </View>
              <View style={{marginVertical: 3}}>
                <CustomButton
                  label="저장하기"
                  labelColor={ColorWhite}
                  backgroundColor={ColorRed}
                  borderColor={'#E3E3E3'}
                  borderRadius={5}
                />
              </View>
            </View>
          }
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
export default connect(mapStateToProps)(InspectionProblemEnroll);
