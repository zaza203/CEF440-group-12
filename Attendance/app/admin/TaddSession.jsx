
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import SetDate from '../../components/SetDate';
import { AuthContext } from '../../context/AuthContext';
import { getFirestore,collection, addDoc } from 'firebase/firestore';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const AddSession = () => {
  const { state } = useContext(AuthContext);
  const [course, setCourse] = useState('');
  const [instructor, setInstructor] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const firestore = getFirestore();

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (selectedTime) => {
    setTime(selectedTime);
    hideTimePicker();
  };

  const handleAddSession = async () => {
    if (!course || !instructor || !date || !time) {
      Alert.alert('Error', 'All fields must be filled');
      return;
    }

    const startTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );

    try {
      await addDoc(collection(firestore, 'sessions'), {
        course,
        instructor,
        startTime,
        createdBy: state.user.uid,
        createdAt: new Date(),
      });
      Alert.alert('Success', 'Session added successfully!');
      setCourse('');
      setInstructor('');
      setDate(null);
      setTime(null);
    } catch (error) {
      console.error('Error adding session: ', error);
      Alert.alert('Error', 'Failed to add session. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          placeholder="Intructor"
          value={instructor}
          onChangeText={setInstructor}
        />
        <SetDate date={date} setDate={setDate} title="Select Date" />
        <View style={styles.timePickerContainer}>
          <Text style={styles.label}>Select Time</Text>
          <TouchableOpacity onPress={showTimePicker} style={styles.timeButton}>
            <Text style={styles.timeText}>
              {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Select Time'}
            </Text>
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirmTime}
          onCancel={hideTimePicker}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  form: {
    marginTop: 20,
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
