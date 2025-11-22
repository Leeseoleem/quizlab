import { ToastAndroid } from "react-native";

/**
 * 토스트 메세지 출력
 */
export const showToast = (message: string) => {
  ToastAndroid.showWithGravity(
    message,
    ToastAndroid.BOTTOM,
    ToastAndroid.CENTER
  );
};
