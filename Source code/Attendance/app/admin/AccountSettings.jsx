import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileSettings = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email] = useState('john.doe@example.com'); // Email is displayed, not editable
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleImagePicker = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        setProfilePicture(response.assets[0].uri);
      }
    });
  };

  const handleSaveChanges = () => {
    // Handle saving changes logic here
    console.log('Changes saved');
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <View className="items-center mb-4">
        <TouchableOpacity onPress={handleImagePicker} className="mb-4">
          {profilePicture ? (
            <Image source={{ uri: profilePicture }} className="w-24 h-24 rounded-full" />
          ) : (
            <Text className="text-blue-500">Upload Profile Picture</Text>
          )}
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <Text className="mb-2">First Name</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded bg-white"
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2">Last Name</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded bg-white"
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2">Email</Text>
        <Text className="border border-gray-300 p-2 rounded bg-gray-200 text-gray-500">
          {email}
        </Text>
      </View>

      <View className="mb-4">
        <Text className="mb-2">Phone Number</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded bg-white"
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>

      <View className="mb-4">
        <Text className="mb-2">Date of Birth</Text>
        <TextInput
          className="border border-gray-300 p-2 rounded bg-white"
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />
      </View>

      <Button title="Save Changes" onPress={handleSaveChanges} />
    </ScrollView>
  );
};

export default ProfileSettings;
