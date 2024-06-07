import { Text, View } from 'react-native'
import React from 'react'
import {Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'


const AuthLayout = () => {
  return (
  <>
  <Stack>
    <Stack.Screen
    name='sign-up'
    options={{headerShown: false}}
    />

<Stack.Screen
    name='login'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='forgot-password'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='confirmCode'
    options={{headerShown: false}}
    
    />

<Stack.Screen
    name='newPassword'
    options={{headerShown: false}}
    
    />
  </Stack>
 
  
  </>
  )
}

export default AuthLayout
