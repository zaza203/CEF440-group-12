import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropDown';
import { AuthContext } from '../../context/AuthContext';
import { editCourse } from '../../context/api'; // Assuming you have an editCourse function in your API

const EditCourse = ({ route, navigation }) => {
  const { course } = route.params; // Get course data from navigation params
  const { fetchAllUsers } = useContext(AuthContext);

  const [form, setForm] = useState({
    code: course.courseId,
    title: course.name,
    lecturer: '', // Assuming lecturer will be updated separately
    department: course.department,
  });

  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    try {
      const users = await fetchAllUsers();
      if (users && users.lecturers) {
        setLecturers(users.lecturers.map((lecturer) => lecturer.email));
      } else {
        Alert.alert('Error', 'Failed to fetch lecturers');
      }
    } catch (error) {
      console.error('Error fetching lecturers', error);
      Alert.alert('Error', 'Failed to fetch lecturers');
    }
  };

  const handleSaveCourse = async () => {
    try {
      const updatedCourse = {
        courseId: form.code,
        name: form.title,
        department: form.department,
        lecturer: form.lecturer,
      };
      const response = await editCourse(updatedCourse); // Call editCourse API
      if (response.status === 200) {
        Alert.alert('Success', 'Course updated successfully');
        navigation.goBack(); // Navigate back after successful update
      } else {
        Alert.alert('Error', 'Failed to update course');
      }
    } catch (error) {
      console.error('Error updating course', error);
      Alert.alert('Error', 'Failed to update course');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Edit Course</Text>
        <FormField
          title="Course Code"
          placeholder="Enter course code"
          value={form.code}
          onChangeText={(value) => setForm({ ...form, code: value })}
          otherStyles="mt-1"
          keyboardType="email-address"
        />
        <FormField
          title="Course Title"
          placeholder="Enter course title"
          value={form.title}
          onChangeText={(value) => setForm({ ...form, title: value })}
          otherStyles="mt-2"
        />
        <CustomDropdown
          title="Lecturer"
          data={lecturers}
          onSelect={(lecturer) => setForm({ ...form, lecturer })}
          placeholder="Select Lecturer"
          value={form.lecturer}
          otherStyles="mt-2"
        />
        <FormField
          title="Department"
          placeholder="Enter course department"
          value={form.department}
          onChangeText={(value) => setForm({ ...form, department: value })}
          otherStyles="mt-2"
        />
        <View style={styles.buttonContainer}>
            <CustomButton
                title="Save"
                handlepress={handleSaveCourse}
                containerStyles="mt-1 w-[250]"
            />
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    // paddingTop: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
};

export default EditCourse;
