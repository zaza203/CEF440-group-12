import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import AddAdmin from '../../../admin/AddAdmin';
import AddLecturer from '../../../admin/AddLecturer'
import RegisterStudent from '../../../admin/RegisterStudent'
import AddSession from '../../../admin/AddSession'
import ViewAttendance from '../../../admin/ViewAttendance'
import ViewStudents from '../../../admin/ViewStudents'
import ViewLecturer from '../../../admin/ViewLecture'
import ViewAdmins from '../../../admin/ViewAdmins'
import ViewSession from '../../../admin/ViewSession'
import Dashboard from './Dashboard';
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