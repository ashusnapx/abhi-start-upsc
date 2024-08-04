import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Alert,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { database, appwriteConfig } from "@/lib/appwrite";

const Create = () => {
  const [view, setView] = useState<"course" | "chapter" | null>(null);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [importantFor, setImportantFor] = useState<string>("");
  const [pyqYear, setPyqYear] = useState("");
  const [pdfLink, setPdfLink] = useState("");
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Fetch subjects for the dropdown
  const fetchSubjects = useCallback(async () => {
    try {
      const subjectResponse = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.subjectCollectionId
      );
      setSubjects(subjectResponse.documents);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleCreateCourse = async () => {
    try {
      if (!title || !imageUrl || !price) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.subjectCollectionId,
        "unique()", // Or any unique ID generation strategy
        {
          title,
          subjectImageLink: imageUrl,
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
      if (
        !title ||
        !importantFor ||
        !pdfLink ||
        !price ||
        !subjectId ||
        !pyqYear
      ) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chapterCollectionId,
        "unique()", // Or any unique ID generation strategy
        {
          title,
          importantFor,
          pdfLink,
          pyqYear,
          price: parseInt(price, 10), // Ensure price is an integer
          subjectId,
        }
      );
      Alert.alert("Success", "Chapter created successfully!");
      setTitle("");
      setImportantFor("");
      setPdfLink("");
      setPyqYear("");
      setPrice("");
      setSubjectId(null);
    } catch (error) {
      console.error("Error creating chapter:", error);
      Alert.alert("Error", "Failed to create chapter.");
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchSubjects();
  };

  if (view === "course") {
    return (
      <SafeAreaView className='flex-1 p-4 bg-gray-900'>
        <ScrollView>
          <Text className='text-2xl font-bold mb-8 mt-12 text-white'>
            Create a Course
          </Text>
          <FormField
            title='Title of Subject'
            value={title}
            handleTextChange={setTitle}
            placeholder='Title of Subject'
          />
          <FormField
            title='Image URL for Subject'
            value={imageUrl}
            handleTextChange={setImageUrl}
            placeholder='Image URL for Subject'
          />
          <FormField
            title='Price of Subject'
            value={price}
            handleTextChange={setPrice}
            placeholder='Price of Subject'
            keyboardType='numeric'
          />
          <CustomButton
            title='Create Course'
            handlePress={handleCreateCourse}
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

  if (view === "chapter") {
    return (
      <SafeAreaView className='flex-1 p-4 bg-gray-900'>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text className='text-2xl font-bold mb-8 mt-12 text-white'>
            Create a Chapter
          </Text>
          <FormField
            title='Title'
            value={title}
            handleTextChange={setTitle}
            placeholder='Title'
          />

          <Picker
            selectedValue={importantFor}
            onValueChange={(itemValue) => setImportantFor(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label='Select Importance' value='' />
            <Picker.Item label='Pre' value='Pre' />
            <Picker.Item label='Mains' value='Mains' />
            <Picker.Item label='Pre + Mains' value='Pre + Mains' />
          </Picker>
          <FormField
            title='PYQ Year'
            value={pyqYear}
            handleTextChange={setPyqYear}
            placeholder='PYQ Year'
            keyboardType='numeric'
            otherStyles='mb-4'
          />
          <FormField
            title='PDF Link'
            value={pdfLink}
            handleTextChange={setPdfLink}
            placeholder='PDF Link'
            otherStyles='mb-4'
          />
          <FormField
            title='Price'
            value={price}
            handleTextChange={setPrice}
            placeholder='Price'
            keyboardType='numeric'
            otherStyles='mb-4'
          />
          <Picker
            selectedValue={subjectId}
            onValueChange={(itemValue) => setSubjectId(itemValue)}
            style={styles.picker}
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

const styles = StyleSheet.create({
  picker: {
    color: "white", // Text color of Picker items
    backgroundColor: "gray", // Background color for Picker
    borderRadius: 4, // Optional: Add rounded corners
    marginBottom: 16, // Optional: Add spacing
  },
});

export default Create;
