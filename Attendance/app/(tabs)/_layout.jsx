import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Image } from 'react-native'
import { Tabs, Redirect, Stack } from 'expo-router'
import React from 'react'

import { icons } from "../../constants"

import DashboardStack from '../../admin/stackScreens/DashboardStack';
import CreateStack from '../../admin/stackScreens/CreateStack';
import ReportStack from '../../admin/stackScreens/ReportStack';
import SettingsStack from '../../admin/stackScreens/SettingsStack';

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
const TabsLayout = () => {
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
          name="dashboardStack"
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
          name="createStack"
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
          name="reportStack"
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
          name="settingsStack"
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