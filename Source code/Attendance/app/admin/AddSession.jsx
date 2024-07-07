import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomDropdown from '../../components/CustomDropDown';
import CustomButton from '../../components/CustomButton';
import SetTime from '../../components/SetTime';
import { addSession } from '../../context/api';

const AddSession = () => {
  const navigation = useNavigation();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedLecturer, setSelectedLecturer] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState(new Date());
  const Lecturers = ['Dr. Nkemani', 'Dr. Nguti', 'Dr. Djouela', 'Dr. Tsague', 'Dr. Sop', 'Dr. Fenji', 'Dr. Fonzi'];
  const Courses = ['CEF440', 'CEF476', 'CEF444', 'CEF438', 'CEF450'];

  const handleAddSession = async () => {
    try {
      const session = {
        lecturer: selectedLecturer,
        courseId: selectedCourse,
        date: date.toISOString().split('T')[0],
        startTime: startTime,
        endTime: endTime
      };
      await addSession(session);
      Alert.alert('Success', 'Session added successfully');
      router.back("Dashboard");
    } catch (error) {
      Alert.alert('Error', 'Failed to add session');
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="mx-2">
        <CustomDropdown
          data={Courses}
          placeholder="Course"
          onSelect={(item) => setSelectedCourse(item)}
        />
        <CustomDropdown
          data={Lecturers}
          placeholder="Lecturer"
          onSelect={(item) => setSelectedLecturer(item)}
        />
        <SetTime title="Start Time" onTimeChange={setStartTime} />
        <SetTime title="End Time" onTimeChange={setEndTime} />
        <CustomButton 
          title="Add"
          handlepress={handleAddSession}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    paddingHorizontal: 20,
  }
});

export default AddSession;
