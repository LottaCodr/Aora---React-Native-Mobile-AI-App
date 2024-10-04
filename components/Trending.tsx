import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';

import { ResizeMode, AVPlaybackStatusSuccess, Video } from 'expo-av'; //


interface Post {
    id: string;
    title: string;
    thumbnail: string,
    video: string
}

interface TrendingProps {
    posts: Post[]
}


const zoomIn = {
    from: {
        opacity: 0,
        scale: 0,
    },

    to: {
        opacity: 1,
        scale: 1.1,
    },
};

const zoomOut = {
    from: {
        opacity: 1,
        scale: 1.1,
    },

    to: {
        opacity: 0,
        scale: 0,
    },
};

type TrendingItemsProps = {
    activeItem: Post,
    item: Post
}


const TrendingItems = ({ activeItem, item }: TrendingItemsProps) => {
    const [play, setPlay] = useState(false)
    const videoRef = React.useRef<Video>(null); // Reference for the Video component

    const isActive = activeItem.id === item.id;

    const handlePlaybackStatusUpdate = (status: AVPlaybackStatusSuccess | any) => {
        if (status.isLoaded && status.didJustFinish) { 
            setPlay(true);
        }
    };

    return (
        <Animatable.View className='mr-5'
            duration={500} animation={isActive ? zoomIn : zoomOut}>
            {play ?
                (<Video
                ref={videoRef}
                source={{ uri: item.video}}
                className='w-52 h-72 bg-white/10 rounded-[32px] mt-3'
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                shouldPlay
                onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />) :
                <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setPlay(true)}>
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className='w-52 h-72 rounded-[35px] my-5  mx-4 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain'
                    />

                </TouchableOpacity>
            }

        </Animatable.View>
    )
}
const Trending = ({ posts }: TrendingProps) => {
    const [activeItem, setActiveItem] = useState(posts[0])

    const viewableItemChanged = ({ viewableItems }: { viewableItems: any[] }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item)
        }

    }

    return (
        <FlatList
            data={posts}
            keyExtractor={(item: Post) => item.id}
            renderItem={({ item }) => (
                <TrendingItems activeItem={activeItem} item={item}

                />
            )}
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
            contentOffset={{ x: 170, y: 0 }}
            horizontal
        />
    )
}

export default Trending