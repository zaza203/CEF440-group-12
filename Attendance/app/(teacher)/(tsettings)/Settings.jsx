import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Settings = () => {
  const profile = {
    firstName: "Valery",
    lastName: "Kemenyi",
    email: "valerykemenyi@gmail.com",
    phoneNumber: "+237 123-456-789",
    dateOfBirth: "1980-01-01",
  };
  const [form, setForm] = useState(profile);


  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };
  return (
    <ScrollView className="flex-1 p-4 bg-white">
    
        <View>
          <View className="w-full items-center">
            <View className="bg-primary w-20 h-20 rounded-full flex items-center justify-center  mb-4">
              <Text className="text-white text-3xl font-pbold ">
                {getInitials(profile.firstName, profile.lastName)}
              </Text>
            </View>
          </View>
          <View className="mb-4">
            <Text className="mb-2">First Name</Text>
            <Text className="border text-lg font-pmedium border-gray-300 p-2 rounded bg-gray-200">
              {profile.firstName}
            </Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2">Last Name</Text>
            <Text className="border text-lg font-pmedium border-gray-300 p-2 rounded bg-gray-200">
              {profile.lastName}
            </Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2">Email</Text>
            <Text className="border text-lg font-pmedium border-gray-300 p-2 rounded bg-gray-200">
              {profile.email}
            </Text>
          </View>

          <View className="mb-4">
            <Text className="mb-2">Phone Number</Text>
            <Text className="border text-lg font-pmedium border-secondary p-2 rounded text-secondary">
              {profile.phoneNumber}
            </Text>
          </View>
            <View className="items-center justify-center pt-4">
          <TouchableOpacity
        
            className="bg-red-200 p-4 rounded-xl w-[200px] items-center justify-center "
          >
            <Text className="text-white text-center text-xl font-psemibold">Logout</Text>
          </TouchableOpacity>
          </View>
        </View>
      
    </ScrollView>
  );
};

export default Settings;
