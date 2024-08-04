import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";
import { database, appwriteConfig } from "@/lib/appwrite";
import { Picker } from "@react-native-picker/picker";
import CustomButton from "@/components/CustomButton";

const Create = () => {
  const [view, setView] = useState<"course" | "chapter" | null>(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [importantFor, setImportantFor] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    // Fetch subjects for the dropdown
    const fetchSubjects = async () => {
      try {
        const subjectResponse = await database.listDocuments(
          appwriteConfig.databaseId,
          appwriteConfig.subjectCollectionId
        );
        setSubjects(subjectResponse.documents);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const handleCreateCourse = async () => {
    try {
      if (!title || !imageUrl || !price) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.subjectCollectionId, // Correct collection ID for subjects
        "unique()", // Or any unique ID generation strategy
        {
          title,
          subjectImageLink: imageUrl, // Correct attribute for image URL
          price: parseInt(price, 10), // Ensure price is an integer
        }
      );
      Alert.alert("Success", "Course created successfully!");
      setTitle("");
      setImageUrl("");
      setPrice("");
    } catch (error) {
      console.error("Error creating course:", error);
      Alert.alert("Error", "Failed to create course.");
    }
  };

  const handleCreateChapter = async () => {
    try {
      if (!title || !importantFor || !pdfLink || !price || !subjectId) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chapterCollectionId, // Correct collection ID for chapters
        "unique()", // Or any unique ID generation strategy
        {
          title,
          importantFor,
          pdfLink,
          price: parseInt(price, 10), // Ensure price is an integer
          subjectId,
        }
      );
      Alert.alert("Success", "Chapter created successfully!");
      setTitle("");
      setImportantFor("");
      setPdfLink("");
      setPrice("");
      setSubjectId(null);
    } catch (error) {
      console.error("Error creating chapter:", error);
      Alert.alert("Error", "Failed to create chapter.");
    }
  };

  if (view === "course") {
    return (
      <SafeAreaView className='flex-1 p-4 bg-gray-200'>
        <Text className='text-2xl font-bold mb-4 mt-12'>Create a Course</Text>
        <TextInput
          placeholder='Title of Subject'
          value={title}
          onChangeText={setTitle}
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <TextInput
          placeholder='Image URL for Subject'
          value={imageUrl}
          onChangeText={setImageUrl}
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <TextInput
          placeholder='Price of Subject'
          value={price}
          onChangeText={setPrice}
          keyboardType='numeric'
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <Button title='Create Course' onPress={handleCreateCourse} />
        <Button title='Back' onPress={() => setView(null)} color='gray' />
      </SafeAreaView>
    );
  }

  if (view === "chapter") {
    return (
      <SafeAreaView className='flex-1 p-4 bg-gray-200'>
        <Text className='text-2xl font-bold mb-4 mt-12'>Create a Chapter</Text>
        <TextInput
          placeholder='Title'
          value={title}
          onChangeText={setTitle}
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <TextInput
          placeholder='Important For'
          value={importantFor}
          onChangeText={setImportantFor}
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <TextInput
          placeholder='PDF Link'
          value={pdfLink}
          onChangeText={setPdfLink}
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <TextInput
          placeholder='Price'
          value={price}
          onChangeText={setPrice}
          keyboardType='numeric'
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        <Picker
          selectedValue={subjectId}
          onValueChange={(itemValue) => setSubjectId(itemValue)}
          className='mb-4'
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
        <Button title='Create Chapter' onPress={handleCreateChapter} />
        <Button title='Back' onPress={() => setView(null)} color='gray' />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex-1 p-4 bg-gray-200 items-center justify-center'>
      <Text className='text-2xl font-bold mb-4'>Create</Text>
      <CustomButton
        title='Create a Course'
        handlePress={() => setView("course")}
        containerStyles='mt-4'
      />
      <CustomButton
        title='Create a Chapter'
        handlePress={() => setView("chapter")}
        containerStyles='mt-4'
      />
    </SafeAreaView>
  );
};

export default Create;
