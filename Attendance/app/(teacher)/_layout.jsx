import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native'
import { Tabs, Redirect, Stack } from 'expo-router'
import React from 'react'

import { icons } from "../../constants"

import TDashboardStack from "./(tdashboard)/_layout"
import TCreateStack from './(tcreate)/_layout';
import TReportStack from './(treport)/_layout';
import TSettingsStack from './(tsettings)/_layout';

const Tab = createBottomTabNavigator();

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
const TeacherLayout = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#FFA001',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          height: 64
        }
      }}>
        <Tab.Screen 
          name="(tdashboard)"
          component={TDashboardStack}
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
        <Tab.Screen 
          name="(tcreate)"
          component={TCreateStack}
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
        <Tab.Screen 
          name="(treport)"
          component={TReportStack}
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
        <Tab.Screen 
          name="(tsettings)"
          component={TSettingsStack}
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ color, focused }) =>
              <TabIcon 
                icon={icons.settings}
                color={color}
                name="Settings"
                focused={focused}
              />
          }}
        />
      </Tab.Navigator>
    </>
  )
}

export default TeacherLayout