import { icons } from '@/constants'
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps } from 'react-native'


interface FormFieldProps {
  title: string,
  value: string,
  handleChangeText: (e: string) => void,
  placeholder: string,
  otherStyles: string,
  keyboardType?: TextInputProps['keyboardType']; // For handling keyboard types


}

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props }: FormFieldProps) => {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>

      <View className='border-2 border-black-200 rounded-2xl focus:border-secondary 
      flex-row items-center w-full h-16 px-4 bg-black-100'>

        <TextInput

          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
          keyboardType={keyboardType}  // Setting the keyboard type
          autoCapitalize="none"  // Prevent auto-capitalization for email fields
          autoCorrect={false}    // Disable autocorrect for email input
        />

        {title === 'Password' && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6 '
              resizeMode='contain'

            />

          </TouchableOpacity>
        )}

      </View>
    </View>
  )
}

export default FormField