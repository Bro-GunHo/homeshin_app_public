import {StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontFamily: FontPretendardBold,
    fontSize: 15,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    fontFamily: FontPretendardRegular,
    color: '#5D5D5D',
    marginBottom: 10,
  },
  subLabel: {
    fontSize: 13,
    fontFamily: FontPretendardRegular,
    color: '#5D5D5D',
    marginLeft: 35,
  },
  wrapper: {
    flexDirection: 'row',
  },
  input: {fontSize: 16, fontFamily: FontPretendardRegular},
  inputBox: {
    flex: 1,
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
});
