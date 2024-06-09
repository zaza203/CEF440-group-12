import { View, Text, ScrollView } from 'react-native'
import Action from  '../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../constants'

const Report = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <View className="flex flex-row flex-wrap">
      <Action 
          title="View Attendance"
          icon={icons.listView}
          color="#6495ed"
        />
        <Action 
          title="View Session"
          icon={icons.listView}
          color="#2c3539"
        />
        <Action 
          title="Student History"
          icon={icons.history}
          color="#31906e"
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
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Report