import AsyncStorage from "@react-native-async-storage/async-storage";

// 온보딩 상수 정의
const ONBOARDING_KEY = "hasOnboarded";

/**
 * 온보딩 완료 상태 저장
 * @param completed - 온보딩 완료 여부 (기본값: true)
 */
export const setOnboardingCompleted = async (
  completed: boolean = true
): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, completed.toString());
    console.log(`온보딩 상태 저장: ${completed}`);
  } catch (error) {
    console.error("온보딩 상태 저장 실패:", error);
    throw error;
  }
};

/**
 * 온보딩 상태 확인 함수
 * @returns Promise<boolean> - 온보딩 완료 여부
 */
export const getOnboardingStatus = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    const hasOnboarded = value === "true";
    console.log(`온보딩 상태 확인: ${hasOnboarded}`);
    return hasOnboarded;
  } catch (error) {
    console.error("온보딩 상태 확인 실패:", error);
    return false; // 오류 시 기본값으로 false 반환
  }
};

/**
 * 온보딩 상태 초기화 (개발/테스트 용도)
 */
export const clearOnboardingStatus = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_KEY);
    console.log("온보딩 상태 초기화 완료");
  } catch (error) {
    console.error("온보딩 상태 초기화 실패:", error);
    throw error;
  }
};
