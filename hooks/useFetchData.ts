import { useState, useCallback } from "react";
import { account, database, appwriteConfig } from "@/lib/appwrite";

interface CourseData {
  id: string;
  title: string;
  imageUrl: string;
}

const useFetchData = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<CourseData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch user details
      const user = await account.get();
      setUserName(user.name);

      // Fetch subjects
      const subjectResponse = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.subjectCollectionId
      );
      setSubjects(
        subjectResponse.documents.map((doc: any) => ({
          id: doc.$id,
          title: doc.title,
          imageUrl: doc.subjectImageLink,
        }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  return {
    userName,
    subjects,
    loading,
    refreshing,
    setRefreshing,
    fetchData,
  };
};

export default useFetchData;
