import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function RedirectToLogin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return null;
}
