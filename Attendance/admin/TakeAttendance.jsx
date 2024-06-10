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
  import { icons } from "../constants";
  import { Link, router } from "expo-router";
  
  const TakeAttendance = () => {
    return (
      <SafeAreaView className="h-ful bg-primary">
        <ScrollView contentContainerStyle={{ height: "100%" }}  >
          <View className="h-full w-full bg-white items-center">
            <Text className="font-psemibold mt-6 text-2xl">Place Your Finger!</Text>
            <Image
              className="w-[254px] h-[400px] mt-5"
              source={icons.fingerprint}
            />
            
            <TouchableOpacity
                className="bg-primary mt-5   w-[150px] py-2 px-4   rounded-full "
                onPress={() => router.push("/login")}
              >
                <Text className="font-pregular text-lg text-center">
               Confirm
                </Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default TakeAttendance;
  