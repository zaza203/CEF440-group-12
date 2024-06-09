import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import React from 'react'

import { icons } from "../../constants"

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View>
      <Image 
        source = {icon}
        resizeMode="contain"
        tintColor={color}
        className="w-9 h-7"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}>{name}</Text>
    </View>
  )
}
const TabsLayout = () => {
  return (
    <>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          height: 64
        }
      }}>
        <Tabs.Screen 
          name="dashboard"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              <TabIcon 
                icon={icons.dashboard}
                color={color}
                name="Home"
                focused={focused}
              />
          }}
        />
        <Tabs.Screen 
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              <TabIcon 
                icon={icons.add}
                color={color}
                name="Create"
                focused={focused}
              />
          }}
        />
        <Tabs.Screen 
          name="report"
          options={{
            title: "Report",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              <TabIcon 
                icon={icons.report}
                color={color}
                name="Report"
                focused={focused}
              />
          }}
        />
        <Tabs.Screen 
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              <TabIcon 
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout