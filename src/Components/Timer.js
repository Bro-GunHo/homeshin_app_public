import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {mystyle as styles} from '~/style/Styles';

export default function Timer(props) {
  return (
    <CountDown
      size={7}
      until={props.items}
      onFinish={() => props.timeFinish()}
      // onChange={() => setTimes(props.items)}
      digitStyle={{backgroundColor: 'transparent'}}
      digitTxtStyle={{
        ...styles.font1,
        color: '#B71D22',
        fontSize: 13,
        ...props.style,
      }}
      separatorStyle={{
        ...styles.font1,
        color: '#B71D22',
        fontSize: 13,
        ...props.style,
      }}
      timeToShow={props.format === 'His' ? ['H', 'M', 'S'] : ['M', 'S']}
      timeLabels={{m: null, s: null}}
      showSeparator
    />
  );
}
