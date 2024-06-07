import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "../assets/images/image.png"
import arrow from "../assets/icons/right-arrow.png"
import header from "../assets/images/header.png"

export default function App() {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="flex-1 items-center justify-center bg-white  w-full h-ful">
            <Image
            source={header} 
            className="ml-[-225px] w-[140px] mr-14"/>
          <Text className="mx-5 text-3xl mt-5 font-pbold">Change your attendance system for the better!</Text>
          <Text className="mt-5 mx-5 text-lg ">Easy to use,convenient and guaranteed to increase student punctuality</Text>
          <Image
          source={image}
          className="rounded-md mt-8 w-[230px] "
          resizeMode="contain"
          />
          <TouchableOpacity
          className="bg-[#3AF0F0] mt-5 ml-[250px] p-3 rounded-full "
          onPress={()=>router.push('/sign-up')}>
            <Image 
            source={arrow} />
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
