import React from 'react';
import {Text} from 'react-native';
import {mystyle} from '../style/Styles';

// import { Container } from './styles';

export const MyText = (props) => {
  let ff =
    typeof props.fonts != 'undefined'
      ? props.fonts
      : props.eng
      ? mystyle.font2
      : mystyle.font1;

  let defStyle = {fontFamily: ff, color: '#333333'};
  let newStyle;

  if (typeof props.style == 'object') newStyle = [defStyle, props.style];
  else newStyle = defStyle;

  return (
    <Text
      style={newStyle}
      numberOfLines={props.numberOfLines ? props.numberOfLines : null}>
      {props.children}
    </Text>
  );
};
