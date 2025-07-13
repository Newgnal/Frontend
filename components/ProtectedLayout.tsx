import { useAuth } from "@/context/authContext";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const inAuthScreen = segments[0] === "login";
    if (!isLoggedIn && !inAuthScreen) {
      router.replace("/login");
    }
  }, [router, segments, isLoggedIn, isReady]);

  return <>{children}</>;
}
