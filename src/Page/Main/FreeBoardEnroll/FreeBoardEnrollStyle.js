import {StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {FontPretendardBold, FontPretendardRegular} from '~/style/Font';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorWhite,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    fontFamily: FontPretendardBold,
    fontSize: 15,
    marginBottom: 5,
  },
  subTitle: {
    fontFamily: FontPretendardRegular,
    fontSize: 13,
    color: '#999999',
  },
  input: {
    height: 55,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: '#E3E3E3',
    borderWidth: 1,
    fontFamily: FontPretendardRegular,
  },
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
