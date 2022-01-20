import {StyleSheet} from 'react-native';
import {ColorBlack} from '~/style/Color';
import {
  FontPretendardBold,
  FontPretendardMedium,
  FontPretendardSemiBold,
} from '~/style/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  section: {
    flex: 1,
  },
  title: {
    fontFamily: FontPretendardSemiBold,
    fontSize: 41,
    color: ColorBlack,
  },
  subTitle: {
    fontFamily: FontPretendardSemiBold,
    fontSize: 16,
    color: '#878787',
    marginVertical: 2,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  TitleWrap: {
    justifyContent: 'center',
    marginLeft: 5,
  },

  buttonTitle: {
    fontFamily: FontPretendardSemiBold,
    fontSize: 15,
    color: ColorBlack,
    marginBottom: 3,
  },
  buttonSubTitle: {
    fontFamily: FontPretendardMedium,
    fontSize: 10,
    color: '#AAAAAA',
  },
});
