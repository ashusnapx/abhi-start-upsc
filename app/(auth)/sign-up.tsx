import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // submit form details
  const submit = async () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert(
        "Error",
        "Please fill all the fields correctly my future aspirant"
      );
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.name);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // loading state when user click on sign in/up button
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center h-screen px-4 my-6'>
          <Image
            source={images.logoNew}
            resizeMode='contain'
            className='w-[140px] h-[140px] object-cover mb-5'
          />
          <Text className='text-2xl text-white text-semibold -tracking-tighter mt-10 font-psemibold'>
            Sign Up to clear UPSC
          </Text>

          {/* take users name */}
          <FormField
            title='Name'
            value={form.name}
            handleTextChange={(e: any) => setForm({ ...form, name: e })}
            otherStyles='mt-7'
          />

          {/* take users email */}
          <FormField
            title='Email'
            value={form.email}
            handleTextChange={(e: any) => setForm({ ...form, email: e })}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          {/* take users password */}
          <FormField
            title='Password'
            value={form.password}
            handleTextChange={(e: any) => setForm({ ...form, password: e })}
            otherStyles='mt-7'
          />

          {/* button for finalizing sign in/ sign up */}
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />

          <View className='flex-col justify-center pt-5 gap-2 text-center items-center'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Already have an account?
            </Text>
            <Link
              href='/sign-in'
              className='text-lg font-psemibold text-secondary'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
