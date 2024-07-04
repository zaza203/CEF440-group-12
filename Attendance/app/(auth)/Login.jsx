
import { View, Text, Image, TouchableOpacity } from "react-native";
import {router} from 'expo-router'
import React, { useState, useContext, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants";
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { StatusBar } from "expo-status-bar";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from "../../context/AuthContext"; // import your AuthContext

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { user, isLoading } = state;

  const navigation = useNavigation();

  const [selected, setSelected] = useState("Lecturer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSelected = (option) => {
    setSelected(option);
  };

  const submit = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const role = selected; // Role is either 'Lecturer' or 'Admin'
      dispatch({ type: 'LOGIN', payload: { user: userCredential.user, role } });
      await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
      await AsyncStorage.setItem('role', role);
      router.push('Dashboard'); // Navigate to Dashboard
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  useEffect(() => {
    if (user) {
      router.push('Dashboard'); // Redirect to Dashboard if already logged in
    }
  }, [user]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="bg-white">
      <View className="bg-white h-full items-center justify-center">
        <Image
          className="w-[273px] h-[203px] mt-5 justify-center"
          source={icons.login}
        />
        <Text className="font-pbold text-2xl mt-4 mb-3">
          Revolutionize Student Attendance Tracking
        </Text>
        <View className="flex-row gap-12 justify-center items-center">
          <TouchableOpacity className={`${selected == 'Lecturer' ? 'border-b-2 border-secondary' : ''} pb-2`}
            onPress={() => handleSelected("Lecturer")}>
            <Text className={`${selected == 'Lecturer' ? 'font-pmedium' : 'text-secondary'} text-lg`}>Lecturer</Text>
          </TouchableOpacity>

          <TouchableOpacity className={`${selected == 'Admin' ? 'border-b-2 border-secondary' : ''} pb-2`}
            onPress={() => handleSelected("Admin")}>
            <Text className={`${selected == 'Admin' ? 'font-pmedium' : 'text-secondary'} text-lg`}>Admin</Text>
          </TouchableOpacity>
        </View>
        <View className="w-[330px] pt-5 gap-5">
          <FormField title="Email" placeholder="Enter Email" handleChangeText={setEmail} />
          <FormField title="Password" placeholder="Enter password" handleChangeText={setPassword} secureTextEntry />
        </View>
        <View className="pl-[200px] mt-2">
          <TouchableOpacity onPress={() => navigation.navigate("forgotPassword")}>
            <Text className="ml-10 font-pregular underline">
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
        <View className="items-center">
          <CustomButton title="Login"
            containerStyles='w-[160] h-[20]'
            handlepress={submit} />
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default Login;
