import { Text, View } from 'react-native'
import React from 'react'
// import {Stack} from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { createStackNavigator } from '@react-navigation/stack'
import login from './Login'
import  forgotPassword from './ForgotPassword'
import confirmCode from './ConfirmCode'
import newPassword from './NewPassword'

const Stack = createStackNavigator();

const AuthLayout = () => {
  return (
  <>
  <Stack.Navigator options={{headerShown: false}} initialRouteName='login'>
<Stack.Screen
    name='sign-up'

    options={{headerShown: false}}
    component={login}
    
    />

<Stack.Screen
    name='forgot-password'

    options={{headerShown: false}}
    component={forgotPassword}
    />

<Stack.Screen
    name='confirmCode'

    options={{headerShown: false}}
    component={confirmCode}
    
    />

<Stack.Screen
    name='newPassword'

    options={{headerShown: false}}
    component={newPassword}
    
    />
  </Stack.Navigator>
 
  
  </>
  )
}

export default AuthLayout
