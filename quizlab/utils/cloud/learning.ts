import { db, auth } from "@/lib/firebaseConfig";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  collection,
  query,
  where,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { format } from "date-fns"; // 날짜를 원하는 형태의 문자열로 바꿔주는 함수
import { SolvedMode } from "@/types/solved";
import { checkAuthAndRedirect } from "../firebase/checkUser";
import { getThisWeekDatesWithDay, WeekDateInfo } from "../date/weekList";

/**
 * 📚 Firestore 구조: user_info
 *
 * user_info/               // (컬렉션) 사용자 정보 저장
 *  └── {userId}/            // (문서) 각 유저의 UID를 기준으로 문서 저장
 *       ├── currentStreak: number         // 현재 연속 학습 일수 (ex. 5)
 *       ├── lastLearnedDate: string       // 마지막으로 학습한 날짜 ("yyyy-MM-dd" 형식)
 *       ├── longestStreak: number         // 최대 연속 학습 기록 (선택사항, ex. 7)
 *       └── learning_records/             // (서브컬렉션) 날짜별 학습 기록
 *            ├── {date}/                   // (문서) 학습한 날짜 (ex. "2025-04-27")
 *            │    └── learned: boolean     // 해당 날짜에 학습했는지 여부 (true/false)
 *            └── {date}/
 *                 └── learned: boolean
 */

export const todayDate = () => format(new Date(), "yyyy-MM-dd");

// 회원 가입 시 초기 db 생성
export async function createInitialUserInfo() {
  const user = checkAuthAndRedirect();
  if (!user) return;

  const userId = user.uid;

  try {
    const userRef = doc(db, `user_info/${userId}`);
    await setDoc(userRef, {
      currentStreak: 0, // 처음은 0일 연속
      lastLearnedDate: "", // 아직 학습한 적 없음
      longestStreak: 0, // 최장 기록도 0
    });

    console.log("✅ 유저 정보 초기화 완료");
  } catch (error) {
    console.error("❌ 유저 정보 초기화 실패:", error);
  }
}

export async function saveTodayLearning() {
  const user = checkAuthAndRedirect();
  if (!user) return;

  const userId = user.uid;
  const date = todayDate(); // 현재 날짜

  try {
    // 1. 오늘 학습 기록 저장
    const learningRef = doc(db, `user_info/${userId}/learning_records/${date}`);
    await setDoc(learningRef, { learned: true, timestamp: serverTimestamp() });

    // 2. 유저 연속 기록 업데이트
    const userRef = doc(db, `user_info/${userId}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // 유저 기록 존재 시
      const userData = userSnap.data();
      const lastLearnedDate: string = userData.lastLearnedDate || ""; //  마지막으로 문제를 푼 날짜
      const currentStreak: number = userData.currentStreak || 0; // 현재 연속 일수
      const longestStreak: number = userData.longestStreak || 0; // 최대 연속 일수

      const yesterday = format(
        new Date(Date.now() - 1000 * 60 * 60 * 24),
        "yyyy-MM-dd"
      );

      let newStreak = 1; // 연속 기록

      if (lastLearnedDate === date) {
        console.log("✅ 오늘 이미 학습 기록이 있습니다. streak 업데이트 생략");
        return;
      }

      if (lastLearnedDate === yesterday) {
        // 어제도 풀었으면 streak 연속
        newStreak = currentStreak + 1;
      }
      console.log("🔥 lastLearnedDate:", lastLearnedDate);
      console.log("🔥 yesterday:", yesterday);
      console.log("🔥 newStreak 계산 결과:", newStreak);

      // 기록 업데이트
      await setDoc(
        userRef,
        {
          lastLearnedDate: date,
          currentStreak: newStreak,
          longestStreak: Math.max(longestStreak, newStreak), // 연속 기록이 더 클 경우 갱신
        },
        { merge: true } // 기존 데이터 덮어쓰지 않고 합치기
      );

      console.log(`✅ streak 업데이트 완료: ${newStreak}일`);
    }
  } catch (error) {
    console.error("❌ 학습 기록 저장 실패:", error);
  }
}

// 학습 데이터 가져오기
export type UserLearningInfo = {
  currentStreak: number;
  longestStreak: number;
  lastLearnedDate: string;
};

export async function getUserLearningInfo(): Promise<UserLearningInfo | null> {
  const user = checkAuthAndRedirect();
  if (!user) return null;
  const userId = user.uid;

  try {
    const userRef = doc(db, `user_info/${userId}`);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      console.error("❌ 유저 정보 없음");
      return null;
    }

    const userData = userSnap.data();

    return {
      currentStreak: userData.currentStreak || 0,
      longestStreak: userData.longestStreak || 0,
      lastLearnedDate: userData.lastLearnedDate || "",
    };
  } catch (error) {
    console.error("❌ 유저 학습 정보 불러오기 실패:", error);
    return null;
  }
}

// 요일 타입
export type Weekday = "월" | "화" | "수" | "목" | "금" | "토" | "일";

// 출석 상태
export type AttendanceStatus = "attended" | "absent" | "upcoming";

// 하루 출석 기록
export type RecordType = {
  date: string; // "YYYY-MM-DD"
  day: Weekday; // "월" ~ "일"
  status: AttendanceStatus;
};

// 일주일 출석 기록
export type UserLearningRecord = {
  recordList: RecordType[];
};

export async function getUserLearningRecord(): Promise<UserLearningRecord | null> {
  const user = checkAuthAndRedirect();
  if (!user) return null;
  const userId = user.uid;

  try {
    const todayStr = new Date().toISOString().slice(0, 10);
    const dateList = getThisWeekDatesWithDay(); // 날짜 + 요일 리스트

    const recordList: RecordType[] = [];

    for (const { date, day } of dateList) {
      const ref = doc(db, `user_info/${userId}/learning_records/${date}`);
      const snap = await getDoc(ref);

      let learned = false;
      let timestamp: Date | undefined = undefined;

      if (snap.exists()) {
        const data = snap.data();
        learned = data.learned === true;
        timestamp = data.timestamp?.toDate();
      }

      const status: AttendanceStatus =
        date > todayStr ? "upcoming" : learned ? "attended" : "absent";

      recordList.push({
        date,
        day,
        status,
      });
    }

    return { recordList };
  } catch (error) {
    console.error("❌ 유저 학습 정보 불러오기 실패:", error);
    return null;
  }
}

// 학습 내역(총 시간, 문제 수) 가져오기
export type TotalLearningStats = {
  totalDuration: number; // 총 학습 시간 (초)
  totalSolvedProblems: number; // 총 푼 문제 수
};

// 오늘 내역
export async function getTodayLearningStats(): Promise<TotalLearningStats | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const userId = user.uid;
  const solvedRef = collection(db, `user_info/${userId}/solved_folders`);
  const snapshot = await getDocs(solvedRef);

  const today = format(new Date(), "yyyy-MM-dd");

  let totalDuration = 0;
  let totalSolvedProblems = 0;

  snapshot.forEach((doc) => {
    const data = doc.data();
    const submittedAt = data.submittedAt?.toDate?.();
    const submittedDate = submittedAt ? format(submittedAt, "yyyy-MM-dd") : "";

    if (submittedDate === today) {
      totalDuration += data.duration || 0;
      totalSolvedProblems += data.totalCount || 0;
    }
  });

  return { totalDuration, totalSolvedProblems };
}

// 📊 반환될 전체 통계 타입 정의
export type TotalLearningFullStats = {
  totalDuration: number; // 총 학습 시간 (초)
  totalSolvedProblems: number; // 총 푼 문제 수
  totalCorrect: number; // 맞춘 문제 수
  totalIncorrect: number; // 틀린 문제 수 (계산값)
  averageAccuracy: number; // 정확도 평균 (%)
  modeCount: ModeCount; // 모드별 풀이 수
};

// 🔢 풀이 모드 종류 정의
export type ModeCount = {
  timed: number;
  free: number;
  review: number;
};

// 📌 공통 계산 로직 - QuerySnapshot으로부터 통계 계산
function calculateLearningStatsFromSnapshot(
  snapshot: QuerySnapshot<DocumentData>
): TotalLearningFullStats {
  let totalDuration = 0;
  let totalSolvedProblems = 0;
  let totalCorrect = 0;
  let totalAccuracy = 0;
  let docCount = 0;

  const modeCount: ModeCount = {
    timed: 0,
    free: 0,
    review: 0,
  };

  snapshot.forEach((doc) => {
    const data = doc.data();

    // 누적 값 계산
    totalDuration += data.duration || 0;
    totalSolvedProblems += data.totalCount || 0;
    totalCorrect += data.correctCount || 0;
    totalAccuracy += data.accuracy || 0;
    docCount += 1;

    // 모드별 카운트
    const mode = data.mode as keyof ModeCount;
    if (mode in modeCount) {
      modeCount[mode]++;
    }
  });

  // 평균 및 파생 통계 계산
  const totalIncorrect = totalSolvedProblems - totalCorrect;
  const averageAccuracy = docCount > 0 ? totalAccuracy / docCount : 0;

  return {
    totalDuration,
    totalSolvedProblems,
    totalCorrect,
    totalIncorrect,
    averageAccuracy,
    modeCount,
  };
}

// 🧠 전체 풀이 통계 조회
export async function getTotalLearningStats(): Promise<TotalLearningFullStats | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const userId = user.uid;
  const solvedRef = collection(db, `user_info/${userId}/solved_folders`);
  const snapshot = await getDocs(solvedRef);

  return calculateLearningStatsFromSnapshot(snapshot);
}

// 📁 특정 폴더에 대한 통계 조회
export async function getFolderLearningStats(
  folderId: string
): Promise<TotalLearningFullStats | null> {
  const user = auth.currentUser;
  if (!user) return null;

  const userId = user.uid;
  const baseRef = collection(db, `user_info/${userId}/solved_folders`);
  const q = query(baseRef, where("folderId", "==", folderId));
  const snapshot = await getDocs(q);

  return calculateLearningStatsFromSnapshot(snapshot);
}
