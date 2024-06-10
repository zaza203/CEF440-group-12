import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import Action from "../../components/Action";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "../../constants";
import { router, navigation } from "expo-router";

const Dashboard = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex flex-row flex-wrap mt-5">

          <Text>Welcome, Teacher Name</Text>
          <Action
            title="Initiate Attendance"
            icon={icons.initiate}
            color="#c34a2c"
            handlePress={() => router.push("InitiateAttendance")}
          />
          <Action
            title="View Attendance"
            icon={icons.listView}
            color="#49413f"
            handlePress={() => router.push("ViewAttendance")}
          />
          <Action
            title="Generate Report"
            icon={icons.generate}
            color="#31906e"
          />
          <Action
            title="Mark Attendance"
            icon={icons.markattendance}
            color="#2c3539"
          />
          <Action title="Add Session" icon={icons.addSession} color="#2c3539" />

          <Action title="View Session" icon={icons.listView} color="#2c3539" />
        </View>

        <View className="bg-primary w-full h-20 mt-[100px] justify-center ">
          <TouchableOpacity
            activeOpacity={0.7}
            className="jusstify-center p-10"
            onPress={() => router.push("/TeacherDashboard")}
          >
            <Image
              resizeMode="contain"
              source={icons.dashboard}
              className="w-[60px] "
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
