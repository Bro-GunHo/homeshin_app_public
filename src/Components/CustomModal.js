import React from 'react';
import {Modal, Text, View} from 'react-native';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
import {
  FontPretendardBold,
  FontPretendardLight,
  FontPretendardRegular,
} from '~/style/Font';
import CustomButton from './CustomButton';

function CustomModal({
  visible,
  setVisible,
  title,
  subTitle,
  cancelAction,
  confirmAction,
}) {
  return (
    <Modal
      visible={visible}
      setVisible={setVisible}
      onRequestClose={() => setVisible(false)}
      animationType="fade"
      transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 30,
        }}>
        <View
          style={{
            backgroundColor: ColorWhite,
            width: '100%',
            borderRadius: 5,
            padding: 30,
          }}>
          <View style={{paddingVertical: 30}}>
            <Text
              style={{
                color: ColorRed,
                fontFamily: FontPretendardBold,
                fontSize: 24,
                textAlign: 'center',
                marginBottom: 10,
              }}>
              {title}
            </Text>
            <Text
              style={{
                color: ColorBlack,
                fontFamily: FontPretendardLight,
                fontSize: 18,
                textAlign: 'center',
              }}>
              {subTitle}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30,
            }}>
            <CustomButton
              label="취소"
              labelColor={ColorRed}
              backgroundColor={ColorWhite}
              borderColor={ColorRed}
              onPress={cancelAction}
              flex={1}
              borderRadius={5}
            />
            <View style={{padding: 3}}></View>
            <CustomButton
              label="확인"
              labelColor={ColorWhite}
              backgroundColor={ColorRed}
              onPress={confirmAction}
              flex={1}
              borderRadius={5}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModal;
