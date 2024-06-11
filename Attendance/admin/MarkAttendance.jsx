import { View, Text } from 'react-native'
import React from 'react'
import { useState } from 'react'
import FormField from '../components/FormField'
import CustomDropdown from '../components/CustomDropDown'
import CustomButton from '../components/CustomButton'
import { Link, router, useNavigation } from "expo-router";

const MarkAttendance = () => {

  const Courses = ['CE101', 'CE102', 'CE103', 'CE104', 'CE105'];
  const [selectedItem, setSelectedItem] = useState('');
  const navigation=useNavigation()
  return (
    <View>
      <FormField 
      title="Name"
      placeholder="enter Student Name"/>

      <Text>Select Session</Text>
      <CustomDropdown
        title="Enter Course"
          data={Courses}
          placeholder="session"
          onSelect={(item) => setSelectedItem(item)}
        />


        <CustomButton  title="Mark" 
        handlepress={()=>router.back("Dashboard")}
        />

    </View>
  )
}

export default MarkAttendance