import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native'
import { Tabs, Redirect, Stack } from 'expo-router'
import React from 'react'

import { icons } from "../../constants"

import DashboardStack from './(dashboard)/_layout';
import CreateStack from './(create)/_layout';
import ReportStack from './(report)/_layout';
import SettingsStack from './(settings)/_layout';

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
      <Text className={`${focused ? 'font-psemibold text-primary' : 'font-pregular'} text-xs`}>{name}</Text>
    </View>
  )
}
const TabsLayout = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#1d4ed8',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          height: 64
        }
      }}>
        <Tab.Screen 
          name="(dashboard)"
          component={DashboardStack}
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
          name="(create)"
          component={CreateStack}
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
          name="(report)"
          component={ReportStack}
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
          name="(settings)"
          component={SettingsStack}
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

export default TabsLayout