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
    <SafeAreaView className="bg-white mt-[-29]">
      <ScrollView className="py-1">
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
            title="View Admin"
            icon={icons.view}
            handlePress={()=>navigation.navigate('viewAdmins')}
            color="#550a35"
          />
          <Action 
            title="View Students"
            icon={icons.listView}
            color="#040720"
            handlePress={() =>navigation.navigate('viewStudents')}
          />
          <Action 
            title="View Lecturer"
            icon={icons.view}
            handlePress={()=>navigation.navigate('viewLecturer')}
            color="#da70d6"
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
          <Action 
            title="Add Course"
            icon={icons.listView}
            color="#040720"
            handlePress={() =>navigation.navigate('addCourse')}
          />
          <Action 
            title="View Course"
            icon={icons.listView}
            color="#040720"
            handlePress={() =>navigation.navigate('viewCourse')}
          />
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard