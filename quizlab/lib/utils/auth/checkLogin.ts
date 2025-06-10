import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

// 로그인 가능 여부 체크 함수
export const checkLogin = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { success: true, user: userCredential.user };
  } catch (error: any) {
    console.error("Login error:", error.code);
    return { success: false, error: error.code || "로그인 실패" };
  }
};
