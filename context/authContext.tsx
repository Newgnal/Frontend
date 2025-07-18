import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  nickName: string;
  userId: number | undefined;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  updateNickname: (newNickname: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DEV_MODE = process.env.EXPO_PUBLIC_DEV_MODE === "true";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickName, setNickName] = useState("");
  const [userId, setUserId] = useState<number | undefined>(undefined);

  const checkAuth = async () => {
    try {
      if (DEV_MODE) {
        setIsLoggedIn(true);
        setNickName("developer");
        setUserId(1);
        return;
      }
      const token = await AsyncStorage.getItem("access_token");
      const savedNickname = await AsyncStorage.getItem("nickName");
      const savedUserIdRaw = await AsyncStorage.getItem("userId");
      const savedUserId = savedUserIdRaw
        ? parseInt(savedUserIdRaw, 10)
        : undefined;
      // console.log("checkAuth() 호출됨. 토큰:", token);
      setIsLoggedIn(!!token && token !== "");
      setNickName(savedNickname ?? "");
      setUserId(savedUserId);
    } catch (err) {
      console.error("checkAuth 실패:", err);
      setIsLoggedIn(false);
      setNickName("");
      setUserId(undefined);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
      setIsLoggedIn(false);
      setNickName("");
    } catch (err) {
      console.error("logout 실패:", err);
    }
  };

  const updateNickname = async (newNickname: string) => {
    setNickName(newNickname);
    try {
      await AsyncStorage.setItem("nickName", newNickname);
    } catch (err) {
      console.error("닉네임 저장 실패:", err);
    }
  };

  // 앱 시작 시 로그인 여부 확인
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        checkAuth,
        logout,
        nickName,
        userId,
        updateNickname,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 커스텀 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
