import { useState, useEffect, useCallback } from "react";
import { database, appwriteConfig } from "@/lib/appwrite";
import { Query } from "react-native-appwrite";

interface Chapter {
  $id: string;
  title: string;
  importantFor: string;
  pdfLink: string;
  price: number;
  pyqYear: string;
  subjectId: string;
}

export const useFetchChapters = (subjectId: string | undefined) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChapters = useCallback(async () => {
    try {
      if (!subjectId) {
        setError("No subject selected");
        return;
      }

      const response = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chapterCollectionId,
        [Query.equal("subjectId", subjectId)]
      );

      const documents = response.documents.map((doc: any) => ({
        $id: doc.$id,
        title: doc.title || "",
        importantFor: doc.importantFor || "",
        pdfLink: doc.pdfLink || "",
        price: doc.price || 0,
        pyqYear: doc.pyqYear || "",
        subjectId: doc.subjectId || "",
      })) as Chapter[];

      if (documents.length === 0) {
        setError("No chapters found for this subject");
      } else {
        setChapters(documents);
      }
    } catch (error) {
      console.error("Error fetching chapters:", error);
      setError("Failed to load chapters");
    } finally {
      setLoading(false);
    }
  }, [subjectId]);

  useEffect(() => {
    fetchChapters();
  }, [fetchChapters]);

  return { chapters, loading, error, fetchChapters };
};
