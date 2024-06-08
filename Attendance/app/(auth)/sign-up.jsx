import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import { Link, router } from "expo-router";

const signUp = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full bg-white">
          <View className="flex flex-row gap-20 justify-center pt-5 mr-20 ">
          <Link href="/index"><Image source={icons.leftArrow} /></Link>

            <Text className="font-pbold text-lg"> Sign Up</Text>
          </View>
          <Text className="font-pbold text-2xl mt-5 text-center ">
            Create account
          </Text>
          <Text className="font-pregular text-center">Sign up new account</Text>
          <View className="flex-row justify-center gap-5 mt-1">
            <TouchableOpacity
              className=" w-[145px] h-[118px] bg-[#D9D9D9] hover:bg-[#afa2a2] items-center justify-center"
              activeOpacity={0.5}
            >
              <Image source={icons.admin} className="w-[74px] h-[74px]" />
              <Text className="font-pregular">Administrator</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              className="w-[145px] h-[118px] bg-[#D9D9D9] items-center justify-center "
            >
              {<Image source={icons.teacher} className="w-[74px] h-[74px]" />}
              <Text className="font-pregular ">Teacher</Text>
            </TouchableOpacity>
          </View>
          <View className="pt-8 justify-center pl-8 gap-4">
            <TextInput
              className=" bg-[#F6F5F5] font-pregular mx-9 p-2  "
              placeholder="Enter your full name"
              placeholderTextColor="#7b7b8b"
            />
            <TextInput
              className=" bg-[#F6F5F5] font-pregular mx-9 p-2  "
              placeholder="Enter your Email"
              placeholderTextColor="#7b7b8b"
            />
            <TextInput
              className=" bg-[#F6F5F5] font-pregular mx-9 p-2   "
              placeholder="Enter your phone number"
              placeholderTextColor="#7b7b8b"
            />
            <TextInput
              className=" bg-[#F6F5F5] font-pregular mx-9 p-2   "
              placeholder="Enter your password"
              placeholderTextColor="#7b7b8b"
            />
            <TextInput
              className=" bg-[#F6F5F5] font-pregular mx-9 p-2   "
              placeholder="Confirm password"
              placeholderTextColor="#7b7b8b"
            />
          </View>
          <View className="items-center">
            <TouchableOpacity
              className="bg-primary mt-5   w-[160px] py-2 px-4   rounded-full "
              onPress={() => router.push("/sign-up")}
            >
              <Text className="font-pregular text-lg text-center">
                Register
              </Text>
            </TouchableOpacity>
          </View>

          <View className=" flex-row justify-center items-center pt-5">
            <Text className="font-psemibold text-lg ">
              Already have an account?{" "}
            </Text>
            <Link href="/login">
              <Text className="font-pregular text-primary">Login here</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default signUp;
