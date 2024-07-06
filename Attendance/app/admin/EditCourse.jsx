import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import CustomDropdown from '../../components/CustomDropDown';
import { AuthContext } from '../../context/AuthContext';
import { editCourse } from '../../context/api';

const EditCourse = ({ route, navigation }) => {
  const { course } = route.params;

  const [form, setForm] = useState({
    code: course.courseId,
    title: course.name,
    lecturer: course.lecturer,
    department: course.department,
  });

  const handleSaveCourse = async () => {
    try {
      const updatedCourse = {
        courseId: form.code,
        name: form.title,
        department: form.department,
        lecturer: form.lecturer,
      };
      const response = await editCourse(updatedCourse);
      if (response.status === 200) {
        Alert.alert('Success', 'Course updated successfully');
        navigation.goBack();
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
          smallStyle="text-gray-400"
          editable={false}
        />
        <FormField
          title="Course Title"
          placeholder="Enter course title"
          value={form.title}
          handleChangeText={(value) => setForm({ ...form, title: value })}
          otherStyles="mt-1"
        />
        <FormField
          title="Lecturer"
          placeholder="Select Lecturer"
          value={form.lecturer}
          handleChangeText={(value) => setForm({ ...form, lecturer: value })}
          otherStyles="mt-1"
        />
        <FormField
          title="Department"
          placeholder="Enter course department"
          value={form.department}
          handleChangeText={(value) => setForm({ ...form, department: value })}
          otherStyles="mt-1"
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
    marginTop: 5,
  },
};

export default EditCourse;
