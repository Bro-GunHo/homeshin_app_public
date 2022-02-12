import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
// 안드로이드 백버튼 제어

import CusWebview from '~/shared/cusWebview';
import Api from '~/Api';
import BackButton from '~/Components/BackButton';
import DefaultHeader from '~/Components/DefaultHeader';

export default function myWebView(props) {
  const {navigation, route} = props;

  console.log('route', route);

  //   React.useEffect(() => {
  //     const unsubscribe = navigation.addListener('blur', () => {
  //       //console.log('blur');
  //       removeAndroidBackButtonHandler(handleBackButton);
  //     });

  //     return unsubscribe;
  //   }, []);

  const [url, setUrl] = React.useState(
    Api.state.url +
      '/word/word.php?pr_idx=' +
      route.params.pr_idx +
      '&app_login=Y',
  );

  //   React.useEffect(() => {
  //     if (props.route && props.route.params && props.route.params.isReset)
  //       setUrl(Api.state.url + '/word/word.php?pr_idx=' + route.params.pr_idx);
  //   }, [props]);

  const token = Api.state.mb_fcm;
  const [actMenu, setActMenu] = React.useState('');
  const [headerTitle, setHeaderTitle] = React.useState('트레이너');

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <DefaultHeader
        headerLeft={<BackButton navigation={navigation} />}
        headerTitle={'결과 보고서 미리보기'}
      />
      <CusWebview
        url={url}
        token={token}
        headerTitle={headerTitle}
        // actMenu={actMenu}
        navigation={navigation}
      />
    </SafeAreaView>
  );
}
