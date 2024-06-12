import { View, Text, ScrollView } from 'react-native'
import React , {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const AddLecturer = () => {
  const navigation = useNavigation();
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
        title="Matriculation"
        placeholder=" Enter Matriculation"
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

      <CustomButton 
        title="Next"
        handlepress={() => navigation.navigate('fingerPrint')}
        containerStyles='mt-7 mx-3'
      />
    </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default AddLecturer