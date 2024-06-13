import { View, Text, ScrollView } from 'react-native'
import Action from  '../../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../../constants'
import {router ,useNavigation} from "expo-router"

const Report = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <ScrollView>
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
    </SafeAreaView>
  )
}

export default Report