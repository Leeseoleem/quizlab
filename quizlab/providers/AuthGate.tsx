import { ROUTES } from "@/constants/routes";
import { Redirect, Slot, usePathname } from "expo-router";
import { useAuth } from "./AuthContext";

export default function AuthGate() {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  if (isLoading) return null;

  const isPublicRoute = (path: string) => path.startsWith("/(auth)");

  if (!user && !isPublicRoute(pathname)) {
    return <Redirect href={ROUTES.LOGIN} />;
  }

  if (
    user &&
    pathname.startsWith("/(auth)") &&
    !pathname.includes("onboarding")
  ) {
    return <Redirect href={ROUTES.HOME} />;
  }

  return <Slot />;
}
