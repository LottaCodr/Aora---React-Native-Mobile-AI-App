import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants'
import { AVPlaybackStatusSuccess, ResizeMode, Video } from 'expo-av'




type VideoCardProps = {
    video: {
        title: string,
        thumbnail: string,
        video: string,
        creator: {
            username: string,
            avatar: string
        }
    }
}



const VideoCard = ({ video: { title, thumbnail, video, creator: { username, avatar } } }: VideoCardProps) => {
    const [play, setPlay] = useState(false)
    const videoRef = React.useRef<Video>(null); // Reference for the Video component


    console.log(video)


    const handlePlaybackStatusUpdate = (status: AVPlaybackStatusSuccess | any) => {
        if (status.isLoaded && status.didJustFinish) { 
            setPlay(true);
        }
    };

    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View className='flex-row gap-3 items-start'>
                <View className='justify-center items-center flex-row flex-1'>
                    <View className='w-[46px] h-[46px] rounded-lg border border-secondary-100 justify-center items-center p-0.5'>
                        <Image source={{ uri: avatar }} className='w-full h-full rounded-lg'
                            resizeMode='cover'
                        />
                    </View>

                    <View className='justify-center flex-1 ml-3 gap-y-1'>
                        <Text className='text-psemibold text-white text-sm' numberOfLines={1}>{title}</Text>
                        <Text className='text-xs text-gray-100 font-pregular' numberOfLines={1}> {username}</Text>
                    </View>
                </View>
            <View className='pt-2'>
                <Image source={icons.menu} className='w-5 h-5 rounded-lg' 
                resizeMode='contain'
                />
            </View>
            </View>

            {play ? 
            <Video
            ref={videoRef}
            source={{ uri: video}}
            className='w-full h-60 rounded-xl mt-3'
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
            />
        :
        <TouchableOpacity className='w-full h-60 rounded-xl mt-3 relative justify-center items-center
        '>
            <Image source={{ uri: thumbnail }} className='w-full h-full rounded-xl mt-3'
            resizeMode='cover'/>
            <Image source={icons.play} className='w-12 h-12 absolute rounded-xl'
            resizeMode='contain'/>
        </TouchableOpacity>
        }

        </View>
    )
}

export default VideoCard