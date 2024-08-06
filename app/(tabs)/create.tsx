import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import useCreateCourse from "@/hooks/useCreateCourse";
import useCreateChapter from "@/hooks/useCreateChapter";
import useSubjects from "@/hooks/useSubjects";
import { fetchUserDetails } from "@/lib/appwrite";
import useUserRole from "@/hooks/useUserRole";

const Create = () => {
  const [view, setView] = useState<"course" | "chapter" | null>(null);
const { role } = useUserRole();
  const {
    title,
    imageUrl,
    price,
    setTitle,
    setImageUrl,
    setPrice,
    handleCreateCourse,
  } = useCreateCourse();

  const {
    title: chapterTitle,
    setTitle: setChapterTitle,
    importantFor,
    setImportantFor,
    pyqYear,
    setPyqYear,
    pdfLink,
    setPdfLink,
    price: chapterPrice,
    setPrice: setChapterPrice,
    subjectId,
    setSubjectId,
    handleCreateChapter,
  } = useCreateChapter();

  const { subjects, refreshing, onRefresh } = useSubjects();

  const courseFields = [
    {
      title: "Title of Subject",
      value: title,
      handleTextChange: setTitle,
      placeholder: "Title of Subject",
    },
    {
      title: "Image URL for Subject",
      value: imageUrl,
      handleTextChange: setImageUrl,
      placeholder: "Image URL for Subject",
    },
    {
      title: "Price of Subject",
      value: price,
      handleTextChange: setPrice,
      placeholder: "Price of Subject",
      keyboardType: "numeric",
    },
  ];

  const chapterFields = [
    {
      title: "Title",
      value: chapterTitle,
      handleTextChange: setChapterTitle,
      placeholder: "Title",
    },
    {
      title: "PYQ Year",
      value: pyqYear,
      handleTextChange: setPyqYear,
      placeholder: "PYQ Year",
      keyboardType: "numeric",
    },
    {
      title: "PDF Link",
      value: pdfLink,
      handleTextChange: setPdfLink,
      placeholder: "PDF Link",
    },
    {
      title: "Price",
      value: chapterPrice,
      handleTextChange: setChapterPrice,
      placeholder: "Price",
      keyboardType: "numeric",
    },
  ];

  const renderFields = (fields: any[]) =>
    fields.map((field, index) => (
      <FormField
        key={index}
        title={field.title}
        value={field.value}
        handleTextChange={field.handleTextChange}
        placeholder={field.placeholder}
        keyboardType={field.keyboardType}
        otherStyles={index < fields.length - 1 ? "mb-4" : ""}
      />
    ));

  if (view === "course") {
    return (
      <SafeAreaView className='flex-1 p-4 bg-gray-800'>
        <ScrollView>
          <Text className='text-2xl font-bold text-white mb-4 mt-8 text-center'>
            Create a Course
          </Text>
          {renderFields(courseFields)}
          <CustomButton
            title='Create Course'
            handlePress={handleCreateCourse}
            containerStyles='mt-4'
          />
          <CustomButton
            title='Back'
            handlePress={() => setView(null)}
            containerStyles='mt-4'
            textStyles='text-black'
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (view === "chapter") {
    return (
      <SafeAreaView className='flex-1 p-4 bg-gray-800'>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text className='text-2xl font-bold text-white mb-4 mt-8 text-center'>
            Create a Chapter
          </Text>
          {renderFields(chapterFields)}
          <Picker
            selectedValue={importantFor}
            onValueChange={setImportantFor}
            className='text-white bg-gray-700 rounded-md mb-4'
          >
            <Picker.Item label='Select Importance' value='' />
            <Picker.Item label='Pre' value='Pre' />
            <Picker.Item label='Mains' value='Mains' />
            <Picker.Item label='Pre + Mains' value='Pre + Mains' />
          </Picker>
          <Picker
            selectedValue={subjectId}
            onValueChange={setSubjectId}
            className='text-white bg-gray-700 rounded-md mb-4'
          >
            <Picker.Item label='Select Subject' value='' />
            {subjects.map((subject) => (
              <Picker.Item
                key={subject.$id}
                label={subject.title}
                value={subject.$id}
              />
            ))}
          </Picker>
          <CustomButton
            title='Create Chapter'
            handlePress={handleCreateChapter}
            containerStyles='mt-4'
          />
          <CustomButton
            title='Back'
            handlePress={() => setView(null)}
            containerStyles='mt-4'
            textStyles='text-gray-500'
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 p-4 bg-gray-800'>
      <Text className='text-2xl font-bold text-white mb-4 mt-8 text-center'>
        Create
      </Text>
      {role === "admin" ? (
        <>
          <CustomButton
            title='Create a Course'
            handlePress={() => setView("course")}
            containerStyles='mt-4'
            disabled={role !== "admin"}
          />
          <CustomButton
            title='Create a Chapter'
            handlePress={() => setView("chapter")}
            containerStyles='mt-4'
            disabled={role !== "admin"}
          />
        </>
      ) : (
        <View className='flex-1 justify-center items-center'>
          <Text className="text-xl text-center text-red-600 mb-4">This feature is only meant for admin!</Text>
          <Image
            source={{
              uri: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnJpMXNidnE2d3hjanBrdW9yZjF2emh5a3ljbXc1ZmpvdnRua2J2eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zb4gsGCnTG6TtFBEWB/giphy.webp",
            }} 
            style={{ width: 500, height: 400 }} 
            className="border rounded-md"
            resizeMode='contain'
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Create;
