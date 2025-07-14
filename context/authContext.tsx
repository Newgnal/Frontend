import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DEV_MODE = process.env.EXPO_PUBLIC_DEV_MODE === "true";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuth = async () => {
    try {
      if (DEV_MODE) {
        setIsLoggedIn(true);
        return;
      }
      const token = await AsyncStorage.getItem("access_token");
      console.log("checkAuth() 호출됨. 토큰:", token);
      setIsLoggedIn(!!token && token !== "");
    } catch (err) {
      console.error("checkAuth 실패:", err);
      setIsLoggedIn(false);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(["access_token", "refresh_token"]);
      setIsLoggedIn(false);
    } catch (err) {
      console.error("logout 실패:", err);
    }
  };

  // 앱 시작 시 로그인 여부 확인
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkAuth, logout }}>
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
