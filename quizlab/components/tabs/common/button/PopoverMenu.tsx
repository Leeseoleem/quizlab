import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, View, Pressable, StyleSheet, Dimensions } from "react-native";
import MenuListItem from "../label/MenuListItem";
import type { MenuListItemProps } from "../label/MenuListItem";

interface PopoverMenuProps {
  visible: boolean;
  onClose: () => void; // 팝오버 닫기 핸들러
  popoverRef: React.RefObject<View | null> | undefined; // 팝오버 위치 참조
  items: MenuListItemProps[];
}

const EDGE_GAP = 8; // 화면 가장자리로부터의 최소 간격

const PopoverMenu = ({
  visible,
  onClose,
  popoverRef,
  items,
}: PopoverMenuProps) => {
  // 화면 크기 (초기 렌더 기준으로 한 번만 계산)
  const screenSize = useMemo(() => Dimensions.get("window"), []);

  // 메뉴 실제 렌더 크기
  const [menuWidth, setMenuWidth] = useState(0);
  const [menuHeight, setMenuHeight] = useState(0);

  // 팝오버 좌표 상태
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  // 위치 계산 함수
  const measurePosition = useCallback(() => {
    // 앵커(ref)나 메뉴 크기가 준비되지 않으면 패스
    if (!popoverRef?.current) return;
    if (!menuWidth || !menuHeight) return;

    // 기준(anchor) 좌표 측정
    popoverRef.current.measureInWindow((x, y, aw, ah) => {
      // 오른쪽 정렬: 메뉴의 오른쪽을 버튼 오른쪽에 맞춤
      let left = x + aw - menuWidth;
      let top = y + ah + EDGE_GAP;

      // 가로 방향 넘침 보정
      if (left + menuWidth + EDGE_GAP > screenSize.width) {
        left = screenSize.width - menuWidth - EDGE_GAP;
      }
      if (left < EDGE_GAP) left = EDGE_GAP;

      // 세로 방향 넘침 보정
      if (top + menuHeight + EDGE_GAP > screenSize.height) {
        top = y - menuHeight - EDGE_GAP;
      }
      if (top < EDGE_GAP) top = EDGE_GAP;

      // 최종 좌표 저장
      setPos({ left, top });
    });
  }, [popoverRef, menuWidth, menuHeight, screenSize]);

  // visible / 메뉴 크기 변경에 따라 위치 재계산 및 정리
  useEffect(() => {
    // 모달이 닫히면 상태 초기화
    if (!visible) {
      setPos(null);
      setMenuWidth(0);
      setMenuHeight(0);
      return;
    }

    // 메뉴 크기를 아직 모르면 계산하지 않음
    if (!menuWidth || !menuHeight) return;

    // 레이아웃이 안정된 다음 프레임에 위치 계산
    const id = setTimeout(measurePosition, 0);

    // cleanup: 다음 렌더 전에 이전 타이머 제거
    return () => clearTimeout(id);
  }, [visible, menuWidth, menuHeight, measurePosition]);

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="fade"
    >
      {/* 바깥 영역 누르면 닫기 */}
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <View
        className="absolute bg-gray-5 border border-gray-10 shadow-md rounded-xl p-2 overflow-hidden"
        style={
          pos ? { left: pos.left, top: pos.top, opacity: 1 } : { opacity: 0 }
        }
        // 좌표 확정 전에는 터치 방지
        pointerEvents={pos ? "auto" : "none"}
        onLayout={(e) => {
          const { width, height } = e.nativeEvent.layout;

          // 0인 값은 의미 없으니 무시
          if (width <= 0 || height <= 0) return;

          // 이전 값과 완전히 같으면 state 업데이트하지 않음
          if (width === menuWidth && height === menuHeight) return;

          // 실제로 크기가 바뀐 경우에만 setState
          setMenuWidth(width);
          setMenuHeight(height);
        }}
      >
        {items.map((item, index) => (
          <MenuListItem key={index} {...item} />
        ))}
      </View>
    </Modal>
  );
};

export default PopoverMenu;
