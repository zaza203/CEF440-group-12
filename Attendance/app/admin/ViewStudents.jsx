import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'students'));
        const studentsData = [];
        querySnapshot.forEach((doc) => {
          studentsData.push({ id: doc.id, ...doc.data() });
        });
        setStudents(studentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students: ', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="w-full bg-gray-200 p-2 rounded">
        <View className="flex-row justify-between p-2 bg-gray-300">
          <Text className="font-semibold">Name</Text>
          <Text className="font-semibold">Email</Text>
          <Text className="font-semibold">Level</Text>
          <Text className="font-semibold">Matricule Number</Text>
        </View>
        {students.map((student) => (
          <View
            key={student.id}
            className="flex-row justify-between p-2 border-b border-gray-300"
          >
            <Text>{student.name}</Text>
            <Text>{student.email}</Text>
            <Text>{student.level}</Text>
            <Text>{student.matriculeNumber}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ViewStudents;
