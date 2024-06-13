import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomDropdown from '../../components/CustomDropDown'
import CustomButton from '../../components/CustomButton'
import SetTime from '../../components/SetTime'

const AddSession = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState('');
  const Lecturers = ['Dr. Nkemani', 'Dr. Nguti', 'Dr. Djouela', 'Dr. Tsague', 'Dr. Sop', 'Dr. Fenji', 'Dr. Fonzi'];
  const Courses = ['CEF440', 'CEF476', 'CEF444', 'CEF438', 'CEF450'];

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="mx-2">
        <CustomDropdown
          data={Courses}
          placeholder="Course"
          onSelect={(item) => setSelectedItem(item)}
        />
        <CustomDropdown
          data={Lecturers}
          placeholder="Lecturer"
          onSelect={(item) => setSelectedItem(item)}
        />
        <SetTime title="Start Time"/>
        <SetTime title="End Time"/>
        <CustomButton 
          title="Add"
          handlepress={() => {
            Alert.alert("Session added successfully")
            // navigation.navigate("Dashboard")
            router.back("Dashboard")
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    paddingHorizontal: 20,
  }
});

export default AddSession