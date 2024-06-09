import { View, Text, ScrollView } from 'react-native'
import Action from  '../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../constants'
import { router } from 'expo-router'

const Dashboard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <View className="flex flex-row flex-wrap">
        <Action 
          title="Add Admin"
          icon={icons.addAdmin}
          color="#c34a2c"
          handlePress={()=>router.push('AddAdmin')}
        />
        <Action 
          title="Add Lecturer"
          icon={icons.addLecturer}
          color="#49413f"
        />
        <Action 
          title="Register Student"
          icon={icons.regStudent}
          color="#31906e"
        />
        <Action 
          title="Add Session"
          icon={icons.addSession}
          color="#2c3539"
        />
        <Action 
          title="View Admin"
          icon={icons.view}
          color="#550a35"
        />
        <Action 
          title="View Students"
          icon={icons.listView}
          color="#040720"
        />
        <Action 
          title="View Lecturer"
          icon={icons.view}
          color="#da70d6"
        />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard