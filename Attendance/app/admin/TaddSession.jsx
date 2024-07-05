import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SetDate from '../../components/SetDate';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { addSession } from '../../context/api';
import { AuthContext } from '../../context/AuthContext';

const AddSession = () => {
  const { state } = useContext(AuthContext);
  const [course, setCourse] = useState('');
  const [instructor, setInstructor] = useState('');
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartTime = (selectedTime) => {
    setStartTime(selectedTime);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (selectedTime) => {
    setEndTime(selectedTime);
    hideEndTimePicker();
  };

  const handleAddSession = async () => {
    if (!course || !instructor || !date || !startTime || !endTime) {
      Alert.alert('Error', 'All fields must be filled');
      return;
    }

    const formattedDate = date.toISOString().split('T')[0];
    const formattedStartTime = startTime.toTimeString().split(' ')[0];
    const formattedEndTime = endTime.toTimeString().split(' ')[0];

    const session = {
      courseId: course,
      instructor,
      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      createdBy: state.user.uid,
      createdAt: new Date(),
    };

    try {
      await addSession(session);
      Alert.alert('Success', 'Session added successfully!');
      setCourse('');
      setInstructor('');
      setDate(null);
      setStartTime(null);
      setEndTime(null);
    } catch (error) {
      console.error('Error adding session: ', error);
      Alert.alert('Error', 'Failed to add session. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container} className="px-7">
      <View style={styles.form}>
        <Text style={styles.title}>Add Session</Text>
        <TextInput
          style={styles.input}
          placeholder="Course"
          value={course}
          onChangeText={setCourse}
        />
        <TextInput
          style={styles.input}
          placeholder="Instructor"
          value={instructor}
          onChangeText={setInstructor}
        />
        <SetDate date={date} setDate={setDate} title="Select Date" />
        <View style={styles.timePickerContainer}>
          <Text style={styles.label}>Select Start Time</Text>
          <TouchableOpacity onPress={showStartTimePicker} style={styles.timeButton}>
            <Text style={styles.timeText}>
              {startTime ? startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Start Time'}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isStartTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmStartTime}
          onCancel={hideStartTimePicker}
        />
        <View style={styles.timePickerContainer}>
          <Text style={styles.label}>Select End Time</Text>
          <TouchableOpacity onPress={showEndTimePicker} style={styles.timeButton}>
            <Text style={styles.timeText}>
              {endTime ? endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select End Time'}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isEndTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmEndTime}
          onCancel={hideEndTimePicker}
        />
        <TouchableOpacity onPress={handleAddSession} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add Session</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  timePickerContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  timeButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddSession;
