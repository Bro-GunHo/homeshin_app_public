import {StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {FontPretendardBold} from '~/style/Font';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: ColorWhite},
  title: {
    flex: 1,
    fontFamily: FontPretendardBold,
    fontSize: 15,
  },
});
