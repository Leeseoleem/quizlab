import { ROUTES } from "@/constants/routes";

export function getInitialRedirectRoute({
  isOnboarded,
  user,
  userInfo,
}: {
  isOnboarded: boolean | null;
  user: any;
  userInfo: { nickname?: string; is_complete?: boolean } | null;
}) {
  if (!isOnboarded) return ROUTES.ONBOARDING;
  if (!user) return ROUTES.LOGIN;
  if (!userInfo) return ROUTES.NICKNAME;
  if (userInfo.nickname && userInfo.is_complete === false)
    return ROUTES.COMPLETE;
  return ROUTES.HOME;
}
