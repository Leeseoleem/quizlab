import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { router } from "expo-router";

import { ROUTES } from "@/constants/routes";
import { MyStrings } from "@/constants/my/strings";
import { showToast } from "../toastMessage";

export const handleLogout = async () => {
  try {
    await signOut(auth);
    showToast(MyStrings.section.toast.logout);

    router.replace(ROUTES.LOGIN);
  } catch (e) {
    showToast(MyStrings.section.toast.error);
  }
};
