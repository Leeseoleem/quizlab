import { signOut, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { router } from "expo-router";

import { ROUTES } from "@/constants/routes";
import { showToast } from "../toastMessage";
import { AuthMessages } from "@/constants/auth/authMessages";
import { getCurrentUserOrRedirect } from "../fetchCurrentUserInfo";

export const handleLogout = async () => {
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
