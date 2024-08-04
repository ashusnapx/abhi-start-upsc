import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Alert,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { appwriteService } from "@/lib/appwrite";

const SignUp = () => {
  const [form, setForm] = useState<{
    name: string;
    email: string;
    password: string;
    role: "admin" | "student";
    secretCode: string;
  }>({
    name: "",
    email: "",
    password: "",
    role: "student",
    secretCode: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignUpEnabled, setIsSignUpEnabled] = useState(false);

  const handleTextChange = (field: string, value: string) => {
    if (field === "role") {
      if (value === "admin") {
        setIsAdmin(true);
        setIsSignUpEnabled(false);
      } else if (value === "student") {
        setIsAdmin(false);
        setIsSignUpEnabled(true);
      }
    }

    if (field === "secretCode") {
      if (value === "1234") {
        setIsSignUpEnabled(true);
      } else {
        setIsSignUpEnabled(false);
      }
    }

    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async () => {
    if (
      !form.name ||
      !form.email ||
      !form.password ||
      (isAdmin && !isSignUpEnabled)
    ) {
      Alert.alert("Error", "Please fill all the fields correctly.");
      return;
    }

    setIsSubmitting(true);

    try {
      const newUser = await appwriteService.createUser(
        form.email,
        form.password,
        form.name,
        form.role
      );

      // Navigate to the home page and pass the user role
      router.replace({
        pathname: "/home",
        params: { role: form.role },
      });
    } catch (error: any) {
      const errorMessage =
        typeof error.message === "string"
          ? error.message
          : "An unknown error occurred. Please try again.";
      Alert.alert("Error", errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* Name */}
          <FormField
            title='Name'
            value={form.name}
            handleTextChange={(e: any) => handleTextChange("name", e)}
            otherStyles='mt-7'
          />

          {/* Email */}
          <FormField
            title='Email'
            value={form.email}
            handleTextChange={(e: any) => handleTextChange("email", e)}
            otherStyles='mt-7'
            keyboardType='email-address'
          />

          {/* Password */}
          <FormField
            title='Password'
            value={form.password}
            handleTextChange={(e: any) => handleTextChange("password", e)}
            otherStyles='mt-7'
            placeholder='Password length should be min. 8'
            secureTextEntry
          />

          {/* Role Selection */}
          <FormField
            title='Role (student or admin)'
            value={form.role}
            handleTextChange={(e: any) =>
              handleTextChange("role", e.toLowerCase())
            }
            otherStyles='mt-7'
          />

          {/* Secret Code Input for Admins */}
          {isAdmin && (
            <TextInput
              placeholder='Enter Secret Code'
              value={form.secretCode}
              onChangeText={(e) => handleTextChange("secretCode", e)}
              secureTextEntry
              className='bg-white text-black mt-7 px-4 py-3 rounded-md'
            />
          )}

          {/* Sign Up Button */}
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
            disabled={!isSignUpEnabled}
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
