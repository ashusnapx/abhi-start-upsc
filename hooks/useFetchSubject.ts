import { useState, useEffect, useCallback } from "react";
import { database, appwriteConfig } from "@/lib/appwrite";

export const useFetchSubject = (subjectId: string | undefined) => {
  const [subjectName, setSubjectName] = useState<string | null>(null);
  const [subjectImage, setSubjectImage] = useState<string | null>(null);
  const [subjectPrice, setSubjectPrice] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSubject = useCallback(async () => {
    try {
      if (!subjectId) {
        setError("No subject selected");
        return;
      }

      const subjectResponse = await database.getDocument(
        appwriteConfig.databaseId,
        appwriteConfig.subjectCollectionId,
        subjectId
      );

      if (subjectResponse) {
        setSubjectName(subjectResponse.title || "Subject");
        setSubjectImage(subjectResponse.subjectImageLink || "");
        setSubjectPrice(subjectResponse.price || 0);
      } else {
        setError("Subject not found");
      }
    } catch (error) {
      console.error("Error fetching subject:", error);
      setError("Failed to load subject");
    }
  }, [subjectId]);

  useEffect(() => {
    fetchSubject();
  }, [fetchSubject]);

  return { subjectName, subjectImage, subjectPrice, error };
};
