import { View, Text,ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";


const login = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
    <ScrollView contentContainerStyle={{height: "100%"}}>
    <View className=" bg-white  h-full" >
      <Text>login</Text>
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default login