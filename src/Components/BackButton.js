import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

function BackButton({navigation}) {
  return (
    <TouchableOpacity style={{padding: 5}} onPress={() => navigation.goBack()}>
      <Icon name="arrowleft" size={25} />
    </TouchableOpacity>
  );
}

export function BackHome({navigation}) {
  return (
    <TouchableOpacity
      style={{padding: 5}}
      onPress={() =>
        navigation.reset({
          index: 1,
          routes: [{name: 'Home'}],
        })
      }>
      <Icon name="arrowleft" size={25} />
    </TouchableOpacity>
  );
}

export default BackButton;
