import { View, Text, TextInput, ScrollView, Image,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {Link,router} from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { StatusBar } from "expo-status-bar";

const Login = () => {
  const [selected, setSelected] = useState("Lecturer")

  const handleSelected = (option) => {
    setSelected(option)
  }

  return (
    <SafeAreaView className="bg-white">
        <View className="bg-white  h-full items-center justify-center">
          <Image
            className="w-[273px] h-[203px] mt-5 justify-center"
            source={icons.login}
          />
          <Text className="font-pbold text-2xl mt-4 mb-3">
            Revolutionize Student Attendance Tracking
          </Text>
          <View className="flex-row gap-12 justify-center items-center">
            <TouchableOpacity className={`${selected == 'Lecturer' ? 'border-b-2 border-secondary' : ''} pb-2`}
            onPress={() => handleSelected("Lecturer")}>
              <Text className={`${selected == 'Lecturer' ? 'font-pmedium' : 'text-secondary'} text-lg`}>Lecturer</Text>
            </TouchableOpacity>

            <TouchableOpacity className={`${selected == 'Admin' ? 'border-b-2 border-secondary' : ''} pb-2`}
            onPress={() => handleSelected("Admin")}>
              <Text className={`${selected == 'Admin' ? 'font-pmedium' : 'text-secondary'} text-lg`}>Admin</Text>
            </TouchableOpacity>
          </View>
          <View className=" w-[330px]  pt-5 gap-5">
            <FormField title="Email" placeholder="Enter Email" />
            <FormField title="Password" placeholder="Enter password" />
          </View>
          <View className="pl-[200px] mt-2">
            <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
              <Text className="ml-10 font-pregular underline">
                forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <View className="items-center">
            <CustomButton title="Login"
            containerStyles='w-[160] h-[20]'
            handlepress={() => {
              if (selected == "Lecturer") {
                router.push("TDashboard")
              }
              if (selected == "Admin") {
                router.push("Dashboard")
              }
            }}/>
          </View>
        </View>
        <StatusBar style="auto" />

    </SafeAreaView>
  );
};

export default Login;
