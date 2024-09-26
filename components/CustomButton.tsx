import { Text, TouchableOpacity} from 'react-native'
import React from 'react'


type CustomButtonProps = {
    title: string,
    containerStyles: string,
    handlePress: () => void,
    isLoading: boolean,
    textStyles?: string
}
const CustomButton = ({ title, handlePress, containerStyles , textStyles, isLoading}: CustomButtonProps ) => {
  return (
    <TouchableOpacity
    onPress={handlePress}
    activeOpacity={0.7}
    className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}>
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton