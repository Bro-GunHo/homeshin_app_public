import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {FontPretendardSemiBold} from '~/style/Font';
import CheckButton from './CheckButton';

function CheckSelector({status, onPress, label}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{flexDirection: 'row', alignItems: 'center'}}>
      <CheckButton status={status} onPress={onPress} />
      <Text
        style={{
          marginLeft: 10,
          fontFamily: FontPretendardSemiBold,
          fontSize: 15,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default CheckSelector;
