import {StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {FontPretendardBold} from '~/style/Font';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: ColorWhite},
  label: {
    fontSize: 15,
    fontFamily: FontPretendardBold,
    marginVertical: 5,
  },
  textarea: {
    fontSize: 13,
    fontFamily: FontPretendardBold,
    marginVertical: 5,
  },
});
