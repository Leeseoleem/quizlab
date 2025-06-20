/*
// Firebase 설정: Supabase로 이전으로 인해 파일 이동 후 주석 처리함

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// context 생성
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Provider 컴포넌트 정의
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // 디버깅 로그
      console.log(
        "Auth state changed:",
        firebaseUser ? "User logged in" : "User logged out"
      );
      console.log("User:", firebaseUser); 

      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// 사용자 정의 훅
export const useAuth = () => useContext(AuthContext);
*/
