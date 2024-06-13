import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'

import { icons } from '../constants'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showpassword, setShowpassword] = useState(false)
  return (
    <View className={`space-y-2 m-2 ${otherStyles}`}>
      <Text className="text-base text-black-100 font-pregular">{title}</Text>

      <View className=" border-2 border-secondary w-full h-16 px-4 rounded-2xl focus:border-gray-300 items-center flex-row">
        <TextInput className="flex-1 font-psemibold text-base text-black-200"
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#cdcde0"
        onChangeText={handleChangeText}
        secureTextEntry={title === 'Password' && !showpassword}
        />
        {title === 'Password' && (
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