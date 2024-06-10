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

const ViewAttendance = () => {
  return (
    <SafeAreaView className="h-ful bg-primary">
      <ScrollView  >
        <View className="h-full w-full bg-white items-center">
          <View className="flex flex-row gap-20 justify-center pt-5 mr-20 ">
            <Link href="/TeacherDashboard"><Image source={icons.leftArrow} /></Link>

            <Text className="font-pbold text-lg"> View Attendance</Text>
          </View>
          
          <View className=" w-[330px]  pt-5 gap-5">
            <View className=""> 
              <Text>Course Title</Text>
              <TextInput
                className=" bg-[#F6F5F5] font-pregular  p-2 pl-3 "
                placeholderTextColor="#7b7b8b"
              />
             
            </View>
            <View >
              <Text className="text-start">Date Range</Text>
              <View className="flex-row items-center justify-center pt-5">
                <Text>From: </Text>
              <TextInput
                className=" bg-[#F6F5F5] font-pregular w-[300px] p-2 pl-3 "
                placeholderTextColor="#7b7b8b"
              />
              </View>
              <View className="flex-row items-center justify-center pt-5">
                <Text>To: </Text>
              <TextInput
                className=" bg-[#F6F5F5] font-pregular w-[300px] p-2 pl-3 "
                placeholderTextColor="#7b7b8b"
              />
              </View>
              
            </View>

          </View>

         

          <View className='flex-row gap-4 mt-4'>
          <TouchableOpacity
              className="bg-primary mt-5   w-[200px] py-2 px-4  rounded-full "
              onPress={() => router.push("/login")}
            >
              <Text className="font-pregular text-lg text-center">
             View Records
              </Text>
            </TouchableOpacity>

       
            <TouchableOpacity
              className="bg-primary mt-5   w-[100px] py-2 px-4    rounded-full "
              onPress={() => router.push("TeacherDashboard")}
            >
              <Text className="font-pregular text-lg text-center">
               Cancel
              </Text>
            </TouchableOpacity>
          </View>
          <View className="bg-primary w-full h-20 mt-[280px] justify-center ">
          <TouchableOpacity  activeOpacity={0.7}
          onPress={()=>router.push('/TeacherDashboard')}>
          <Image
          resizeMode='contain'
          source={icons.dashboard}
          className="w-[60px] "
           /></TouchableOpacity>

        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewAttendance;
