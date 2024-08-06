import { useState, useCallback } from "react";
import { Alert } from "react-native";
import { database, appwriteConfig } from "@/lib/appwrite";

const useCreateChapter = () => {
  const [title, setTitle] = useState<string>("");
  const [importantFor, setImportantFor] = useState<string>("");
  const [pyqYear, setPyqYear] = useState<string>("");
  const [pdfLink, setPdfLink] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [subjectId, setSubjectId] = useState<string>("");

  const handleCreateChapter = useCallback(async () => {
    try {
      if (
        !title ||
        !importantFor ||
        !pyqYear ||
        !pdfLink ||
        !price ||
        !subjectId
      ) {
        Alert.alert("Error", "All fields are required.");
        return;
      }

      await database.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.chapterCollectionId,
        "unique()",
        {
          title,
          importantFor,
          pyqYear,
          pdfLink,
          price: parseInt(price, 10),
          subjectId,
        }
      );
      Alert.alert("Success", "Chapter created successfully!");
      // Clear input fields
      setTitle("");
      setImportantFor("");
      setPyqYear("");
      setPdfLink("");
      setPrice("");
      setSubjectId("");
    } catch (error) {
      // console.error("Error creating chapter:", error);
      Alert.alert("Error", "Failed to create chapter.");
    }
  }, [title, importantFor, pyqYear, pdfLink, price, subjectId]);

  return {
    title,
    setTitle,
    importantFor,
    setImportantFor,
    pyqYear,
    setPyqYear,
    pdfLink,
    setPdfLink,
    price,
    setPrice,
    subjectId,
    setSubjectId,
    handleCreateChapter,
  };
};

export default useCreateChapter;
