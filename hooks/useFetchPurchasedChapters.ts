import { useState, useEffect, useCallback } from "react";
import { database, appwriteConfig, account } from "@/lib/appwrite";

export const useFetchPurchasedChapters = () => {
  const [purchasedChapters, setPurchasedChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPurchasedChapters = useCallback(async () => {
    setLoading(true);
    try {
      const user = await account.get();
      const userId = user.$id;

      // Fetch purchases
      const purchasesResponse = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.purchasesCollectionId
      );
      console.log("Purchases Response:", purchasesResponse);

      // Fetch chapters
      const chaptersResponse = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.chapterCollectionId
      );
      console.log("Chapters Response:", chaptersResponse);

      // Process documents
      const chaptersMap = new Map(
        chaptersResponse.documents.map((doc: any) => [doc.$id, doc])
      );

      const matchedChapters = purchasesResponse.documents
        .filter((doc: any) => doc.userId.$id === userId)
        .flatMap((purchaseDoc: any) => {
          const chapterDoc = chaptersMap.get(purchaseDoc.chapterId);
          if (chapterDoc) {
            return {
              ...chapterDoc,
              purchaseId: purchaseDoc.$id,
            };
          }
          return [];
        });

      console.table(matchedChapters);

      setPurchasedChapters(matchedChapters);
    } catch (error) {
      console.error("Error fetching purchased chapters:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPurchasedChapters();
  }, [fetchPurchasedChapters]);

  return { purchasedChapters, loading };
};
