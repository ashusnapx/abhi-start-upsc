import { useState, useEffect, useCallback } from "react";
import { database, appwriteConfig } from "@/lib/appwrite";

interface Subject {
  $id: string;
  title: string;
}

const useSubjects = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const fetchSubjects = useCallback(async () => {
    try {
      const subjectResponse = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.subjectCollectionId
      );
      setSubjects(subjectResponse.documents as unknown as Subject[]);
    } catch (error) {
      // console.error("Error fetching subjects:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSubjects();
  };

  return { subjects, refreshing, onRefresh };
};

export default useSubjects;
