import { icons } from '@/constants'
import { router, usePathname } from 'expo-router';
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, TextInputProps, Alert } from 'react-native'


interface SearchInputProps {
    title: string,
    value: string,
    handleChangeText: (e: string) => void,
    placeholder: string,
    otherStyles: string,
    keyboardType?: TextInputProps['keyboardType']; // For handling keyboard types


}

const SearchInput = ({ initialQuery}: any) => {

    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')

    return (


        <View className='border-2 border-black-200 rounded-2xl focus:border-secondary 
      flex-row items-center w-full h-16 px-4 bg-black-100 space-x-4'>

            <TextInput

                className='tex-base mt-0.5 text-white flex-1 font-pregular'
                value={query}
                placeholder='Search for a video topic'
                placeholderTextColor='#CDCDE0'
                onChangeText={(e) => setQuery(e)}
                autoCapitalize="none"  // Prevent auto-capitalization for email fields
                autoCorrect={false}    // Disable autocorrect for email input
            />


            <TouchableOpacity
            onPress={()=> {
                if(!query) {
                    return Alert.alert('Missing query', "Please input something to search results from the database")
                }

                if(pathname.startsWith('/search')) router.setParams({ query })
                else router.push(`/search/${query}`)
            }}
            >
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