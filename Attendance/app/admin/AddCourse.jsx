import { View, Text, Alert } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { addCourse } from '../../context/api';

const AddCourse = () => {

    const [form, setForm] = useState({
        code: '',
        title: '',
        lecturer: '',
        department: '',
      });

      const [courses, setCourses] = useState([]);
      const [lecturers, setLecturers] = useState([]);

      useEffect(() => {
        fetchCourses();
      }, []);

      const fetchCourses = async () => {
        try {
            const response = await getAllCourses();
            if (response.status === 200) {
                setCourses(response.data);
            } else {
                Alert.alert('Error', 'Failed to fetch courses');
            }
        } catch (error) {
            console.error('Error fetching courses', error);
            Alert.alert('Error', 'Failed to fetch courses');
        }
      };

      const fetchCoursesByLecturer = async (lecturer) => {
        try {
          const response = await getCoursesByLecturer(lecturer);
          if (response.status === 200) {
            setCourses(response.data);
          } else {
            Alert.alert('Error', 'Failed to fetch courses');
          }
        } catch (error) {
          console.error('Error fetching courses', error);
          Alert.alert('Error', 'Failed to fetch courses');
        }
      };

      const handleAddCourse = async () => {
        try {
            const course = {
                courseId: form.code,
                name: form.title,
                department: form.department
            };
            const response = await addCourse(course);
            if (response.status === 200) {
                Alert.alert('Success', 'Course added successfully')
                setForm({ code: '', title: '', department: ''});
            } else {
                Alert.alert('Error', 'Failed to add course');
            }
        } catch (error) {
            console.error('Error adding course', error);
            Alert.alert('Error', 'Failed to add course')
        }
      }

    return (
        <SafeAreaView className="bg-white h-full pt-[-15px]">
          <View className="mx-2">
            <View className="items-center">
              <Text className="text-2xl font-semibold">Add Course</Text>
            </View>
            <FormField
              title="Course Code"
              placeholder="Select course code"
              value={form.code}
              handleChangeText={(e) => setForm({ ...form, code: e })}
              otherStyles="mt-2"
              keyboardType="email-address"
            />
            <FormField
              title="Course Title"
              placeholder="Select course title"
              value={form.title}
              handleChangeText={(e) => setForm({ ...form, title: e })}
              otherStyles="mt-2"
            />
            <FormField
              title="Lecturer"
              placeholder="Select lecturer"
              value={form.title}
              handleChangeText={(e) => setForm({ ...form, title: e })}
              otherStyles="mt-2"
            />
            <FormField
              title="Department"
              placeholder="Select course department"
              value={form.department}
              handleChangeText={(e) => setForm({ ...form, department: e })}
              otherStyles="mt-2"
            />
            <View className="items-center">
              <CustomButton
                title="Add"
                handlepress={handleAddCourse}
                containerStyles="mt-5 w-[250]"
              />
            </View>
          </View>
          <StatusBar style="light" />
        </SafeAreaView>
      );
}

export default AddCourse