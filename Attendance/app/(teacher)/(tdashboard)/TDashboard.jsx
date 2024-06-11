import { View, Text, ScrollView } from 'react-native'
import Action from  '../../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

import { icons } from '../../../constants'
import { router } from 'expo-router'

const TDashboard = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <ScrollView>
      <View className="flex flex-row flex-wrap">
        <Action 
          title="Initiate Attendance"
          icon={icons.initiate}
          color="#c34a2c"
          handlePress={()=>navigation.navigate('initiateAttendance')}
        />
        <Action 
          title="MarkAttendance"
          icon={icons.regStudent}
          color="#31906e"
          handlePress={()=>navigation.navigate('markAttendance')}
        />
        <Action 
          title="Add Session"
          icon={icons.addSession}
          color="#2c3539"
          handlePress={()=>navigation.navigate('addSession')}
        />
        <Action 
          title="View Attendance"
          icon={icons.listView}
          handlePress={()=>navigation.navigate('viewAttendance')}
          color="#6495ed"
        />
        <Action 
          title="View Session"
          icon={icons.listView}
          handlePress={()=>navigation.navigate('viewSession')}
          color="#2c3539"
        />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TDashboard