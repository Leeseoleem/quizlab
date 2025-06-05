import { Slot, Redirect, usePathname } from "expo-router";
import { useAuth } from "./AuthContext";

export default function AuthGate() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) return null;

  const isPublicRoute = (path: string) => path.startsWith("/(auth)");

  if (!user && !isPublicRoute(pathname)) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  if (user && pathname.startsWith("/(auth)")) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Slot />;
}
