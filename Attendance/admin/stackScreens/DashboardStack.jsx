import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import AddAdmin from '../AddAdmin';
import AddLecturer from '../AddLecturer'
import RegisterStudent from '../RegisterStudent'
import AddSession from '../AddSession'
import ViewAttendance from '../ViewAttendance'
import ViewStudents from '../ViewStudents'
import ViewLecturer from '../ViewLecture'
import ViewAdmins from '../ViewAdmins'
import ViewSession from '../ViewSession'
import Dashboard from '../../app/(tabs)/Dashboard';
import { ScreenNavigationContainer } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const DashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='dashboard'>
        <Stack.Screen name='dashboard' component={Dashboard}/>
        <Stack.Screen name='addAdmin' component={AddAdmin}/>
        <Stack.Screen name='addLecturer' component={AddLecturer}/>
        <Stack.Screen name='registerStudent' component={RegisterStudent}/>
        <Stack.Screen name='addSession' component={AddSession}/>
        <Stack.Screen name = 'viewAttendance' component={ViewAttendance}/>
        <Stack.Screen name='viewStudents' component={ViewStudents}/>
        <Stack.Screen name='viewLecturer' component={ViewLecturer}/>
        <Stack.Screen name='viewAdmins' component={ViewAdmins}/>
        <Stack.Screen name='viewSession' component={ViewSession}/>
    </Stack.Navigator>
    
  )
}

export default DashboardStack