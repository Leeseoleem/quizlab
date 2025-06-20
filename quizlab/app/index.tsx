import { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { getOnboardingStatus } from "../constants/onboarding/useOnboarding";

import { getInitialRedirectRoute } from "@/lib/getInitialRedirectRoute";
import { useAuth } from "@/providers/AuthContext";

export default function Index() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const { user, isLoading, userInfo } = useAuth();

  // 온보딩 상태 불러오기 (AsyncStorage 등에서 관리)
  useEffect(() => {
    getOnboardingStatus().then(setHasOnboarded);
  }, []);

  const isAppLoading = hasOnboarded === null || isLoading;

  if (isAppLoading) return null;

  // 모든 상태가 준비된 후 리다이렉트 경로 결정
  const redirectRoute = getInitialRedirectRoute({
    isOnboarded: hasOnboarded,
    user,
    userInfo,
  });

  // 리다이렉트 경로로 이동
  return <Redirect href={redirectRoute} />;
}
