import { View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import viewAttendance from '../../admin/ViewAttendance'
import studentHistory from '../../admin/StudentHistory'
import viewSession from '../../admin/ViewSession';
import CourseHistory from '../../admin/CourseHistory'
import Report from './Report'

const Stack = createNativeStackNavigator();

const TReportStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true ,   headerStyle: {
      backgroundColor: '#1d4ed8',
},
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
}, }} initialRouteName='report'>
      <Stack.Screen name='report' component={Report}/>
      <Stack.Screen name = 'viewAttendance' component={viewAttendance}/>
      <Stack.Screen name='courseHistory' component={CourseHistory}/>
      <Stack.Screen name='viewSession' component={viewSession}/>
      <Stack.Screen name='studentHistory' component={studentHistory}/>
    </Stack.Navigator>
  )
}

export default TReportStack