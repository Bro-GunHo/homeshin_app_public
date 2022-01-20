import React from 'react';
import {Modal, Text, View, TouchableOpacity} from 'react-native';
import {ColorBlack, ColorRed, ColorWhite} from '~/style/Color';
import {
  FontPretendardBold,
  FontPretendardLight,
  FontPretendardRegular,
} from '~/style/Font';
import CustomButton from './CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import {FontPretendardSemiBold} from '~/style/Font';

function CustomModalFile({
  visible,
  setVisible,
  title,
  subTitle,
  cancelAction,
  confirmAction,
  closeAction,
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              // paddingHorizontal: 30,
            }}>
            <TouchableOpacity
              onPress={confirmAction}
              style={{
                flex: 1,
                // paddingVertical: 15,
                backgroundColor: ColorWhite,
                borderRadius: 5,
                borderColor: ColorRed,
                borderWidth: 1,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="camerao" size={20} color={ColorRed} />
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: FontPretendardSemiBold,
                  color: ColorRed,
                }}>
                {title}
              </Text>
            </TouchableOpacity>
            <View style={{padding: 3}}></View>
            <TouchableOpacity
              onPress={cancelAction}
              style={{
                flex: 1,
                // paddingVertical: 15,
                backgroundColor: ColorRed,
                borderRadius: 5,
                // borderColor: ColorRed,
                // borderWidth: 1,
                height: 100,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="picture" size={20} color={ColorWhite} />
              <Text
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 16,
                  fontFamily: FontPretendardSemiBold,
                  color: ColorWhite,
                }}>
                {subTitle}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <CustomButton
              label="취소"
              labelColor={ColorBlack}
              backgroundColor={ColorWhite}
              borderColor={'#E3E3E3'}
              onPress={closeAction}
              borderRadius={5}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModalFile;
