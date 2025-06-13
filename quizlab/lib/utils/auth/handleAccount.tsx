import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { router } from "expo-router";

import { ROUTES } from "@/constants/routes";
import { showToast } from "../toastMessage";
import { AuthMessages } from "@/constants/auth/authMessages";
import { getCurrentUserOrRedirect } from "../fetchCurrentUserInfo";

// 회원가입 함수
export const handleSignup = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Signup error:", error.code);
    return { success: false, error: error.code };
  }
};

// 로그인 함수
interface HandleLoginProps {
  email: string;
  password: string;
  showMessage?: boolean;
}

export const handleLogin = async ({
  email,
  password,
  showMessage = true,
}: HandleLoginProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    showMessage && showToast(AuthMessages.login.success);

    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Login error:", error.code);
    if (error.code === "auth/invalid-credential") {
      showToast(AuthMessages.login.invalidAccount);
    } else {
      showToast(AuthMessages.login.error);
    }
    return { success: false, error: error.code };
  }
};

// 로그아웃 함수
export const handleLogout = async (showMessage = true) => {
  const user = getCurrentUserOrRedirect();
  if (!user) return;

  try {
    await signOut(auth);
    showToast(AuthMessages.logout.success);

    router.replace(ROUTES.LOGIN);
  } catch (e) {
    showToast(AuthMessages.logout.success);
  }
};

// 회원탈퇴 함수
export const handleDeleteAccount = async () => {
  const user = getCurrentUserOrRedirect();
  if (!user) return;
  try {
    await deleteUser(user);
    showToast(AuthMessages.deleteAccount.success);
    router.replace(ROUTES.LOGIN);
  } catch (e: any) {
    if (e.code === "auth/requires-recent-login") {
      // 재로그인 필요 시 사용자에게 안내
      showToast(AuthMessages.requiresRecentLogin);
      router.replace(ROUTES.LOGIN);
    } else {
      showToast(AuthMessages.deleteAccount.error);
    }
  }
};

// 회원 삭제 함수
export const attemptDeleteOnly = async (): Promise<boolean> => {
  const user = getCurrentUserOrRedirect();
  if (!user) return false;

  try {
    await deleteUser(user);
    return true;
  } catch (e: any) {
    return false;
  }
};
