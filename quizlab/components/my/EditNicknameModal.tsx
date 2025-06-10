import { View } from "react-native";
import { ModalContainer, CloseModalHeader, ModalTextBox } from "../ui/Modal";

import { MyStrings } from "@/constants/my/strings";

interface EditNicknameModalProps {
  isEditModalVisible: boolean;
  closeEditModal: () => void;
  nickname: string;
  onChangeText: (text: string) => void;
  onPressClear: () => void;
}

export const EditNicknameModal = ({
  isEditModalVisible,
  closeEditModal,
  nickname,
  onChangeText,
  onPressClear,
}: EditNicknameModalProps) => {
  return (
    <ModalContainer visible={isEditModalVisible} onClose={closeEditModal}>
      <View className="w-full gap-6">
        <CloseModalHeader
          label={MyStrings.editLabel}
          onPress={closeEditModal}
        />
        <View>
          <ModalTextBox
            type="default"
            label={MyStrings.editLabel}
            placeholder={MyStrings.editLabel}
            text={nickname}
            onChangeText={onChangeText}
            onPressClear={onPressClear}
          />
        </View>
      </View>
    </ModalContainer>
  );
};
