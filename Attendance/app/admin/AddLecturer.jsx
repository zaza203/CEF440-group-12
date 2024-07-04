import { View, Text } from 'react-native';
import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { AuthContext } from '../../context/AuthContext';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddLecturer = () => {
  const { dispatch, addUserToCollection } = useContext(AuthContext); // Access dispatch and addUserToCollection from AuthContext
  const auth = getAuth();
  
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const submit = async () => {
    try {
      if (!form.email || !form.password) {
        alert('Please fill in all fields');
        return;
      }
      
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // Add user to 'lecturers' collection
      await addUserToCollection(user, 'lecturers');

      // Optionally, set the role to 'lecturer' in local storage
      const role = 'lecturer';
      await AsyncStorage.setItem('role', role);

      dispatch({ type: 'LOGIN', payload: { user, role } });

      alert('Lecturer registered successfully');

      // Clear form fields
      setForm({ email: '', password: '' });
    } catch (error) {
      console.error('Error registering lecturer:', error.message);
      alert('Failed to register lecturer. Please try again.');
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="mx-2">
        <View className="items-center">
          <Text className="text-2xl font-semibold">Lecturer Registration</Text>
        </View>
        <FormField
          title="Email"
          placeholder="Enter Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-5"
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          placeholder="Enter Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-5"
        />
        <View className="items-center">
          <CustomButton
            title="Create"
            handlepress={submit}
            containerStyles="mt-8 w-[250]"
          />
        </View>
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  );
};

export default AddLecturer;
