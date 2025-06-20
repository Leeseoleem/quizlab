import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

// context 제공 타입 정의
interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean; // 세션 or user_info 로딩 중 여부
  userInfo: UserInfo | null;
}

// userInfo 타입 정의
interface UserInfo {
  nickname?: string;
  is_complete?: boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  isLoading: true,
  userInfo: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);

  // 세션 초기화
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // user_info 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (session?.user) {
        const { data } = await supabase
          .from("user_info")
          .select("nickname, is_complete")
          .eq("user_id", session.user.id)
          .maybeSingle();

        setUserInfo(data ?? null);
      } else {
        setUserInfo(null);
      }

      setIsUserInfoLoading(false);
    };

    fetchUserInfo();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isLoading: isLoading || isUserInfoLoading,
        userInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
