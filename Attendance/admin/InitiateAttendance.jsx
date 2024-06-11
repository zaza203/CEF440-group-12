import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Alert } from "react-native";
import {React, useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../constants";
import { Link, router, useNavigation } from "expo-router";
import CustomButton from "../components/CustomButton";
import FormField from "../components/FormField";
import SetTime from "../components/SetTime";
import CustomDropdown from "../components/CustomDropDown";

const InitiateAttendance = () => {

 const navigation = useNavigation();
  const Courses = ['CEF440', 'CEF476', 'CEF444', 'CEF438', 'CEF450'];
  const [selectedItem, setSelectedItem] = useState('');
  return (
    <SafeAreaView className="h-ful bg-primary">
      <ScrollView  >
        <View>
        <CustomDropdown
        title="Enter Course"
          data={Courses}
          placeholder="Course"
          onSelect={(item) => setSelectedItem(item)}
        />
          <SetTime title="start time " />
          <SetTime title="End Time" />

         <CustomButton title="Initiate"   
         handlepress={() => {
            Alert.alert("Session added successfully")
            // navigation.navigate("Dashboard")
            navigation.navigate("confirmFingerprint")
          }}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InitiateAttendance;
