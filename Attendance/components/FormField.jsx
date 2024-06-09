import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showpassword, setShowpassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pemdium">{title}</Text>

      <View className=" border-2 w-full h-16 px-4 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput className="flex-1 font-psemibold text-base"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'password' && !showpassword}
        />
        {title === 'password' && (
            <TouchableOpacity onPress={() =>
                setShowpassword(!showpassword)}>
                <Image source={!showpassword ? icons.eye : icons.eyehide} className="w-6 h-6" resizeMode='contain'/>
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField