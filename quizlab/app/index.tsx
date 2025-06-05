import { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ROUTES } from "@/constants/routes";

export default function Index() {
  const [hasOnboarded, setHasOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem("hasOnboarded");
      setHasOnboarded(value === "true");
    })();
  }, []);

  if (hasOnboarded === null) return null;

  return <Redirect href={hasOnboarded ? ROUTES.LOGIN : ROUTES.ONBOARDING} />;
}
