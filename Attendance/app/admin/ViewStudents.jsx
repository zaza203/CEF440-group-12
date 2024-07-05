import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Modal, TextInput, Button, Alert, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton'; // Adjust the import path as necessary

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', matriculeNumber: '', level: '' });
  const [showStudents, setShowStudents] = useState(false);
  const firestore = getFirestore();

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(firestore, 'students'));
      const studentsData = [];
      querySnapshot.forEach((doc) => {
        studentsData.push({ id: doc.id, ...doc.data() });
      });
      setStudents(studentsData.filter((student) => student.level === selectedLevel));
      setShowStudents(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students: ', error);
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setForm({
      name: student.name,
      email: student.email,
      matriculeNumber: student.matriculeNumber,
      level: student.level,
    });
    setModalVisible(true);
  };

  const saveEdit = async () => {
    if (!form.name || !form.email || !form.matriculeNumber || !form.level) {
      Alert.alert('Error', 'All fields must be filled.');
      return;
    }

    try {
      const studentDocRef = doc(firestore, 'students', selectedStudent.id);
      await updateDoc(studentDocRef, {
        name: form.name,
        email: form.email,
        matriculeNumber: form.matriculeNumber,
        level: form.level,
      });

      setStudents(students.map((student) =>
        student.id === selectedStudent.id ? { ...student, ...form } : student
      ));

      setModalVisible(false);
      Alert.alert('Success', 'Student details updated successfully!');
    } catch (error) {
      console.error('Error updating student details: ', error);
      Alert.alert('Error', 'Failed to update student details. Please try again.');
    }
  };

  const handleDelete = async (studentId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this student? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, 'students', studentId));
              setStudents(students.filter((student) => student.id !== studentId));
              Alert.alert('Success', 'Student deleted successfully!');
            } catch (error) {
              console.error('Error deleting student: ', error);
              Alert.alert('Error', 'Failed to delete student. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {!selectedLevel ? (
        <Picker
          selectedValue={selectedLevel}
          onValueChange={(itemValue) => setSelectedLevel(itemValue)}
          style={{ height: 50, width: 300, borderBottomWidth: 6 }}
        >
          <Picker.Item label="Select level to view students" value={null} />
          <Picker.Item label="200" value="200" />
          <Picker.Item label="300" value="300" />
          <Picker.Item label="400" value="400" />
          <Picker.Item label="500" value="500" />
        </Picker>
      ) : (
        <View>
          <Picker
            selectedValue={selectedLevel}
            onValueChange={(itemValue) => setSelectedLevel(itemValue)}
            style={{ height: 50, width: 200 }}
          >
            <Picker.Item label="Select level to view students" value={null} />
            <Picker.Item label="200" value="200" />
            <Picker.Item label="300" value="300" />
            <Picker.Item label="400" value="400" />
            <Picker.Item label="500" value="500" />
          </Picker>
          <CustomButton title="View Students" handlepress={fetchStudents} />
        </View>
      )}
      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {!loading && showStudents && (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id}
          renderItem={({ item: student }) => (
            <View key={student.id} className="mb-4">
              <View className="w-full bg-gray-200 p-2 rounded">
                <View className="flex-row justify-between p-2 bg-gray-300">
                  <Text className="font-semibold w-1/5">Name</Text>
                  <Text className="font-semibold w-1/4">Email</Text>
                  <Text className="font-semibold w-1/6">Level</Text>
                  <Text className="font-semibold w-1/4">Matricule Number</Text>
                  <Text className="font-semibold w-1/12">Actions</Text>
                </View>
                <View className="flex-row justify-between p-2 border-b border-gray-300">
                  <Text className="w-1/5">{student.name}</Text>
                  <Text className="w-1/4">{student.email}</Text>
                  <Text className="w-1/6">{student.level}</Text>
                  <Text className="w-1/4">{student.matriculeNumber}</Text>
                  <View className="flex-row w-1/12 justify-between">
                    <TouchableOpacity onPress={() => handleEdit(student)}>
                      <Feather name="edit" size={20} color="blue" className="mx-1" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleDelete(student.id)}>
                      <MaterialIcons name="delete" size={20} color="red" className="mx-1" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      )}

      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center">
            <View className="bg-white p-5 rounded shadow-lg w-80">
              <Text className="text-lg font-semibold mb-4">Edit Student Details</Text>
              <TextInput
                className="border border-gray-300 rounded p-2 mb-4"
                placeholder="Enter name"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
              />
              <TextInput
                className="border border-gray-300 rounded p-2 mb-4"
                placeholder="Enter email"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                keyboardType="email-address"
              />
              <TextInput
                className="border border-gray-300 rounded p-2 mb-4"
                placeholder="Enter matricule number"
                value={form.matriculeNumber}
                onChangeText={(text) => setForm({ ...form, matriculeNumber: text })}
              />
              <TextInput
                className="border border-gray-300 rounded p-2 mb-4"
                placeholder="Enter level"
                value={form.level}
                onChangeText={(text) => setForm({ ...form, level: text })}
              />
              <View className="flex-row justify-end">
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Save" onPress={saveEdit} />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ViewStudents;
