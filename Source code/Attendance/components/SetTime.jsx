import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SetTime = ({ title, onTimeChange }) => {
  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(Platform.OS === 'ios');
    setTime(currentTime);
    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    onTimeChange(formattedTime);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <View style={styles.timePickerContainer}>
        <TouchableOpacity onPress={showTimepicker} style={styles.item}>
          <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
          onTouchCancel={() => setShow(false)} // Close the picker on cancel
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  timePickerContainer: {
    marginTop: 15,
    marginBottom: 5,
    height: 30,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTime: {
    marginTop: 20,
    fontSize: 18,
  },
  item: {
    paddingStart: 10,
  },
});

export default SetTime;
