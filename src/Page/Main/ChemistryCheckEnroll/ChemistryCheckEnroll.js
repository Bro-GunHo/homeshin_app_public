import React, {useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import AccordionCard from '~/Components/AccordionCard';
import BackButton from '~/Components/BackButton';
import ChemistryForm from '~/Components/ChemistryForm';
import CustomButton from '~/Components/CustomButton';
import DefaultHeader from '~/Components/DefaultHeader';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
import {style} from './ChemistryCheckEnrollStyle';

function ChemistryCheckEnroll({navigation, route}) {
  const [data, setData] = useState(['']);
  return (
    <SafeAreaView style={style.container}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle="화학물질 검출 목록"
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
                <Text style={{color: ColorRed}}>화학물질 검출 수준</Text> 작성
              </Text>
            </View>
          }
          renderItem={({item}) => (
            <AccordionCard label={'화학물질'} content={<ChemistryForm />} />
          )}
          ListFooterComponent={
            <View style={{padding: 20}}>
              <View style={{marginVertical: 3}}>
                <CustomButton
                  label="화학물질 추가"
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

export default ChemistryCheckEnroll;
