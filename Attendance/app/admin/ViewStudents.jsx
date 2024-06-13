import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

const studentData = [
  { id: '1', name: 'Nfoua', email: 'nfoua@gmail.com' },
  { id: '2', name: 'Aju', email: 'aju@gmail.com' },
  { id: '3', name: 'Che', email: 'che@gmail.com' },
  { id: '4', name: 'Paul', email: 'paul@gmail.com' },
  { id: '5', name: 'Mary', email: 'mary@gmail.com' },
  { id: '6', name: 'Anna', email: 'anna@gmail.com' },
  { id: '7', name: 'Peter', email: 'peter@gmail.com' },
  { id: '8', name: 'James', email: 'james@gmail.com' },
  { id: '9', name: 'John', email: 'john@gmail.com' },
  { id: '10', name: 'Linda', email: 'linda@gmail.com' },
  { id: '11', name: 'Tom', email: 'tom@gmail.com' },
  { id: '12', name: 'Jerry', email: 'jerry@gmail.com' },
  { id: '13', name: 'Alice', email: 'alice@gmail.com' },
  { id: '14', name: 'Bob', email: 'bob@gmail.com' },
  { id: '15', name: 'Eve', email: 'eve@gmail.com' },
];

const ViewStudents = () => {
  const handleEdit = (id) => {
    // Handle the edit functionality here
    console.log(`Edit student with ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Handle the delete functionality here
    console.log(`Delete student with ID: ${id}`);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="w-full bg-gray-200 p-2 rounded">
        <View className="flex-row justify-between p-2 bg-gray-300">
          <Text className="font-semibold">ID</Text>
          <Text className="font-semibold">Name</Text>
          <Text className="font-semibold">Email</Text>
          <Text className="font-semibold">Actions</Text>
        </View>
        {studentData.map((student) => (
          <View
            key={student.id}
            className="flex-row justify-between p-2 border-b border-gray-300"
          >
            <Text>{student.id}</Text>
            <Text>{student.name}</Text>
            <Text>{student.email}</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => handleEdit(student.id)}>
                <Feather name="edit" size={20} color="blue" className="mx-1" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(student.id)}>
                <MaterialIcons name="delete" size={20} color="red" className="mx-1" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ViewStudents;
