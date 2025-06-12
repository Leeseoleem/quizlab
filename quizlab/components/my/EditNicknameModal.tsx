import { View } from "react-native";
import {
  ModalContainer,
  CloseModalHeader,
  ModalTextBox,
  ModalButtonLayout,
} from "../ui/Modal";

import { MyStrings } from "@/constants/my/strings";
import { NICKNAME_VALIDATION } from "@/constants/auth/validationStrings";

interface EditNicknameModalProps {
  isEditModalVisible: boolean;
  nickname: string;
  onChangeText: (text: string) => void;
  onPressClear: () => void;
  disable: boolean;
  closeEditModal: () => void;
  handleUpdateNickname: () => void;
}

export const EditNicknameModal = ({
  isEditModalVisible,
  nickname,
  onChangeText,
  onPressClear,
  disable,
  closeEditModal,
  handleUpdateNickname,
}: EditNicknameModalProps) => {
  return (
    <ModalContainer visible={isEditModalVisible} onClose={closeEditModal}>
      <View className="w-full gap-8">
        <CloseModalHeader
          label={MyStrings.editModal.label}
          onPress={closeEditModal}
        />
        <View className="w-full px-6">
          <ModalTextBox
            type="default"
            label={MyStrings.editModal.label}
            placeholder={MyStrings.editModal.placeholder}
            text={nickname}
            onChangeText={onChangeText}
            onPressClear={onPressClear}
            maxLength={NICKNAME_VALIDATION.MAX_LENGTH}
          />
        </View>
        <ModalButtonLayout
          disable={disable}
          onPressCancle={closeEditModal}
          onPressConfirm={handleUpdateNickname}
        />
      </View>
    </ModalContainer>
  );
};
