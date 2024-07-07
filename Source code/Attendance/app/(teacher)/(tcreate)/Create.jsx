import { View, Text, ScrollView } from 'react-native'
import Action from  '../../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

import { icons } from '../../../constants'

const Create = () => {
  const navigation= useNavigation();
  return (
    <SafeAreaView>
      <ScrollView>
      <View className="flex flex-row flex-wrap">
        <Action 
          title="Add Session"
          icon={icons.addSession}
          color="#c34a2c"
          handlePress={()=>navigation.navigate('addSession')}
        />
        <Action 
          title="Initiate Attendance"
          icon={icons.initiateattendance}
          color="#49413f"
          handlePress={()=>navigation.navigate('initiateAttendance')}
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create