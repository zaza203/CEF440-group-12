import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AddAdmin from '../AddAdmin';
import AddLecturer from '../AddLecturer'
import RegisterStudent from '../RegisterStudent'
import Create from '../../app/(tabs)/Create'
import AddSession from '../AddSession'

const Stack = createNativeStackNavigator();

const CreateStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='create'>
      <Stack.Screen name='create' component={Create}/>
      <Stack.Screen name='addAdmin' component={AddAdmin}/>
      <Stack.Screen name='addLecturer' component={AddLecturer}/>
      <Stack.Screen name='registerStudent' component={RegisterStudent}/>
      <Stack.Screen name='addSession' component={AddSession}/>
    </Stack.Navigator>
  )
}

export default CreateStack