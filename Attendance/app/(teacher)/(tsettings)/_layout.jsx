import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import feedback from '../../../admin/Feedback'
import AccountSettings from '../../../admin/AccountSettings';
import Settings from './Settings'

const Stack = createNativeStackNavigator();

const TSettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true,    headerStyle: {
      backgroundColor: '#1d4ed8',
},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
}, }} initialRouteName='settings'>
      <Stack.Screen name='settings' component={Settings}/>
      <Stack.Screen name = 'accountSettings' component={AccountSettings}/>
      <Stack.Screen name='feedback' component={feedback}/>
    </Stack.Navigator>
  )
}

export default TSettingsStack