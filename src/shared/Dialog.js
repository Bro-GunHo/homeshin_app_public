import React, {Component, useEffect, useState} from 'react';
import {View, Button, StyleSheet, Text, NativeModules} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogFooter,
  SlideAnimation,
  DialogContent,
  DialogButton,
} from 'react-native-popup-dialog';
//import Modal from 'react-native-modal';

// import Modal, {
//   ModalContent,
//   SlideAnimation,
//   ModalButton,
//   ModalFooter,
//   ModalTitle,
// } from 'react-native-modals';

import {colors, mystyle} from '../utils/Styles';

/*
props
@visible : boolean 필수값
@close : function 필수값  닫기 함수

*/

export default function preload(props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    console.log(props.visible);

    setVisible(props.visible);
  }, [props.visible]);

  return (
    <View pointerEvents="box-none">
      <Dialog
        visible={visible}
        width={props.width ? props.width : null}
        height={props.height ? props.height : null}
        containerStyle={{zIndex: 10, elevation: 10}}
        onTouchOutside={() => props.close()}
        dialogTitle={
          props.dialogTitle === null ? null : (
            <DialogTitle
              title={props.dialogTitle}
              textStyle={{fontSize: mystyle.defFontSize}}
            />
          )
        }
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
            useNativeDriver: true,
          })
        }
        onHardwareBackPress={() => {
          props.close();
          return true;
        }}
        footer={
          !props.hideFooter ? (
            typeof props.ok == 'function' ? (
              <DialogFooter>
                <DialogButton
                  text="취소"
                  onPress={() => props.close()}
                  textStyle={{fontSize: mystyle.defFontSize, color: '#8d8d8d'}}
                  style={{flex: 1}}
                />
                <DialogButton
                  text="연결해제"
                  onPress={() => props.ok()}
                  textStyle={{fontSize: mystyle.defFontSize, color: '#8d8d8d'}}
                  style={{flex: 1}}
                />
              </DialogFooter>
            ) : (
              <DialogFooter>
                <DialogButton
                  text="닫기"
                  onPress={() => props.close()}
                  textStyle={{fontSize: mystyle.defFontSize, color: '#8d8d8d'}}
                  style={{flex: 1}}
                />
              </DialogFooter>
            )
          ) : null
        }>
        <DialogContent>
          {props.content ? (
            props.content
          ) : (
            <View style={styles.dialog}>
              <View style={styles.dialogItem}>
                <TouchableOpacity onPress={() => console.log('1')}>
                  <Text>1</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dialogItem}>
                <TouchableOpacity onPress={() => console.log('2')}>
                  <Text>2</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.dialogItem}>
                <TouchableOpacity onPress={() => console.log('3')}>
                  <Text>3</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </DialogContent>
      </Dialog>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    flexDirection: 'column',
    borderTopColor: colors.lineColor,
    borderTopWidth: 1,
  },
  /* 다이얼로그 */
  dialog: {
    width: 250,
    height: 'auto',
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  dialogItem: {padding: 20, fontSize: mystyle.defFontSize},
});
