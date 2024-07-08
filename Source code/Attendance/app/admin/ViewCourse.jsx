import React, { useState } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getAllCourses, deleteCourse, editCourse } from '../../context/api';
import CustomButton from '../../components/CustomButton';
import Modal from 'react-native-modal';

const ViewCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState({
    code: '',
    title: '',
    lecturer: '',
    department: '',
  });
  const [viewCoursesTriggered, setViewCoursesTriggered] = useState(false);

  const fetchCourses = async (department) => {
    setLoading(true);
    try {
      const response = await getAllCourses();
      const filteredCourses = department ? response.data.filter(course => course.department === department) : response.data;
      setCourses(filteredCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      Alert.alert('Error', 'Failed to fetch courses');
    } finally {
      setLoading(false);
      setViewCoursesTriggered(true);
    }
  };

  const handleCoursePress = (course) => {
    setSelectedCourse(course);
    setForm({
      code: course.courseId,
      title: course.name,
      lecturer: course.lecturer,
      department: course.department,
    });
    setModalVisible(true);
  };

  const handleDeleteCourse = async (courseId) => {
    Alert.alert(
      'Confirm Deletion',
      'Delete this course? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCourse(courseId);
              setCourses(courses.filter(course => course.courseId !== courseId));
            } catch (error) {
              console.error('Error deleting course:', error.response ? error.response.data : error.message);
              Alert.alert('Error', 'Failed to delete course');
            }
          },
        },
      ]
    );
  };

  const handleEditCourse = async () => {
    try {
      await editCourse({
        courseId: selectedCourse.courseId,
        name: form.title,
        lecturer: form.lecturer,
        department: form.department,
      });
      setCourses(courses.map(course => (course.courseId === selectedCourse.courseId ? { ...selectedCourse, ...form } : course)));
      setModalVisible(false);   
      Alert.alert("Course Edited successfully")
    } catch (error) {
      console.error('Error editing course:', error);
      Alert.alert('Error', 'Failed to edit course');
    }
  };

  return (
    <View className="flex-1 p-5 bg-[#F0F0F0]">
      <Text className="text-2xl text-center mb-5">View Courses</Text>
      <View className="mb-5">
        <Text className="text-lg">Select Department:</Text>
        <View className="border border-gray-300 rounded-lg mt-2">
          <Picker
            selectedValue={selectedDepartment}
            onValueChange={(itemValue) => setSelectedDepartment(itemValue)}
          >
            <Picker.Item label="Select Department" value="" />
            <Picker.Item label="View All" value="ALL" />
            <Picker.Item label="CE" value="CE" />
            <Picker.Item label="EE" value="EE" />
            <Picker.Item label="CIV" value="CIV" />
            <Picker.Item label="ME" value="ME" />
          </Picker>
        </View>
      </View>
      <CustomButton
        title="View Courses"
        handlepress={() => fetchCourses(selectedDepartment === 'ALL' ? '' : selectedDepartment)}
        containerStyles="bg-blue-700 rounded-2xl min-h-[62px] justify-center items-center"
        textStyles="text-white text-lg"
      />
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : viewCoursesTriggered && courses.length === 0 ? (
        <Text className="text-center text-lg mt-5">No courses found</Text>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.courseId.toString()}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-3 rounded-lg shadow" >
              <Text className="text-xl font-bold">{item.name}</Text>
              <Text className="text-lg mt-2">Code: {item.courseId}</Text>
              <Text className="text-lg mt-1">Department: {item.department}</Text>
              <View className="flex-row mt-3">
                <TouchableOpacity className="bg-green-500 p-2 rounded mr-2" onPress={() => handleCoursePress(item)}>
                  <Text className="text-white">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-red-500 p-2 rounded" onPress={() => handleDeleteCourse(item.courseId)}>
                  <Text className="text-white">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center">
          <View className="bg-white p-5 rounded shadow-lg w-80">
            <Text className="text-lg font-semibold mb-4">Edit Course Details</Text>
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter course code"
              value={form.code}
              onChangeText={(text) => setForm({ ...form, code: text })}
              editable={false}
              
            />
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter course title"
              value={form.title}
              onChangeText={(text) => setForm({ ...form, title: text })}
            />
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter lecturer"
              value={form.lecturer}
              onChangeText={(text) => setForm({ ...form, lecturer: text })}
            />
            <TextInput
              className="border border-gray-300 rounded p-2 mb-4"
              placeholder="Enter department"
              value={form.department}
              onChangeText={(text) => setForm({ ...form, department: text })}
            />
            <View className="flex-row justify-end">
              <TouchableOpacity
                className="bg-gray-500 p-2 rounded mr-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-700 p-2 rounded"
                onPress={handleEditCourse}
              >
                <Text className="text-white">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ViewCourse;


