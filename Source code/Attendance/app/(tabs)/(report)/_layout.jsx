import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import ViewAttendance from '../../admin/ViewAttendance'
import StudentHistory from '../../admin/StudentHistory'
import ViewSession from '../../admin/ViewSession';
import CourseHistory from '../../admin/CourseHistory'
import Report from './Report'

const Stack = createNativeStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator screenOptions={{ 
      headerShown: true, 
      headerStyle: {
        backgroundColor: '#1d4ed8',
  },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
  }, }} initialRouteName='report'>
      <Stack.Screen name='report' component={Report}/>
      <Stack.Screen name = 'viewAttendance' component={ViewAttendance}/>
      <Stack.Screen name='courseHistory' component={CourseHistory}/>
      <Stack.Screen name='viewSession' component={ViewSession}/>
      <Stack.Screen name='studentHistory' component={StudentHistory}/>
    </Stack.Navigator>
  )
}

export default ReportStack