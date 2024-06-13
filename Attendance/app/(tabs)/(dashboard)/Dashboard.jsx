import { View, Text, ScrollView } from 'react-native'
import Action from  '../../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

import { icons } from '../../../constants'
import { router } from 'expo-router'

const Dashboard = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <ScrollView>
      <View className="flex flex-row flex-wrap">
        <Action 
          title="Add Admin"
          icon={icons.addAdmin}
          color="#c34a2c"
          handlePress={()=>navigation.navigate('addAdmin')}
        />
        <Action 
          title="Add Lecturer"
          handlePress={()=>navigation.navigate('addLecturer')}
          icon={icons.addLecturer}
          color="#49413f"
        />
        <Action 
          title="Register Student"
          icon={icons.regStudent}
          handlePress={()=>navigation.navigate('registerStudent')}
          color="#31906e"
        />
        <Action 
          title="Add Session"
          icon={icons.addSession}
          handlePress={()=>navigation.navigate('addSession')}
          color="#2c3539"
        />
        <Action 
          title="View Admins"
          icon={icons.view}
          color="#550a35"
          handlePress={()=>navigation.navigate('viewAdmins')}
        />
        <Action 
          title="View Students"
          icon={icons.listView}
          color="#040720"
          handlePress={()=>navigation.navigate('viewStudents')}
        />
        <Action 
          title="View Lecturer"
          icon={icons.view}
          color="#da70d6"
          handlePress={()=>navigation.navigate('viewLecturer')}
        />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard