import { View, Text, TextInput, ScrollView, Image,TouchableOpacity } from "react-native";
import React from "react";
import {Link,router} from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";

const login = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className=" bg-white  h-full items-center">
          <Image
            className="w-[273px] h-[203px] mt-5 justify-center"
            source={icons.login}
          />
          <Text className="font-pbold text-2xl mt-4 ">
            Revolutionize Student Attendance Tracking
          </Text>
          <Text className="font-pregular  mt-4 w-[270px] ">
            Elevate Your School's Efficiency with Our Advanced System
          </Text>
          <View className=" w-[330px]  pt-5 gap-5">
            <TextInput
              className=" bg-[#F6F5F5] font-pregular  p-2 pl-3 "
              placeholder="Enter your Email"
              placeholderTextColor="#7b7b8b"
            />

            <TextInput
              className=" bg-[#F6F5F5] font-pregular  p-2 pl-3 "
              placeholder="Enter your Password"
              placeholderTextColor="#7b7b8b"
            />

            <TextInput
              className=" bg-[#F6F5F5] font-pregular  p-2 pl-3 "
              placeholder="Confirm password"
              placeholderTextColor="#7b7b8b"
            />
          </View>
          <View className="pl-[200px] mt-2">
          <Link href='/forgot-password'><Text className="ml-10 font-pregular underline">forgot password?</Text></Link>
          </View>
          <View className="items-center">
            <TouchableOpacity
              className="bg-primary mt-5   w-[160px] py-2 px-4   rounded-full "
              onPress={() => router.push("/sign-up")}
            >
              <Text className="font-pregular text-lg text-center">
               Login
              </Text>
            </TouchableOpacity>
          </View>
          <View className=" flex-row justify-center items-center pt-5">
            <Text className="font-psemibold text-lg ">
              Don't have an account?{" "}
            </Text>
            <Link href="/sign-up">
              <Text className="font-pregular text-primary">Sign Up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default login;
