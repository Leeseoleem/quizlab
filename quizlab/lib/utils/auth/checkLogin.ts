import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

import { showToast } from "../toastMessage";
import { AuthMessages } from "@/constants/auth/authMessages";

// 로그인 가능 여부 체크 함수
export const checkLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    showToast(AuthMessages.login.success);

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
