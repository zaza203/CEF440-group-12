import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

const ViewLecturers = () => {
  const { state } = useContext(AuthContext); // Assuming AuthContext provides the authenticated user's info
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'lecturers'));
        const lecturersData = [];
        querySnapshot.forEach((doc) => {
          lecturersData.push({ id: doc.id, ...doc.data() });
        });
        setLecturers(lecturersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching lecturers: ', error);
        setLoading(false);
      }
    };

    fetchLecturers();
  }, []);

  const handleDelete = async (lecturer) => {
    // Check if the current admin was created by this admin
    const isCreator = lecturers.some(
      (otherLecturer) => otherLecturer.createdBy === lecturer.id && otherLecturer.id === state.user.uid
    );

    if (isCreator) {
      Alert.alert('Error', 'You cannot delete a lecturer that created you.');
      return;
    }

    // Check if the current user is the creator of the lecturer to be deleted
    if (lecturer.createdBy !== state.user.uid) {
      Alert.alert('Error', 'You can only delete lecturers you created.');
      return;
    }

    Alert.alert(
      'Confirm Delete',
      'Delete user? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, 'lecturers', lecturer.id));
              setLecturers(lecturers.filter((item) => item.id !== lecturer.id));
              Alert.alert('Success', 'Lecturer deleted successfully!');
            } catch (error) {
              console.error('Error deleting lecturer: ', error);
              Alert.alert('Error', 'Failed to delete lecturer. Please try again.');
            }
          }
        }
      ]
    );
  };

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
          <Text className="font-semibold">Email</Text>
          <Text className="font-semibold">Actions</Text>
        </View>
        {lecturers.map((lecturer) => (
          <View
            key={lecturer.id}
            className="flex-row justify-between p-2 border-b border-gray-300"
          >
            <Text>{lecturer.email}</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => handleDelete(lecturer)}>
                <MaterialIcons name="delete" size={20} color="red" className="mx-1" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ViewLecturers;
