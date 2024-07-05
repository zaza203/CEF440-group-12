import { View, Text, ScrollView } from 'react-native'
import Action from  '../../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation,router } from 'expo-router'

import { icons } from '../../../constants'

const Create = () => {
  const navigation= useNavigation();
  return (
    <SafeAreaView  className="bg-white h-[100vh] mt-[-29]">
      <ScrollView className="py-1">
      <View className="flex flex-row flex-wrap">
        <Action 
          title="Add Admin"
          icon={icons.addAdmin}
          handlePress={()=>navigation.navigate("addAdmin")}
          color="#c34a2c"
        />
        <Action 
          title="Add Lecturer"
          icon={icons.addLecturer}
          color="#49413f"
          handlePress={()=>navigation.navigate("addLecturer")}
        />
        <Action 
          title="Register Student"
          icon={icons.regStudent}
          handlePress={()=>navigation.navigate("registerStudent")}
          color="#31906e"
        />
        <Action 
          title="Add Session"
          icon={icons.addSession}
          handlePress={()=>navigation.navigate("addSession")}
          color="#2c3539"
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create