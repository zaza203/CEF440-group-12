import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import feedback from '../../../admin/Feedback'
import accountSettings from '../../../admin/AccountSettings';
import Settings from './Settings'

const Stack = createNativeStackNavigator();

const TSettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='settings'>
      <Stack.Screen name='settings' component={Settings}/>
      <Stack.Screen name = 'accountSettings' component={accountSettings}/>
      <Stack.Screen name='feedback' component={feedback}/>
    </Stack.Navigator>
  )
}

export default TSettingsStack