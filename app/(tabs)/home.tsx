import EmptyState from '@/components/EmptyState'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import { images } from '@/constants'
import { getAllPosts } from '@/lib/appwrite'
import useAppwrite from '@/lib/useAppwrite'
import {  useState } from 'react'
import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
const {data: posts} = useAppwrite(getAllPosts)
  const [refreshing, setRefreshing] = useState(false)
 

  const onRefresh = async () => {
    setRefreshing(true)
    //recall videos -> if any new videos appeared
    setRefreshing(false)
  }

  console.log(posts)

  return (
    <SafeAreaView className='bg-primary h-full'>

      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 },]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text className='text-3xl text-white'>{item.id}</Text>
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
              posts={[
                //   {
                //   id: "Me",
                //   title: ''
                // }, {
                //   id: "Them",
                //   title: ''
                // }
              ]
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
    </SafeAreaView>
  )
}

export default Home