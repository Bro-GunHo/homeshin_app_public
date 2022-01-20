import React from 'react';
import {Text, View} from 'react-native';
import {ColorBlack} from '~/style/Color';
import {FontPretendardBold} from '~/style/Font';

function DefaultHeader({headerLeft, headerTitle, headerRight}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 15,
      }}>
      <View style={{flex: 0.5}}>{headerLeft}</View>
      <View style={{flex: 1}}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: FontPretendardBold,
            fontSize: 18,
            color: ColorBlack,
          }}>
          {headerTitle}
        </Text>
      </View>
      <View style={{flex: 0.5}}>{headerRight}</View>
    </View>
  );
}

export default DefaultHeader;
