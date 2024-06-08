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

const forgotPassword = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full w-full bg-white items-center">
          <View className="flex flex-row gap-20 justify-center pt-5 mr-20 ">
            <Link href="/confirmCode"><Image source={icons.leftArrow} /></Link>

            <Text className="font-pbold text-lg"> New password</Text>
          </View>
          <Image
            className="w-[254px] h-[215px] mt-5"
            source={icons.newpassword}
          />
          <View className="pl-5 pr-3">
            <Text className="font-pbold text-2xl mt-4  ">
              Create new password
            </Text>
            <Text className="font-pregular  mt-4 w-[270px] ">
              Your new password must be different from previously used password.
            </Text>
          </View>
          <View className=" w-[330px]  pt-5 gap-5">
            <View>
              <TextInput
                className=" bg-[#F6F5F5] font-pregular  p-2 pl-3 "
                placeholderTextColor="#7b7b8b"
              />
              <Text>Must be atleast 8 characters</Text>
            </View>
            <View>
              <TextInput
                className=" bg-[#F6F5F5] font-pregular  p-2 pl-3 "
                placeholderTextColor="#7b7b8b"
              />
              <Text>Both password must match</Text>
            </View>
          </View>

          <View className="items-center">
            <TouchableOpacity
              className="bg-primary mt-5   w-[200px] py-2 px-4   rounded-full "
              onPress={() => router.push("/login")}
            >
              <Text className="font-pregular text-lg text-center">
                Create Password
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default forgotPassword;
