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
  console.log("정보: ", userInfo?.nickname);
  if (!isOnboarded) return ROUTES.ONBOARDING;
  if (!user) return ROUTES.LOGIN;

  // userInfo가 없거나 nickname이 없으면 → 닉네임 설정
  if (!userInfo || !userInfo.nickname) return ROUTES.NICKNAME;

  // 닉네임은 있지만 is_complete가 false면 → 완료화면
  if (!userInfo.is_complete) return ROUTES.COMPLETE;

  return ROUTES.HOME;
}
