import { View, Text, ScrollView } from 'react-native'
import React , {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const AddAdmin = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  return (
    <SafeAreaView className="mx-2">
        <View>
          <View className="items-center">
            <Text className="text-2xl font-psemibold">Admin Registration</Text>
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
    </SafeAreaView>
    
  )
}

export default AddAdmin