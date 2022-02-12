import {StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {mystyle} from '~/style/Styles';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  section: {
    flex: 1,
  },
  textarea: {
    fontFamily: mystyle.font1,
    fontSize: mystyle.minFontSize,
    padding: 20,
  },
});
