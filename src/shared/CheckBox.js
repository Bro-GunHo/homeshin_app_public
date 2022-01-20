import React, {useEffect, useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {mystyle, colors} from '../utils/Styles';
import Text from '../shared/Text';
import {HEAD, ICO_CHECK, ICO_CHECK_W} from '../utils/Icons';

const Shared = (props) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);
  const [readonly, setReadonly] = useState(props.readonly);

  useEffect(() => {
    if (typeof props.isChecked != 'undefined') setIsChecked(props.isChecked);
    if (typeof props.readonly != 'undefined') setReadonly(props.readonly);
  }, [props.isChecked, props.readonly]);

  return (
    <TouchableOpacity
      style={props.style ? props.style : styles.wrapper}
      onPress={() => {
        if (typeof props.onPress == 'function') props.onPress();
        else setIsChecked(!isChecked);
      }}>
      <View
        style={[
          readonly ? styles.inputReadonlyStyle : null,
          isChecked
            ? props.inputFocus
              ? props.inputFocus
              : styles.inputFocus
            : props.inputStyle
            ? props.inputStyle
            : styles.input,
          //props.txtLabel ? null : {height: '100%'},
        ]}>
        {isChecked ? (
          props.checkImage ? (
            props.checkImage
          ) : (
            <Image
              source={ICO_CHECK}
              style={{width: 8, resizeMode: 'contain'}}
            />
          )
        ) : null}
      </View>

      {!!props.txtLabel ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 5,
          }}>
          <Text style={props.labelStyle ? props.labelStyle : styles.label}>
            {props.txtLabel}
          </Text>
          {props.errTxt ? (
            <Text style={styles.errLabel}>{props.errTxt}</Text>
          ) : null}
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  label: {
    color: '#333333',
    lineHeight: 18,
    fontSize: 12,
  },
  labelFocus: {
    marginLeft: 5,
    color: mystyle.mainColor1,
    lineHeight: 18,
    fontSize: 12,
  },
  input: {
    width: 15,
    height: 15,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.lineTopColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputReadonlyStyle: {},
  inputFocus: {
    width: 15,
    height: 15,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.lineTopColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mystyle.mainColor1,
  },

  errLabel: {
    color: mystyle.mainColor1,
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 11,
    marginBottom: 5,
  },
});

export default Shared;
