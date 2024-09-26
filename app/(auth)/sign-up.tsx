import React, { useState } from 'react'

import { View, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
import { createUser } from '@/lib/appwrite'



const SignUp = () => {

  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () => {
    createUser()

  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className='w-full justify-center min-h-[76vh] px-6 my-6'>

          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[115px] h-[35px]"
          />
          <Text className='text-2xl text-white text-semibold mt-10 font-psemibold'>
            Log in to Aora
          </Text>

          <FormField
            title="Username"
            value={form.userName}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7" placeholder={'John Doe'} />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7" placeholder={'johndoe@email.com'}
            keyboardType='email-address' />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7" placeholder={'********'}
          />

          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting} />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
            <Link href='/sign-in' className="text-lg font-pmedium text-secondary"> Sign In</Link>
          </View>

        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp