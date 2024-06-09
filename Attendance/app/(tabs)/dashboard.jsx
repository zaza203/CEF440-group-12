import { View, Text, ScrollView } from 'react-native'
import Action from  '../../components/Action'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const dashboard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Action 
          title="Add Admin"
          color="red"
        />
        <Action 
          title="Add Admin"
          color="red"
        />
        <Action 
          title="Add Admin"
          color="red"
        />
        <Action 
          title="Add Admin"
          color="red"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default dashboard