import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/AntDesign';
import {ColorWhite} from '~/style/Color';

function ImageCard({item, removeHandle, popup, navigation, keys}) {
  const onPressGallery = (uri) => {
    navigation.navigate('GalleryDetail', {
      total: 1,
      index: 0,
      arrItems: [uri],
    });
  };

  return (
    <View
      style={{
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginRight: 10,
        overflow: 'hidden',
      }}
      key={'image_key_' + keys ? keys : item.id}>
      <TouchableOpacity
        style={{width: '100%', height: '100%'}}
        disabled={!popup}
        onPress={() => onPressGallery(item.uri)}>
        <FastImage source={item} style={{width: '100%', height: '100%'}} />
      </TouchableOpacity>
      {removeHandle ? (
        <TouchableOpacity
          style={{position: 'absolute', top: 5, right: 5}}
          onPress={removeHandle}>
          <Icon name="close" color={ColorWhite} size={16} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default ImageCard;
