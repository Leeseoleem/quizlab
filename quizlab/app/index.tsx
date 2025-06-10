import { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { getOnboardingStatus } from "../constants/onboarding/useOnboarding";

import { ROUTES } from "@/constants/routes";
import { useAuth } from "@/providers/AuthContext";

export default function Index() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);
  const { user, loading } = useAuth();

  // 온보딩 여부 체크
  useEffect(() => {
    const loadStatus = async () => {
      const status = await getOnboardingStatus();
      setHasOnboarded(status);
    };
    loadStatus();
  }, []);

  // 로딩 중이면 대기
  if (hasOnboarded === null || loading) return null;

  // 온보딩 안 했으면 온보딩으로
  if (!hasOnboarded) {
    return <Redirect href={ROUTES.ONBOARDING} />;
  }

  // 온보딩 했는데 로그인 안 했으면 로그인으로
  if (!user) {
    return <Redirect href={ROUTES.LOGIN} />;
  }

  // 로그인 했으면 홈으로
  return <Redirect href={ROUTES.HOME} />;
}
