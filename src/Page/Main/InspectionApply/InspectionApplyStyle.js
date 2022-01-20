import {StyleSheet, Platform} from 'react-native';
import {ColorWhite, ColorRed, ColorBlack} from '~/style/Color';
import {
  FontPretendardBold,
  FontPretendardRegular,
  FontPretendardMedium,
  FontPretendardLight,
} from '~/style/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  section: {
    marginBottom: 15,
  },
  wrapper: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: FontPretendardBold,
    fontSize: 15,
    marginBottom: 10,
  },
  error: {
    fontFamily: FontPretendardRegular,
    fontSize: 14,
    marginTop: 7,
    color: ColorRed,
  },
  input: {fontSize: 16, fontFamily: FontPretendardRegular, flex: 1},
  inputBox: {
    flex: 1,
    height: 55,
    // lineHeight: 22,
    // height: 44,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: Platform.OS == 'android' ? 0 : 15,
    alignItems: 'center',
  },
  listTitle: {
    fontFamily: FontPretendardMedium,
    fontSize: 15,
    lineHeight: 22,
    color: ColorBlack,
  },
  listSubTitle: {
    fontFamily: FontPretendardLight,
    fontSize: 13,
    lineHeight: 22,
    color: ColorBlack,
  },
});
