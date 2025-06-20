import { supabase } from "@/lib/supabase";

export const insertUserInfo = async (nickname: string) => {
  // 현재 로그인된 유저 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("유저 정보를 불러올 수 없습니다");

  // user_info에 insert
  const { error } = await supabase.from("user_info").insert({
    user_id: user.id,
    nickname,
    is_complete: false,
  });

  if (error) throw error;
};

export const completeSignup = async () => {
  // 현재 로그인된 유저 가져오기
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("유저 정보를 불러올 수 없습니다");

  // is_complete 업데이트
  const { error: updateError } = await supabase
    .from("user_info")
    .update({ is_complete: true })
    .eq("user_id", user.id);

  if (updateError) throw updateError;

  // 로그아웃 처리
  const { error: signOutError } = await supabase.auth.signOut();
  if (signOutError) throw signOutError;
};

// 닉네임 수정하기
export const updateNickname = async (nickname: string) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("유저 정보를 불러올 수 없습니다");

  const { error } = await supabase
    .from("user_info")
    .update({ nickname })
    .eq("user_id", user.id);

  if (error) throw error;
};

// 닉네임 불러오기
export const getNickname = async (): Promise<string> => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) throw new Error("유저 정보를 불러올 수 없습니다");

  const { data, error } = await supabase
    .from("user_info")
    .select("nickname")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw error;
  if (!data || !data.nickname) throw new Error("닉네임이 존재하지 않습니다");

  return data.nickname;
};
