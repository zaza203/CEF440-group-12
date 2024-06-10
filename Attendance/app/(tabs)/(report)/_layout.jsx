import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import viewAttendance from '../../../admin/ViewAttendance'
import studentHistory from '../../../admin/StudentHistory'
import viewSession from '../../../admin/ViewSession';
import courseHistory from '../../../admin/CourseHistory'
import Report from './Report'

const Stack = createNativeStackNavigator();

const ReportStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='report'>
      <Stack.Screen name='report' component={Report}/>
      <Stack.Screen name = 'viewAttendance' component={viewAttendance}/>
      <Stack.Screen name='courseHistory' component={courseHistory}/>
      <Stack.Screen name='viewSession' component={viewSession}/>
      <Stack.Screen name='StudentHistory' component={studentHistory}/>
    </Stack.Navigator>
  )
}

export default ReportStack