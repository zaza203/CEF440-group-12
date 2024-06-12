import { View, Text, TextInput, ScrollView, Image,TouchableOpacity } from "react-native";
import React from "react";
import {Link,router} from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

const Login = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
     
        <View className=" bg-white  h-full items-center justify-center">
          <Image
            className="w-[273px] h-[203px] mt-5 justify-center"
            source={icons.login}
          />
          <Text className="font-pbold text-2xl mt-4 mb-3">
            Revolutionize Student Attendance Tracking
          </Text>
          <View className=" w-[330px]  pt-5 gap-5">
            <FormField 
            title="Email"
            placeholder="Enter Email"/>
            <FormField title="Password"
            placeholder="Enter password"/>
          </View>
          <View className="pl-[200px] mt-2">
          <Link href='/forgot-password' style={{ color: "blue"}}><Text className="ml-10 font-pregular underline">forgot password?</Text></Link>
          </View>
          <View className="items-center">
            <CustomButton title="Login"
            containerStyles='w-[160] h-[20]'
            handlepress={() => router.push("TDashboard")}/>

            <CustomButton title="Login"
            containerStyles='w-[160] h-[20]'
            handlepress={() => router.push("Dashboard")}/>
          </View>
          
        </View>

    </SafeAreaView>
  );
};

export default Login;
