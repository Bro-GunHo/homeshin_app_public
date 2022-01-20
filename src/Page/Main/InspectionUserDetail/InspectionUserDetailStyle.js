import {StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 15,
    fontFamily: FontPretendardBold,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: FontPretendardRegular,
  },
});
