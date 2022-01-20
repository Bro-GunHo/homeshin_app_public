import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {FontPretendardSemiBold} from '~/style/Font';

function CustomButton({
  onPress,
  label,
  labelColor,
  labelSize,
  backgroundColor,
  borderRadius,
  borderColor,
  disabled,
  padding,
  flex,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        flex: flex,
        // paddingVertical: 15,
        height: 55,
        paddingHorizontal: padding,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        borderColor: borderColor,
        borderWidth: borderColor ? 1 : 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontSize: labelSize ? labelSize : 16,
          fontFamily: FontPretendardSemiBold,
          color: labelColor,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
