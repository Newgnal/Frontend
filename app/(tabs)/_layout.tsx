import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import CommunityIcon from "@/assets/images/community.svg";
import HomeIcon from "@/assets/images/home.svg";
import SimulateIcon from "@/assets/images/ic_invest.svg";
import NewsroomIcon from "@/assets/images/ic_newganl.svg";
import ProfileIcon from "@/assets/images/icn_profile.svg";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {
            backgroundColor: "white",
            borderTopWidth: 1,
            borderTopColor: "#030712",
            elevation: 0,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={28.103}
              height={28.103}
              // stroke={focused ? "#414141" : "#D9D9D9"}
              stroke="currentColor"
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />

      <Tabs.Screen
        name="newsroom"
        options={{
          title: "내 뉴스룸",
          tabBarIcon: ({ focused }) => (
            <NewsroomIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
              // stroke="currentColor"
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />

      <Tabs.Screen
        name="community"
        options={{
          title: "커뮤니티",
          tabBarIcon: ({ focused }) => (
            <CommunityIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
              fill="none"
              strokeWidth={2}
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />

      <Tabs.Screen
        name="simulate"
        options={{
          title: "모의투자",
          tabBarIcon: ({ focused }) => (
            <SimulateIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
              fill="none"
              strokeWidth={2}
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />

      <Tabs.Screen
        name="mypage"
        options={{
          title: "프로필",
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              width={28.103}
              height={28.103}
              stroke={focused ? "#414141" : "#D9D9D9"}
              fill="none"
              strokeWidth={2}
            />
          ),
          tabBarLabelStyle: {
            color: "#414141",
            textAlign: "center",
            fontFamily: "Pretendard",
            fontSize: 10.539,
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: 17.564,
          },
        }}
      />
    </Tabs>
  );
}
