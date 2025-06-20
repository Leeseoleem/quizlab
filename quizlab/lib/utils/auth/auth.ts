import { supabase } from "@/lib/supabase";

// 회원가입
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
};

// 로그인 활성화
export const isSubmitButtonEnabled = (email: string, password: string) => {
  return email.trim() !== "" && password.trim() !== "";
};

// 로그인
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
};

// 로그아웃
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};
