import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ColorRed, ColorWhite} from '~/style/Color';

function CheckButton({status, onPress, size = 14}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: status ? ColorRed : '#E5E5E5',
          padding: 5,
          borderRadius: 50,
        }}>
        <Icon name="check" color={ColorWhite} size={size} />
      </View>
    </TouchableOpacity>
  );
}

export default CheckButton;
