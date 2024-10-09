

import EmptyState from '@/components/EmptyState'
import VideoCard from '@/components/VideoCard'
import { sigOut, userPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'

import { View, FlatList, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useGlobalContext } from '@/context/GlobalProvider'
import { icons } from '@/constants'
import InfoBox from '@/components/InfoBox'
import { router } from 'expo-router'

const Profile = () => {
    const { user, setUser, setIsLoggedIn } = useGlobalContext()
    const { data: post } = useAppwrite(() => userPosts(user.$id))

    const logout = async () => {
        await sigOut();
        setUser(null)
        setIsLoggedIn(false)

        router.replace('/sign-in')

    }



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
                data={post}
                keyExtractor={(item: any) => item.$id ?? ""}
                renderItem={({ item }) => (

                    <VideoCard video={item} />

                )}

                ListHeaderComponent={() => (
                    <View className='mpx-4 mt-6 mb-12 w-full justify-center items-center'>
                        <TouchableOpacity className='w-full items-end mb-10' onPress={logout}>
                            <Image
                                source={icons.logout}
                                resizeMode='contain'
                                className='w-6 h-6'
                            />
                        </TouchableOpacity>

                        <View className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                            <Image
                                source={{ uri: user?.avatar }}
                                resizeMode='cover'
                                className='w-[90%] h-[90%] rounded-lg'
                            />
                        </View>

                        <InfoBox
                            title={user?.username}
                            containerStyles='mt-5'
                            titleStyles="text-lg" subtitle={''} />

                        <View className='mt-5 flex-row items-center justify-center'>
                            <InfoBox
                                title={post.length || 0}
                                subtitle="Posts"
                                containerStyles='mr-10'
                                titleStyles="text-xl"
                            />
                            <InfoBox
                                title='200.2K'
                                subtitle='Followers'
                                containerStyles='mr-5'
                                titleStyles="text-xl"
                            />
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

export default Profile