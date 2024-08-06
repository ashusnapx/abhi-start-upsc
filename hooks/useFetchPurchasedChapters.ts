import { useState, useEffect, useCallback } from "react";
import { database, appwriteConfig, account } from "@/lib/appwrite";

export const useFetchPurchasedChapters = () => {
  const [purchasedChapterIds, setPurchasedChapterIds] = useState<string[]>([]);

  const fetchPurchasedChapters = useCallback(async () => {
    try {
      const user = await account.get();
      const userId = user.$id;

      const response = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.purchasesCollectionId
      );

      const purchasedChapterIds = response.documents
        .filter((doc: any) => doc.userId.$id === userId)
        .flatMap((doc: any) => {
          const chapterIds = doc.chapterId || [];
          return Array.isArray(chapterIds)
            ? chapterIds.map((id: any) => id.$id)
            : [chapterIds.$id];
        });

      setPurchasedChapterIds(purchasedChapterIds);
    } catch (error) {
      console.error("Error fetching purchased chapters:", error);
    }
  }, []);

  useEffect(() => {
    fetchPurchasedChapters();
  }, [fetchPurchasedChapters]);

  return purchasedChapterIds;
};
