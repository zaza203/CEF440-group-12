import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const CustomDropdown = ({ title, data, onSelect, placeholder }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelect = (item) => {
    setSelectedValue(item);
    onSelect(item);
  };

  return (
    <View className="w-full relative mb-4">
      <View className="h-12 mt-2 mx-4 border border-gray-300 rounded-md px-2 justify-center relative">
        <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => handleSelect(itemValue)}
          style={{ height: 50, width: '100%' }}
        >
           <Picker.Item label={placeholder} value="" />
          {data.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
       
      </View>
    </View>
  );
};

export default CustomDropdown;
