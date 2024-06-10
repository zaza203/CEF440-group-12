import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AddAdmin from '../../../admin/AddAdmin';
import AddLecturer from '../../../admin/AddLecturer'
import RegisterStudent from '../../../admin/RegisterStudent'
import Create from './Create'
import AddSession from '../../../admin/AddSession'

const Stack = createNativeStackNavigator();

const CreateStack = () => {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: true, 
      headerStyle: {
        backgroundColor: '#1d4ed8',
  },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
  }, }} initialRouteName='create'>
      <Stack.Screen name='create' component={Create}/>
      <Stack.Screen name='addAdmin' component={AddAdmin}/>
      <Stack.Screen name='addLecturer' component={AddLecturer}/>
      <Stack.Screen name='registerStudent' component={RegisterStudent}/>
      <Stack.Screen name='addSession' component={AddSession}/>
    </Stack.Navigator>
  )
}

export default CreateStack