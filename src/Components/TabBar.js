import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ColorBlack, ColorRed} from '~/style/Color';
import {FontPretendardBold} from '~/style/Font';

/*
  list = {label: string, value: value} label은 보이는 텍스트, 키는 선택을 위한 값.
  value = 현재 선택된 값.
  setvalue = 값을 변경 해주는 함수.
*/

function TabBar({list, setValue, value}) {
  console.log(list, value);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      {list.map((item) => (
        <TouchableOpacity
          value={item.value}
          style={{
            flex: 1,
            borderBottomWidth: value === item.value ? 2 : 1,
            borderColor: value === item.value ? ColorRed : '#E2E2E2',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 15,
          }}
          onPress={() => setValue(item.value)}
          key={'TBTouch_' + item.key ? item.key : value}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: FontPretendardBold,
              color: value === item.value ? ColorRed : ColorBlack,
            }}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default TabBar;
