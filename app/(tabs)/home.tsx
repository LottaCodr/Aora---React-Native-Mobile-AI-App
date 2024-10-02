import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import VideoCard from '@/components/VideoCard'
import { images } from '@/constants'
import { getAllPosts, getLatestPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import { useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { data: posts, refetch, isLoading } = useAppwrite(getAllPosts)
  const { data: latestPosts} = useAppwrite(getLatestPosts)
  const [refreshing, setRefreshing] = useState(false)


  const onRefresh = async () => {
    setRefreshing(true)
    await refetch();
    setRefreshing(false)
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
          data={posts}
          keyExtractor={(item: any) => item.$id ?? ""}
          renderItem={({ item }) => (

            <VideoCard video={item}/>

          )}

          ListHeaderComponent={() => (
            <View className='my-6 px-4 space-y-6'>
              <View className='justify-between items-start flex-row mb-6'>
                <View>
                  <Text className='font-pmedium text-sm text-gray-100'> Welcome Back</Text>
                  <Text className='text-2xl font-psemibold text-white'> Mr. Lota</Text>
                </View>

                <View className='mt-1.5'>
                  <Image
                    source={images.logoSmall}
                    className='w-9 h-10'
                    resizeMode='contain'
                  />
                </View>
              </View>

              <SearchInput />

              <View className='w-full flex-1 pt-5 pb-8'>
                <Text className='text-lg font-pregular text-gray-100 mb-3'>Latest Videos</Text>
              </View>

              <Trending
                posts={
                  latestPosts
                }
              />
            </View>
          )}

          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="Be the first to upload a video"
            />
          )}

          refreshControl={<RefreshControl
            refreshing={refreshing} onRefresh={onRefresh}
          />}
        />
        {/* )} */}
    </SafeAreaView>
  )
}

export default Home