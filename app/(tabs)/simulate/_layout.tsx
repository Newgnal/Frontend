import { Stack } from "expo-router";

export default function SimulateLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
