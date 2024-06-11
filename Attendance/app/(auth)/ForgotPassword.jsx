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

const ForgotPassword = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="h-full w-full bg-white items-center">
          <View className="flex flex-row gap-20 justify-center pt-5 mr-20 ">
          <Link href="/login"><Image source={icons.leftArrow} /></Link>

            <Text className="font-pbold text-lg"> Forgot password</Text>
          </View>
          <Image className="w-[254px] h-[182px] mt-5" source={icons.forgot} />
          <View className="pl-5 pr-3">
          <Text className="font-pbold text-2xl mt-4  ">
            Enter your phone number to receive code
          </Text>
          <Text className="font-pregular  mt-4 w-[270px] ">
            Please enter your phone number we will send an OTP for verification
            to your number:
          </Text>
          </View>
          <View className=" w-[330px]  pt-5 gap-5">
            <TextInput
              className=" bg-[#F6F5F5] font-pregular  p-2 pl-3 "
              placeholder="Phone number"
              placeholderTextColor="#7b7b8b"
            />
            </View>

          <View className="items-center">
            <TouchableOpacity
              className="bg-primary mt-5   w-[160px] py-2 px-4   rounded-full "
              onPress={() => router.push("/confirmCode")}
            >
              <Text className="font-pregular text-lg text-center">Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
