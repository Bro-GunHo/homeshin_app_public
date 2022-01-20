import {StyleSheet} from 'react-native';
import {ColorRed, ColorWhite} from '~/style/Color';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';

export const style = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: ColorWhite,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  section: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleWrapper: {
    width: '100%',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    top: -5,
  },
  circle: {
    borderRadius: 50,
    backgroundColor: ColorRed,
    padding: 2,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: FontPretendardBold,
  },
  subTitle: {
    marginVertical: 10,
    fontSize: 15,
    fontFamily: FontPretendardRegular,
  },
});
