// hooks/useUserRole.ts
import { fetchUserDetails } from "@/lib/appwrite";
import { useState, useEffect } from "react";


const useUserRole = () => {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const user = await fetchUserDetails(); // Fetch user details
        setRole(user.role); // Extract and set role
      } catch (error) {
        console.error("Failed to fetch user role", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  return { role, loading };
};

export default useUserRole;
