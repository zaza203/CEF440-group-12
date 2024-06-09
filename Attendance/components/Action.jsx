import { View, Text, Image } from 'react-native'
import React from 'react'

const Action = ({ title, color, imageSource}) => {
  return (
    <View className="border-2 rounded-2xl w-40 px-2 mx-4 h-40 justify-center" style={{backgroundColor: color}}>
      <Image 
      source={imageSource}/>
      <Text className="text-lg font-psemibold">{title}</Text>
    </View>
  )
}

export default Action