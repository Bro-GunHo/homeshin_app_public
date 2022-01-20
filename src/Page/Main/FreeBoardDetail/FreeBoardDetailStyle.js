import {StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {FontPretendardRegular, FontPretendardSemiBold} from '~/style/Font';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: ColorWhite},
  section: {marginHorizontal: 20, paddingVertical: 20},
  title: {
    fontFamily: FontPretendardSemiBold,
    lineHeight: 20,
    fontSize: 16,
  },
  subTitle: {fontFamily: FontPretendardRegular, fontSize: 13},
  content: {fontFamily: FontPretendardRegular, fontSize: 14},
  image: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
    overflow: 'hidden',
  },
});
