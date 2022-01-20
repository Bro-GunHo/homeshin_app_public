import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {FontPretendardSemiBold} from '~/style/Font';

/*
 content에는 컴포넌트가 들어갑니다.
*/

function AccordionCard({label, content, goShow}) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsShow(goShow);
  }, [goShow]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setIsShow((prev) => !prev)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopWidth: 1,
            borderColor: '#E2E2E2',
            paddingHorizontal: 20,
            paddingVertical: 15,
          }}>
          <Text style={{fontFamily: FontPretendardSemiBold, fontSize: 15}}>
            {label}
          </Text>
          <Icon name={isShow ? 'up' : 'down'} size={15} />
        </View>
      </TouchableWithoutFeedback>
      {isShow && (
        <View style={{borderTopWidth: 1, borderColor: '#E2E2E2', padding: 20}}>
          {content}
        </View>
      )}
    </View>
  );
}

export default AccordionCard;
