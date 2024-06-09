import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import feedback from '../Feedback'
import accountSettings from '../AccountSettings';
import Settings from '../../app/(tabs)/Settings'

const Stack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='settings'>
      <Stack.Screen name='settings' component={Settings}/>
      <Stack.Screen name = 'accountSettings' component={accountSettings}/>
      <Stack.Screen name='feedback' component={feedback}/>
    </Stack.Navigator>
  )
}

export default SettingsStack