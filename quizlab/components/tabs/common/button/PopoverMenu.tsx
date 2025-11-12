import React, { useState, useEffect, useMemo, useRef } from "react";
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
  // 화면 크기 메모이제이션
  const screenSize = useMemo(() => Dimensions.get("window"), []);
  const [menuSize, setMenuSize] = useState({ w: 0, h: 0 });
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  const timeoutRef = useRef<number | null>(null);

  // 위치 계산 함수
  const measurePosition = () => {
    if (!popoverRef?.current) return;
    if (menuSize.w === 0 && menuSize.h === 0) return; // 메뉴 크기 없으면 패스

    // 기준(anchor) 좌표 측정
    popoverRef.current.measureInWindow((x, y, aw, ah) => {
      // 오른쪽 정렬 예시: 메뉴의 오른쪽을 버튼 오른쪽에 맞춤
      let left = x + aw - menuSize.w;
      let top = y + ah + EDGE_GAP;

      // 넘침 보정
      if (left + menuSize.w + EDGE_GAP > screenSize.width) {
        left = screenSize.width - menuSize.w - EDGE_GAP;
      }
      if (left < EDGE_GAP) left = EDGE_GAP;
      if (top + menuSize.h + EDGE_GAP > screenSize.height) {
        top = y - menuSize.h - EDGE_GAP;
      }
      if (top < EDGE_GAP) top = EDGE_GAP;

      setPos({ left, top });
    });
  };

  // 모달이 뜨면 한 틱 미룬 뒤 측정 시도
  const handleShow = () => {
    // setTimeout으로 렌더/애니메이션 한 사이클 뒤로 미루기
    timeoutRef.current = setTimeout(() => {
      // menuSize가 아직 0이면 onLayout 이후에 measurePosition이 또 불릴 것
      measurePosition();
    }, 0); // 0~16 사이(한 프레임)면 충분
  };

  // visible 해제 시 정리
  useEffect(() => {
    if (!visible) {
      setPos(null);
      setMenuSize({ w: 0, h: 0 });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="fade"
      onShow={handleShow} // ← 모달 표시 후 setTimeout으로 지연 측정
    >
      <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

      <View
        className="absolute bg-gray-5 border border-gray-10 shadow-md rounded-xl p-2 overflow-hidden"
        style={
          pos ? { left: pos.left, top: pos.top, opacity: 1 } : { opacity: 0 }
        }
        pointerEvents={pos ? "auto" : "none"} // 좌표 확정 전 터치 방지
        onLayout={(e) => {
          // 메뉴 실제 렌더 크기 확보
          const { width, height } = e.nativeEvent.layout;
          const changed = menuSize.w !== width || menuSize.h !== height;
          if (changed) setMenuSize({ w: width, h: height });

          // 크기를 처음 얻은 순간 다시 한 번 측정
          if ((width > 0 || height > 0) && (!pos || changed)) {
            // setTimeout으로 한 틱 미루고 측정 → 레이아웃 확정 보장
            setTimeout(measurePosition, 0);
          }
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
