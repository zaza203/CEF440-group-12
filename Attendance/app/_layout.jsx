import React, { useEffect } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';

import index from './index'
import AuthStack from './(auth)/_layout'
import TabStack from './(tabs)/_layout'
import TeacherLayout from './(teacher)/_layout'

const Stack = createStackNavigator();


SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    
      <Stack.Navigator options={{ headerShown: false }} initialRouteName="index">
        <Stack.Screen name="index" component={index} options={{headerShown: false}}/>
        <Stack.Screen name="(auth)" component={AuthStack} options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" component={TabStack} options={{headerShown: false}}/>
        <Stack.Screen name="(teacher)" component={TeacherLayout} options={{headerShown: false}} />
      </Stack.Navigator>
    
    

  );
};

export default RootLayout;
