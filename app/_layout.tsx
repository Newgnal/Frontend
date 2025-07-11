import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { toastConfig } from "@/components/ui/Toast/toastConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import Toast from "react-native-toast-message";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="category/semiconductor"
            options={{
              title: "",
            }}
          />
          <Stack.Screen name="header/search" options={{ headerShown: false }} />
          <Stack.Screen
            name="header/alarm"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="news/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="newgnal" options={{ headerShown: false }} />
          <Stack.Screen name="mp" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
        <Toast config={toastConfig} topOffset={100} position="top" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
