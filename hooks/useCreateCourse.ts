import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { database, appwriteConfig } from "@/lib/appwrite";

const useCreateCourse = () => {
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const handleCreateCourse = useCallback(async () => {
    try {
      if (!title || !imageUrl || !price) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.subjectCollectionId,
        "unique()",
        {
          title,
          subjectImageLink: imageUrl,
          price: parseInt(price, 10),
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
  }, [title, imageUrl, price]);

  return {
    title,
    imageUrl,
    price,
    setTitle,
    setImageUrl,
    setPrice,
    handleCreateCourse,
  };
};

export default useCreateCourse;
