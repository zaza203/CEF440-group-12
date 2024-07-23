import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import * as LocalAuthentication from "expo-local-authentication";
import { AuthContext } from "../../context/AuthContext";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { icons } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { StatusBar } from "expo-status-bar";

const RegisterStudent = () => {
  const navigation = useNavigation();
  const { state } = useContext(AuthContext);
  const firestore = getFirestore();
  const [form, setForm] = useState({
    name: "",
    matriculeNumber: "",
    email: "",
    level: "",
    fingerprintId: "",
  });

  const handleFingerprintScan = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert(
        "Error",
        "Fingerprint scanning is not available on this device"
      );
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Scan your fingerprint",
    });

    if (result.success) {
      const templateId = `fp-${Date.now()}`;
      setForm({ ...form, fingerprintId: templateId });

      console.log("Fingerprint Template ID:", templateId);
      Alert.alert("Success", "Fingerprint captured successfully!");
    } else {
      Alert.alert("Error", "Failed to capture fingerprint");
    }
  };

  const handleRegister = async () => {
    const { name, matriculeNumber, email, level, fingerprintId } = form;

    if (!name || !matriculeNumber || !email || !level || !fingerprintId) {
      Alert.alert(
        "Error",
        "All fields must be filled, and fingerprint must be captured"
      );
      return;
    }

    try {
      await addDoc(collection(firestore, "students"), {
        name,
        matriculeNumber,
        email,
        level,
        fingerprintId,
        createdBy: state.user.email,
        createdAt: new Date(),
      });
      Alert.alert("Success", "Student registered successfully!");
      setForm({
        name: "",
        matriculeNumber: "",
        email: "",
        level: "",
        fingerprintId: "",
      });
    } catch (error) {
      console.error("Error adding student: ", error);
      Alert.alert("Error", "Failed to register student. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="mx-2">
          <View className="items-center">
            <Text className="text-2xl font-semibold">Student Registration</Text>
          </View>
          <FormField
            title="Name"
            placeholder="Enter your full name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-8"
          />
          <FormField
            title="Matriculation Number"
            placeholder="Enter Student matricule Number"
            value={form.matriculeNumber}
            handleChangeText={(e) => setForm({ ...form, matriculeNumber: e })}
            otherStyles="mt-5"
          />
          <FormField
            title="Email"
            placeholder="Enter Student's email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-5"
            keyboardType="email-address"
          />
          <FormField
            title="Level"
            placeholder="Enter Level"
            value={form.level}
            handleChangeText={(e) => setForm({ ...form, level: e })}
            otherStyles="mt-5"
          />
          <TouchableOpacity
            onPress={handleFingerprintScan}
            className="items-center mb-4"
          >
            <Image source={icons.fingerprint} className="w-20 h-20" />
            <Text className="text-center mt-2">Fingerprint</Text>
          </TouchableOpacity>
          <View className="items-center">
            <CustomButton
              title="Register"
              handlepress={handleRegister}
              containerStyles="mt-8 w-[250]"
            />
          </View>
        </View>
        <StatusBar style="light" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterStudent;
