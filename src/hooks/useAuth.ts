// hooks/useAuth.ts
import { useEffect, useState } from "react";

export function useAuth() {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('"http://localhost:5000/api/users/profil"', {
          credentials: "include",
        });

        if (res.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return { isAuthenticated, isLoading };
}
