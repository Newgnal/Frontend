import { toastConfig } from "@/components/ui/Toast/toastConfig";
import { AuthProvider, useAuth } from "@/context/authContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

function ProtectedLayout({ children }: { children: React.ReactNode }) {
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

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <AuthProvider>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <ProtectedLayout>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="category"
                options={{
                  title: "",
                }}
              />
              <Stack.Screen
                name="header/search"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="header/alarm"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="category/[categoryid]"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="news/[id]" options={{ headerShown: false }} />
              <Stack.Screen name="newgnal" options={{ headerShown: false }} />
              <Stack.Screen
                name="community/post"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="mp" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
            <Toast config={toastConfig} topOffset={100} position="top" />
          </ProtectedLayout>
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
