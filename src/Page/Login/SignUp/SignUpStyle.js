import {StyleSheet} from 'react-native';
import {ColorBlack, ColorWhite} from '~/style/Color';
import {FontPretendardBold} from '~/style/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 16,
  },
});
