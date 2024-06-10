import { Text, View } from 'react-native'
import React from 'react'
// import {Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { createStackNavigator } from '@react-navigation/stack'
import login from './login'

const Stack = createStackNavigator();

const AuthLayout = () => {
  return (
  <>
  <Stack.Navigator options={{headerShown: false}} initialRouteName='login'>
    <Stack.Screen
    name='sign-up'
    component={login}
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
  </Stack.Navigator>
 
  
  </>
  )
}

export default AuthLayout
