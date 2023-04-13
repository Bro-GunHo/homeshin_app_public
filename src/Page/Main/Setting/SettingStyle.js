import {StyleSheet} from 'react-native';
import {ColorWhite, ColorBlack} from '~/style/Color';
import {FontPretendardBold, FontPretendardMedium} from '~/style/Font';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: ColorWhite},
  title: {
    flex: 1,
    fontFamily: FontPretendardBold,
    fontSize: 15,
    color: ColorBlack,
  },
  titleSub: {
    flex: 1,
    fontFamily: FontPretendardMedium,
    fontSize: 15,
    color: '#878787',
  },
});
