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
          <Link href="/forgot-password"><Image source={icons.leftArrow} /></Link>

            <Text className="font-pbold text-lg"> Confirmation code</Text>
          </View>
          <Image className="w-[254px] h-[195px] mt-10" source={icons.confirm} />
          <View className="pl-4 pr-3">
          <Text className="font-pbold text-2xl mt-4  ">
            Confirm your phone number
          </Text>
          <Text className="font-pregular  mt-4 w-[270px] ">
            Enter the code sent to +237xxxxx
          </Text>
          </View>
          <View className=" w-[330px]  pt-5 gap-5 flex-row justify-center">
            <TextInput
              className=" bg-[#F6F5F5] font-pregular w-[55px] h-[55px] p-2 pl-3 "
              
              placeholderTextColor="#7b7b8b"
            />
             <TextInput
              className=" bg-[#F6F5F5] font-pregular w-[55px] h-[55px] p-2 pl-3 "
              
              placeholderTextColor="#7b7b8b"
            />
             <TextInput
              className=" bg-[#F6F5F5] font-pregular w-[55px] h-[55px] p-2 pl-3 "
              
              placeholderTextColor="#7b7b8b"
            />
             <TextInput
              className=" bg-[#F6F5F5] font-pregular w-[55px] h-[55px] p-2 pl-3 "
              
              placeholderTextColor="#7b7b8b"
            />
            </View>

          <View className="items-center">
            <TouchableOpacity
              className="bg-primary mt-5   w-[160px] py-2 px-4   rounded-full "
              onPress={() => router.push("/newPassword")}
            >
              <Text className="font-pregular text-lg text-center">confirm</Text>
            </TouchableOpacity>
          </View>
          <View className=" flex-row mt-5">
            <Text className="font-pregular">Resending code in <Text className="text-primary font-pregular">45</Text> secs.  </Text>
            <TouchableOpacity>
              <Text className="font-pbold underline">Resend code</Text>
            </TouchableOpacity>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default forgotPassword;
