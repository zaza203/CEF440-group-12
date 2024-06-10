import { Text, View,Image } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'


const TeacherLayout = () =>{


  return (
  <>
   <Stack>
    <Stack.Screen
    name='TeacherDashboard'
    options={{headerShown: false}}
    />

<Stack.Screen
    name='AddSession'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='InitiateAttendance'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='ViewAttendance'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='MarkAttendance'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='ViewSession'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='GenerateReport'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='TakeAttendance'
    options={{headerShown: false}}
    
    />
  </Stack> 

  
  
  </>
  )
}

export default TeacherLayout


