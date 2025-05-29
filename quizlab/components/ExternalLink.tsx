/**
 * 📎 ExternalLink 컴포넌트
 *
 * ✅ 용도:
 * 플랫폼(iOS, Android, Web)에 따라 외부 URL을 적절하게 여는 링크 컴포넌트입니다.
 * - 웹에서는 `target="_blank"`로 새 탭에서 열리고
 * - 앱에서는 기본 브라우저가 아닌 인앱 브라우저를 통해 링크가 열립니다.
 *
 * ✅ 사용 예시:
 * - 개인정보처리방침, 이용약관 등 외부 문서 연결
 * - 오픈소스 라이선스나 공식 웹사이트 링크
 * - 외부 서비스 연동용 링크 (예: GitHub, Spotify 등)
 */

import { Href, Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { Platform } from "react-native";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: Href & string;
};

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (Platform.OS !== "web") {
          // 네이티브 환경(iOS, Android)에서는 기본 브라우저로 이동하지 않도록 기본 동작을 막습니다.
          event.preventDefault();
          // 네이티브 앱에서는 외부 링크를 인앱 브라우저로 엽니다.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
