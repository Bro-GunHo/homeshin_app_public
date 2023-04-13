import {StyleSheet} from 'react-native';
import {ColorWhite} from '~/style/Color';
import {
  FontPretendardRegular,
  FontPretendardSemiBold,
  FontPretendardBold,
} from '~/style/Font';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#ffffff'},
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#E3E3E3',
    paddingVertical: 10,
  },
  section: {
    marginVertical: 5,
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
});
