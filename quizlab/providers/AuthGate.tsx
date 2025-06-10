import { Slot, Redirect, usePathname } from "expo-router";
import { useAuth } from "./AuthContext";
import { ROUTES } from "@/constants/routes";

export default function AuthGate() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return null;

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
