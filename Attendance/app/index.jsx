import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import image from "../assets/images/image.png"
import header from "../assets/images/header.png"

export default function App() {
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{height: "100%"}}>
        <View className="flex-1 items-center justify-center bg-white  w-full h-full">
            <Image
            source={header} 
            className="ml-[-225px] w-[140px] mt-[-25px] mr-14"/>
          <Text className="ml-2 text-3xl mt-5 font-pbold">Change your attendance system for the better!</Text>
          <Text className="mt-5 mx-5 text-lg ">Easy to use,convenient and guaranteed to increase student punctuality</Text>
          <Image
          source={image}
          className="rounded-md mt-5 mr-3 w-[200px] "
          resizeMode="contain"
          />
          <TouchableOpacity
          className="bg-primary mt-2 px-12 py-3 rounded-full "
          onPress={()=>router.push('/login')}>
          <Text className="font-pregular text-lg">Get Started</Text>
          </TouchableOpacity>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
