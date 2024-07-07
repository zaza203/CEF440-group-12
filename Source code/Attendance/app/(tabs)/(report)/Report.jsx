import { View, Text, ScrollView } from 'react-native'
import Action from  '../../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../../constants'
import {useNavigation} from "expo-router"
import { StatusBar } from 'expo-status-bar'

const Report = () => {
  const navigation = useNavigation()
  
  return (
    <SafeAreaView  className="bg-white h-[100vh] mt-[-29]">
      <ScrollView className="py-1">
      <View className="flex flex-row flex-wrap">
      <Action 
          title="View Attendance"
          icon={icons.listView}
          color="#6495ed"
          handlePress={()=>navigation.navigate('viewAttendance')}
          
        />
        <Action 
          title="View Session"
          icon={icons.listView}
          color="#2c3539"
          handlePress={()=>navigation.navigate('viewSession')}
        />
        <Action 
          title="Student History"
          icon={icons.history}
          color="#31906e"
          handlePress={()=>navigation.navigate('studentHistory')}
        />
        {/* <Action 
          title="Class History"
          icon={icons.historyManage}
          color="#040720"
        /> */}
        <Action 
          title="Course History"
          icon={icons.historyManage}
          color="#550a35"
          handlePress={()=>navigation.navigate('courseHistory')}
        />
        </View>
      </ScrollView>
      <StatusBar style='light'/>
    </SafeAreaView>
  )
}

export default Report