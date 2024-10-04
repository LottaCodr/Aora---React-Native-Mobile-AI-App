

import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import VideoCard from '@/components/VideoCard'
// import { images } from '@/constants'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useEffect, useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useLocalSearchParams } from 'expo-router'

const Search = () => {
    const { query } = useLocalSearchParams()
    const { data: searchPost, refetch, isLoading } = useAppwrite(()=> searchPosts(query))



    useEffect(() => {
        refetch()
    }, [query])

    return (
        <SafeAreaView className='bg-primary h-full'>
            {/* {isLoading ? (
        // Display loading spinner while data is being fetched
        <>
          <View className='justify-center items-center h-full'>
            <ActivityIndicator size="large" color="#fff" />
            <Text className='text-xl text-white'>We're getting your videos </Text>
          </View>
        </>

      ) :

        (
         */}
            <FlatList
                data={searchPost}
                keyExtractor={(item: any) => item.$id ?? ""}
                renderItem={({ item }) => (

                    <VideoCard video={item} />

                )}

                ListHeaderComponent={() => (
                    <View className='my-6 px-4'>
                        <Text className='font-pmedium text-sm text-gray-100'> Search Results</Text>
                        <Text className='text-2xl font-psemibold text-white'> for: {query} </Text>


                        <View className='mt-6 mb-8'>
                            <SearchInput initialQuery={query} />
                        </View>
                    </View>
                )}

                ListEmptyComponent={() => (
                    <EmptyState
                        title="No Videos Found"
                        subtitle="No videos found for this search query"
                    />
                )}


            />
        </SafeAreaView>
    )
}

export default Search