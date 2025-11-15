import { initializeApp } from "firebase/app";

// 1. Firebase에 반드시 필요한 환경 변수 목록 정의
const requiredEnvVars = [
  "EXPO_PUBLIC_FIREBASE_API_KEY",
  "EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "EXPO_PUBLIC_FIREBASE_PROJECT_ID",
  "EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "EXPO_PUBLIC_FIREBASE_APP_ID",
];

// 2. 현재 process.env에서 값이 비어 있는 변수만 필터링
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

// 3. 필요한 환경 변수가 하나라도 없으면 Firebase 초기화 중단
if (missingVars.length > 0) {
  throw new Error(
    `Firebase 설정 오류: 다음 환경 변수가 필요합니다: ${missingVars.join(
      ", "
    )}\n.env 파일을 확인하세요.`
  );
}

// 4. env들이 모두 존재한다면 firebaseConfig 생성
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// 5. Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

export default app;
