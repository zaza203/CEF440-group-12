import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import AddAdmin from '../../admin/AddAdmin';
import AddLecturer from '../../admin/AddLecturer'
import RegisterStudent from '../../admin/RegisterStudent'
import AddSession from '../../admin/TaddSession';
import ViewAttendance from '../../admin/ViewAttendance'
import ViewStudents from '../../admin/ViewStudents'
import ViewLecturer from '../../admin/ViewLecture'
import ViewAdmins from '../../admin/ViewAdmins'
import ViewSession from '../../admin/ViewSession'
import Dashboard from './TDashboard';
import InitiateAttendance from '../../admin/InitiateAttendance'
import MarkAttendance from "../../admin/MarkAttendance"
import ConfirmFingerPrint from '../../admin/ConfirmFingerPrint';

import { ScreenNavigationContainer } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

const TDashboardStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true,     headerStyle: {
      backgroundColor: '#1d4ed8',
},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
}, }} initialRouteName='dashboard'>
        <Stack.Screen name='dashboard' component={Dashboard}/>
        <Stack.Screen name='initiateAttendance' component={InitiateAttendance}/>
        <Stack.Screen name='markAttendance' component={MarkAttendance}/>
        <Stack.Screen name='addSession' component={AddSession}/>
        <Stack.Screen name = 'viewAttendance' component={ViewAttendance}/>
        <Stack.Screen name='viewSession' component={ViewSession}/>
        <Stack.Screen name='confirmFingerprint' component={ConfirmFingerPrint}/>
    </Stack.Navigator>
    
  )
}

export default TDashboardStack