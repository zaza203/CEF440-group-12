import { View, Text, ScrollView } from 'react-native'
import Action from  '../../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { icons } from '../../../constants'

const Create = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <View className="flex flex-row flex-wrap">
        <Action 
          title="Add Admin"
          icon={icons.addAdmin}
          color="#c34a2c"
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
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create