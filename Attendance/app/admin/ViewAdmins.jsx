import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../context/AuthContext';

const ViewAdmins = () => {
  const { state } = useContext(AuthContext); // Assuming AuthContext provides the authenticated user's info
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'administrators'));
        const adminsData = [];
        querySnapshot.forEach((doc) => {
          adminsData.push({ id: doc.id, ...doc.data() });
        });
        setAdmins(adminsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching administrators: ', error);
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (admin) => {
    // Check if the current admin was created by this admin
    const isCreator = admins.some(
      (otherAdmin) => otherAdmin.createdBy === admin.id && otherAdmin.id === state.user.uid
    );

    if (isCreator) {
      Alert.alert('Error', 'You cannot delete an admin that created you.');
      return;
    }

    // Check if the current user is the creator of the admin to be deleted
    if (admin.createdBy !== state.user.uid) {
      Alert.alert('Error', 'You can only delete admins you created.');
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
              await deleteDoc(doc(firestore, 'administrators', admin.id));
              setAdmins(admins.filter((item) => item.id !== admin.id));
              Alert.alert('Success', 'Admin deleted successfully!');
            } catch (error) {
              console.error('Error deleting admin: ', error);
              Alert.alert('Error', 'Failed to delete admin. Please try again.');
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
        {admins.map((admin) => (
          <View
            key={admin.id}
            className="flex-row justify-between p-2 border-b border-gray-300"
          >
            <Text>{admin.email}</Text>
            <View className="flex-row">
              <TouchableOpacity onPress={() => handleDelete(admin)}>
                <MaterialIcons name="delete" size={20} color="red" className="mx-1" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ViewAdmins;
