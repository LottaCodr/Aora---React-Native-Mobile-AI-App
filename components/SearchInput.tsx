import { icons } from '@/constants'
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps } from 'react-native'


interface SearchInputProps {
    title: string,
    value: string,
    handleChangeText: (e: string) => void,
    placeholder: string,
    otherStyles: string,
    keyboardType?: TextInputProps['keyboardType']; // For handling keyboard types


}

const SearchInput = ({ title, value, placeholder, handleChangeText, otherStyles, keyboardType, ...props }: SearchInputProps) => {

    const [showPassword, setShowPassword] = useState(false)

    return (


        <View className='border-2 border-black-200 rounded-2xl focus:border-secondary 
      flex-row items-center w-full h-16 px-4 bg-black-100 space-x-4'>

            <TextInput

                className='tex-base mt-0.5 text-white flex-1 font-pregular'
                value={value}
                placeholder='Search for a videos topic'
                placeholderTextColor='#7b7b8b'
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassword}
                keyboardType={keyboardType}  // Setting the keyboard type
                autoCapitalize="none"  // Prevent auto-capitalization for email fields
                autoCorrect={false}    // Disable autocorrect for email input
            />


            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className='w-6 h-6 '
                    resizeMode='contain'

                />

            </TouchableOpacity>


        </View>

    )
}

export default SearchInput