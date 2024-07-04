import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../../context/AuthContext';
import CustomButton from '../../../components/CustomButton';
import { getAuth, signOut } from '@firebase/auth';
import { router, useNavigation } from 'expo-router';

const Profile = () => {
  const navigation= useNavigation()
  const { state, dispatch } = useContext(AuthContext);
  const { user } = state;

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    dispatch({ type: 'LOGOUT' });
    navigation.navigate("login")
    
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <View className="mx-2 mt-10">
        <View className="items-center mb-5">
          <Text className="text-2xl font-semibold">Profile</Text>
        </View>
        <View className="items-center">
          <Text className="text-lg">Email: {user?.email}</Text>
        </View>
        <View className="items-center mt-10">
          <CustomButton
            title="Logout"
            handlepress={handleLogout}
            containerStyles="mt-8 w-[250]"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
