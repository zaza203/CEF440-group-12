import { View, Text, ScrollView } from 'react-native'
import React , {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

import FormField from '../components/FormField'
import CustomButton from '../components/CustomButton'

const FingerPrintRegister = () => {
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

      <CustomButton 
        title="FingerPrint 1"
        handlepress={() => navigation.navigate('Place FingerPrint')}
        containerStyles='mt-7 mx-3'
      />

      <CustomButton 
        title="FingerPrint 2"
        handlepress={() => navigation.navigate('Place FingerPrint')}
        containerStyles='mt-7 mx-3'
      />

    </View>
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default FingerPrintRegister