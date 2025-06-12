import { ToastAndroid } from "react-native";

export const showToast = (message: string) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.BOTTOM,
    ToastAndroid.SHORT
  );
};
