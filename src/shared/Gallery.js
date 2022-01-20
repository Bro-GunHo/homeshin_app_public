import React, {Component, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Container, Content} from 'native-base';
import {HEAD} from '../utils/Icons';
import {colors, mystyle} from '../utils/Styles';

import GallerySwiper from 'react-native-gallery-swiper';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function gallery(props) {
  const [datas, setDatas] = React.useState(props.route.params.datas);
  const [initialPage, setInitialPage] = React.useState(
    props.route.params.initialPage ? props.route.params.initialPage : 0,
  );

  useEffect(() => {
    setDatas(props.route.params.datas);
    setInitialPage(props.route.params.initialPage);

    console.log(
      'gallery_data',
      props.route.params.datas,
      props.route.params.initialPage,
    );
  }, [props.route.params.datas, props.route.params.initialPage]);

  let olddatas = props.route.params.datas;

  // let datas = [];
  // for (const row of olddatas) {
  //   //console.log(element);
  //   let uri = row.uri ? row.uri : row.big;
  //   datas.push({uri: uri});
  // }

  //console.log(datas);

  // const datas = [
  //   // Version *1.1.0 update (or greater versions):
  //   // Can be used with different image object fieldnames.
  //   // Ex. source, source.uri, uri, URI, url, URL
  //   {
  //     uri:
  //       'https://luehangs.site/pic-chat-app-images/beautiful-blond-blonde-hair-478544.jpg',
  //   },
  //   // {
  //   //   source: require('yourApp/image.png'),
  //   //   // IMPORTANT: It is REQUIRED for LOCAL IMAGES
  //   //   // to include a dimensions field with the
  //   //   // actual width and height of the image or
  //   //   // it will throw an error.
  //   //   dimensions: {width: 1080, height: 1920},
  //   // },
  //   // {
  //   //   source: require('yourApp/image.png'),
  //   //   // Version *1.5.0 update (or greater versions):
  //   //   // An alternative to the dimensions field.
  //   //   // This will also be acceptable.
  //   //   width: 1080,
  //   //   height: 1920,
  //   // },
  //   {
  //     source: {
  //       uri:
  //         'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-women-beauty-40901.jpg',
  //     },
  //   },
  //   {
  //     uri:
  //       'https://luehangs.site/pic-chat-app-images/animals-avian-beach-760984.jpg',
  //   },
  //   {
  //     URI:
  //       'https://luehangs.site/pic-chat-app-images/beautiful-blond-fishnet-stockings-48134.jpg',
  //   },
  //   {
  //     url:
  //       'https://luehangs.site/pic-chat-app-images/beautiful-beautiful-woman-beauty-9763.jpg',
  //   },
  //   {
  //     URL:
  //       'https://luehangs.site/pic-chat-app-images/attractive-balance-beautiful-186263.jpg',
  //   },
  // ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={
              () => props.navigation.goBack()
              // ()=>props.navigation.reset({
              //   index: 0,
              //   routes: [{name: 'HOME'}],
              // })
            }>
            <View>
              <Image
                source={HEAD.BACK}
                style={{height: 44, resizeMode: 'contain'}}
              />
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 'bold',
                color: colors.scheduleColor,
              }}>
              갤러리
            </Text>
          </View>
          <View style={{width: 70}}></View>
        </View>
        <Content scrollEnabled={false} style={{backgroundColor: 'white'}}>
          <GallerySwiper
            images={datas}
            initialPage={initialPage}
            resizeMode={'contain'}
            sensitiveScroll={false}
            flatListProps={{extraData: datas}}
            // Version *1.15.0 update
            // onEndReached={() => {
            //     // add more images when scroll reaches end
            // }}
          />
        </Content>
      </Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
  },

  Text: {
    textAlign: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
    borderBottomColor: '#D7D7D7',
    borderBottomWidth: 1,
  },
});
