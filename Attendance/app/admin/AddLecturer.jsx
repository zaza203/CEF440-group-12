import { View, Text, ScrollView } from 'react-native'
import React , {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { StatusBar } from 'expo-status-bar'

const AddLecturer = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  return (
    <SafeAreaView className="bg-white">
      <View className="bg-white h-full mx-2">
        <View className="items-center">
            <Text className="text-2xl font-psemibold">Lecturer Registration</Text>
          </View>
        <FormField
          title="Username"
          placeholder=" Enter Username"
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e})}
          otherStyles="mt-8"
        />
        <FormField
          title="Email"
          placeholder="Enter Email"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e})}
          otherStyles="mt-5"
          keyboardType="email-address"
        />
        <FormField
          title="Password"
          placeholder="Enter Password"
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e})}
          otherStyles="mt-5"
        />

        <View className="items-center">
          <CustomButton 
          title="Create"
          handlepress={() => {}}
          containerStyles='mt-8 w-[250]'
        />
        </View>
      </View>
      <StatusBar style='light'/>
    </SafeAreaView>
    
  )
}

export default AddLecturer