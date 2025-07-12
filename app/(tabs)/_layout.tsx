import { Tabs } from "expo-router";
import { Platform, Text } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import HomeIcon from "@/assets/images/home.svg";
import HomeGrayIcon from "@/assets/images/ic_homegray.svg";

import MynewgnalIcon from "@/assets/images/ic_newganl.svg";
import MynewgnalGrayIcon from "@/assets/images/ic_newganlgray.svg";

import CommunityGrayIcon from "@/assets/images/communitygray.svg";
import CommunityIcon from "@/assets/images/ic_com.svg";

import SimulateIcon from "@/assets/images/ic_invest.svg";
import SimulateGrayIcon from "@/assets/images/ic_investgray.svg";

import ProfileIcon from "@/assets/images/ic_profile.svg";
import ProfileGrayIcon from "@/assets/images/ic_profilegray.svg";

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
        name="home"
        options={{
          title: "홈",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <HomeGrayIcon width={24} height={24} />
            ) : (
              <HomeIcon width={24} height={24} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#414141" : "#A8B2B8",
                textAlign: "center",
                fontFamily: "Pretendard",
                fontSize: 11,
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: 11,
                letterSpacing: 0.066,
              }}
            >
              홈
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="mynewgnal"
        options={{
          title: "내 뉴그널",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <MynewgnalIcon width={24} height={24} />
            ) : (
              <MynewgnalGrayIcon width={24} height={24} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#414141" : "#A8B2B8",
                textAlign: "center",
                fontFamily: "Pretendard",
                fontSize: 11,
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: 11,
                letterSpacing: 0.066,
              }}
            >
              내 뉴그널
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "커뮤니티",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <CommunityIcon width={24} height={24} />
            ) : (
              <CommunityGrayIcon width={24} height={24} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#414141" : "#A8B2B8",
                textAlign: "center",
                fontFamily: "Pretendard",
                fontSize: 11,
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: 11,
                letterSpacing: 0.066,
              }}
            >
              커뮤니티
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="simulate"
        options={{
          title: "모의투자",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <SimulateIcon width={24} height={24} />
            ) : (
              <SimulateGrayIcon width={24} height={24} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#414141" : "#A8B2B8",
                textAlign: "center",
                fontFamily: "Pretendard",
                fontSize: 11,
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: 11,
                letterSpacing: 0.066,
              }}
            >
              모의투자
            </Text>
          ),
        }}
      />

      <Tabs.Screen
        name="mypage"
        options={{
          title: "프로필",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <ProfileIcon width={24} height={24} />
            ) : (
              <ProfileGrayIcon width={24} height={24} />
            ),
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                color: focused ? "#414141" : "#A8B2B8",
                textAlign: "center",
                fontFamily: "Pretendard",
                fontSize: 11,
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: 11,
                letterSpacing: 0.066,
              }}
            >
              프로필
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
