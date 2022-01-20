// @flow
import React, {Component, useEffect, useState} from 'react';
import {Platform, StyleSheet, View, TextInput} from 'react-native';
import {mystyle} from '../utils/Styles';
import Text from '../shared/Text';
import {HEAD} from '../utils/Icons';

const colors = {
  background: '#e3e3e3',
  dodgerBlue: 'rgb(58,139,255)',
  dusk: 'rgb(65,77,107)',
  cloudyBlue: 'rgb(175,194,219)',
  blueyGray: 'rgb(134,154,183)',
  paleGray: 'rgb(233,237,244)',
};

const textPaddingVertical = Platform.OS == 'ios' ? 15 : 10;

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: 'stretch',
    //flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  label: {
    color: '#333333',
    lineHeight: 18,
    marginBottom: 5,
    fontSize: 12,
  },
  labelFocus: {
    color: colors.dodgerBlue,
    lineHeight: 18,
    marginBottom: 5,
    fontSize: 12,
  },
  input: {
    alignSelf: 'stretch',

    color: colors.dusk,
    //fontFamily: mystyle.font,
    fontSize: 14,
    lineHeight: 17,
    marginVertical: 0,
    //paddingVertical: textPaddingVertical,
    height: 44,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgb(233,237,244)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    //textAlignVertical: 'center',
  },
  inputReadonlyStyle: {
    backgroundColor: colors.paleGray,
  },
  inputFocus: {
    alignSelf: 'stretch',
    color: colors.dusk,
    //fontFamily: mystyle.font,
    fontSize: 14,
    lineHeight: 17,
    //paddingVertical: 10,
    paddingHorizontal: 20,
    //paddingVertical: textPaddingVertical,
    height: 44,
    borderWidth: 1,
    borderColor: colors.dodgerBlue,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  errLabel: {
    //color: mystyle.mainColor1,
    color: 'red',
    fontSize: 12,
    lineHeight: 18,
    marginLeft: 11,
    marginBottom: 5,
    flexWrap: 'wrap',
  },
});

const Shared = (props) => {
  const defaultProps = {
    style: props.style ? props.style : null,
    labelStyle: props.labelStyle ? props.labelStyle : styles.label,
    labelStyleFocus: props.labelStyleFocus
      ? labelStyleFocus
      : styles.labelFocus,
    readonly: props.readonly ? props.readonly : false,
    multiline: props.multiline ? props.multiline : false,
    txtLabel: props.txtLabel ? props.txtLabel : '',
    inputStyle: props.inputStyle ? props.inputStyle : null,
    inputFocus: props.inputFocus ? props.inputFocus : false,
    inlineButton: props.inlineButton ? props.inlineButton : false,
    inputReadonlyStyle: props.inputReadonlyStyle
      ? props.inputReadonlyStyle
      : styles.inputReadonlyStyle,
    errorPosition: props.errorPosition ? props.errorPosition : 'top',
  };

  const [focused, setFocused] = useState(false);
  const [readonly, setReadonly] = useState(props.readonly);

  useEffect(() => {
    setReadonly(props.readonly);
    //setFocused(false);
    //setReadonly(defaultProps.readonly);
  }, [props.readonly]);

  // constructor(props: Props) {
  //   super(props);
  //   this.state = {
  //     focused: false,
  //     readonly: this.props.readonly,
  //   };
  // }

  return (
    <View style={{...styles.wrapper, ...defaultProps.style}}>
      {!!props.txtLabel ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
          }}>
          <Text
            style={
              focused ? defaultProps.labelStyleFocus : defaultProps.labelStyle
            }>
            {props.txtLabel}
          </Text>
          {props.errTxt && defaultProps.errorPosition == 'top' ? (
            <Text style={styles.errLabel}>{props.errTxt}</Text>
          ) : null}
        </View>
      ) : null}
      <TextInput
        style={[
          readonly ? defaultProps.inputReadonlyStyle : null,
          focused
            ? defaultProps.inputFocus
              ? defaultProps.inputFocus
              : styles.inputFocus
            : defaultProps.inputStyle
            ? defaultProps.inputStyle
            : styles.input,
          props.txtLabel ? null : {height: '100%'},
        ]}
        multiline={defaultProps.multiline}
        onChangeText={props.onTextChanged}
        value={props.txt}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          if (typeof props.onBlur == 'function') props.onBlur();
          setFocused(false);
        }}
        placeholder={props.txtHint}
        placeholderTextColor={props.placeholderTextColor}
        textAlignVertical={defaultProps.multiline ? 'top' : 'center'}
        secureTextEntry={props.isPassword}
        keyboardType={!!props.keyboardType ? props.keyboardType : 'default'}
        maxLength={!!props.maxLength ? props.maxLength : 9999999}
        editable={!!readonly ? false : true}
        onPressIn={props.onPressIn ? props.onPressIn : () => {}}
        pointerEvents={props.pointerEvents ? props.pointerEvents : null}
        autoCorrect={false}
      />

      {props.inlineButton ? props.inlineButton : null}

      <View>
        {props.errTxt && defaultProps.errorPosition == 'bottom' ? (
          <Text style={styles.errLabel}>{props.errTxt}</Text>
        ) : null}
      </View>
    </View>
  );
};

export default Shared;
