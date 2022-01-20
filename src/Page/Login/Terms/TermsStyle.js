import {Dimensions, StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {FontPretendardBold} from '~/style/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  label: {
    fontSize: 15,
    fontFamily: FontPretendardBold,
    marginVertical: 5,
  },
  scrollWrap: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
  },
  selectWrap: {
    marginVertical: 5,
  },
});
