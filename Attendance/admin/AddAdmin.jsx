import { View, Text, ScrollView } from 'react-native'
import React , {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'

const AddAdmin = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
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

      <CustomButton 
        title="Create"
        handlepress={() => {}}
        containerStyles='mt-7 mx-3'
      />
    </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default AddAdmin