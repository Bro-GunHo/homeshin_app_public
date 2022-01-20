import {StyleSheet} from 'react-native';
import {ColorBlack, ColorWhite} from '~/style/Color';
import {FontPretendardBold} from '~/style/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
    paddingHorizontal: 20,
  },
  section: {height: 220, width: '100%'},

  wrapper: {
    marginBottom: 10,
  },
  title: {
    fontSize: 15,
    fontFamily: FontPretendardBold,
    color: ColorBlack,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 5,
    padding: 15,
    marginVertical: 5,
    color: ColorBlack,
  },
});
