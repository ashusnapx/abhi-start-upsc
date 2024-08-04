import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";

type FormFieldProps = {
  title: string;
  value: string;
  placeholder?: string;
  handleTextChange: (text: string) => void;
  otherStyles?: string;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  secureTextEntry?: boolean;
};

const FormField = ({
  title,
  value,
  placeholder,
  handleTextChange,
  otherStyles,
  keyboardType,
  ...props
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          placeholder={placeholder}
          placeholderTextColor='#7b7b8b'
          onChangeText={handleTextChange}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />

        {/* !TODO: this part of code is meant for hiding and unhiding password, i've commented it coz it was giving some error which can be seen later */}
        {/* {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )} */}
      </View>
    </View>
  );
};

export default FormField;
