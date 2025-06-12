import { auth } from "../firebase/config";
import { router } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { showToast } from "./toastMessage";
import { AuthErrorMessages } from "@/constants/auth/authErrorMessages";

export const fetchCurrentUserUid = async () => {
  const user = auth.currentUser;
  return user ? user.uid : null;
};

export const fetchCurrentUserInfo = async () => {
  const user = auth.currentUser;

  if (user) {
    return {
      uid: user.uid,
      email: user.email,
      nickname: user.displayName,
      photoURL: user.photoURL,
    };
  } else {
    // 아직 로그인 정보가 준비 안 된 상태일 수도 있음
    return null;
  }
};

// 유저 인증
export const getCurrentUserOrRedirect = () => {
  const user = auth.currentUser;
  if (!user) {
    showToast(AuthErrorMessages.noUser);
    router.replace(ROUTES.LOGIN); // 또는 ONBOARDING 등
    return null;
  }
  return user;
};
