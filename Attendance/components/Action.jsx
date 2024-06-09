import { View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import React from 'react'

import { icons } from '../constants'

const Action = ({ title, color, icon, handlePress}) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
       <View className=" w-[45%] border-1 rounded-2xl m-1 mt-2 mx-2 px-2 h-40 justify-center" 
    style={{backgroundColor: color}}
    >
      <Image 
      source={icon} resizeMode='contain' className="w-20 h-20"/>
      <View className="flex-row justify-between">
        <Text className="text-white font-psemibold">{title}</Text>
        <Image source={icons.arrowRight} resizeMode='contain' className="w-7 h-7 "/>
      </View>
      
    </View>
    </TouchableWithoutFeedback>
   
  )
}

export default Action