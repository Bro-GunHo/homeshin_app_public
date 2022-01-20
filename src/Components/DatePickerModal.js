import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {ColorRed, ColorWhite} from '~/style/Color';
import {
  FontPretendardBold,
  FontPretendardLight,
  FontPretendardMedium,
  FontPretendardRegular,
} from '~/style/Font';
import weekday from 'dayjs/plugin/weekday';
import isoWeek from 'dayjs/plugin/isoWeek';
dayjs.extend(weekday);
dayjs.extend(isoWeek);

const daysLabel = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const today = dayjs(); //오늘
// const minDate = today.startOf('date'); //00시로만듬

function DatePickerModal({visible, setVisible, setValue, value, type}) {
  const [now, setNow] = useState(dayjs());
  const [days, setDays] = useState([]);

  const [select, setSelect] = useState();

  const [minDate, setMinDate] = useState(today.startOf('date'));

  useEffect(() => {
    if (value) {
      let d = dayjs(value).date();
      setSelect(d);
    }
  }, [value]);

  useEffect(() => {
    console.log('type@@@@@', type);
    if (type && type == 'inspection') {
      setMinDate(today.startOf('date')); //00시로만듬
    } else {
      setMinDate(today.subtract(6, 'month').startOf('date')); //6개월 전 00시로만듬
    }
  }, []);

  const caculateDays = () => {
    const daysInMonth = now.daysInMonth(); // 이번달 마지막 일 (28,29,30,31)
    const daysInPrevMonth = now.subtract(1, 'month').daysInMonth(); // 저번달 마지막 일
    const startDayOfWeek = now.date(1).day(); // 일=0,월=1,화=2,수=3,목=4,금=5,토=6

    console.log(
      '이번달, 저번달, 요일시작',
      daysInMonth,
      daysInPrevMonth,
      startDayOfWeek,
      minDate,
    );
    const dayArr = [];
    for (let i = 0; i <= 42; i++) {
      if (i < startDayOfWeek) {
        let days = daysInPrevMonth - startDayOfWeek + i + 1;
        dayArr.push({
          type: 'prev',
          day: days,
          ymd: dayjs(now).subtract(1, 'month').format('YYYY-MM') + '-' + days,
        }); // 전달 뒷부분
      } else if (i >= startDayOfWeek && i < daysInMonth + startDayOfWeek) {
        let days = i - startDayOfWeek + 1;
        let daysString = days > 9 ? days : '0' + days;
        dayArr.push({
          type: 'now',
          day: days,
          ymd: dayjs(now).format('YYYY-MM') + '-' + daysString,
        }); // 이번달
      } else {
        let days = i - daysInMonth - startDayOfWeek + 1;
        let daysString = days > 9 ? days : '0' + days;
        dayArr.push({
          type: 'next',
          day: days,
          ymd: dayjs(now).add(1, 'month').format('YYYY-MM') + '-' + daysString,
        }); // 다음달 앞부분
      }
    }
    console.log(dayArr);
    const monthArr = [];
    for (let i = 0; i <= 5; i++) {
      monthArr.push(dayArr.slice(i * 7, 7 * (i + 1)));
    }
    setDays(monthArr);
  };

  const prevDate = () => {
    const date = dayjs(now).subtract(1, 'month');
    setSelect();
    setNow(date);
  };

  const nextDate = () => {
    const date = dayjs(now).add(1, 'month');
    setSelect();
    setNow(date);
  };

  const onClose = () => {
    // const date = now.format('YYYY-MM') + `-${select}`;
    // console.log(date);
    setNow(dayjs());
    setVisible(false);
  };

  const onSelect = (v, ymd) => {
    setSelect(v);
    setValue(ymd);
    setVisible(false);
  };

  useEffect(() => {
    caculateDays();
  }, [now]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            backgroundColor: ColorWhite,
            padding: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: 10,
            }}>
            <TouchableOpacity style={{padding: 5}} onPress={onClose}>
              <Icon name="close" size={24} />
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: FontPretendardBold,
                fontSize: 24,
              }}>
              <Text style={{color: ColorRed}}>점검 날짜</Text>를 선택해 주세요
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 30,
            }}>
            <TouchableOpacity onPress={prevDate}>
              <Icon name="left" size={18} />
            </TouchableOpacity>
            <Text
              style={{
                paddingHorizontal: 30,
                fontFamily: FontPretendardMedium,
                fontSize: 18,
              }}>
              {now.format('YYYY년 MM월')}
            </Text>
            <TouchableOpacity onPress={nextDate}>
              <Icon name="right" size={18} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={style.wrapper}>
              {daysLabel.map((item, index) => (
                <Text
                  key={`days-${item}${index}`}
                  style={[style.days, {flex: 1, color: '#919191'}]}>
                  {item}
                </Text>
              ))}
            </View>
            {days.length > 0 &&
              days.map((item, index) => (
                <View key={`week-${index}`} style={style.wrapper}>
                  {item.map((deepitem, deepindex) => (
                    <TouchableOpacity
                      key={`days-${deepitem}${deepindex}`}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      disabled={deepitem.type != 'now'}
                      onPress={() => {
                        // console.log(
                        //   deepitem.type,
                        //   dayjs(deepitem.ymd, 'YYYY-MM-DD'),
                        //   minDate,
                        //   dayjs(deepitem.ymd, 'YYYY-MM-DD') > minDate,
                        // );
                        if (deepitem.type == 'now') {
                          if (dayjs(deepitem.ymd, 'YYYY-MM-DD') > minDate) {
                            onSelect(deepitem.day, deepitem.ymd);
                          }
                        }
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 25,
                          height: 25,
                          borderRadius: 50,
                          backgroundColor:
                            deepitem.type === 'now' && deepitem.day === select
                              ? '#FFD4D4'
                              : ColorWhite,
                        }}>
                        <Text
                          style={[
                            style.days,
                            {
                              color:
                                deepitem.type === 'now'
                                  ? deepindex === 0
                                    ? '#FF0000'
                                    : deepindex === 6
                                    ? '#0060EE'
                                    : '#222222'
                                  : '#EEEEEE',
                            },
                          ]}>
                          {deepitem.day}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  days: {
    fontFamily: FontPretendardRegular,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default DatePickerModal;
