import { View } from "react-native";
import {
  ModalContainer,
  CloseModalHeader,
  ModalTextBox,
  ModalButtonLayout,
} from "../ui/Modal";

import { MyStrings } from "@/constants/my/strings";

interface EditNicknameModalProps {
  isEditModalVisible: boolean;
  closeEditModal: () => void;
  nickname: string;
  onChangeText: (text: string) => void;
  onPressClear: () => void;
  handleUpdateNickname: () => void;
}

export const EditNicknameModal = ({
  isEditModalVisible,
  closeEditModal,
  nickname,
  onChangeText,
  onPressClear,
  handleUpdateNickname,
}: EditNicknameModalProps) => {
  return (
    <ModalContainer visible={isEditModalVisible} onClose={closeEditModal}>
      <View className="w-full gap-8">
        <CloseModalHeader
          label={MyStrings.editLabel}
          onPress={closeEditModal}
        />
        <View className="w-full px-6">
          <ModalTextBox
            type="default"
            label={MyStrings.editLabel}
            placeholder={MyStrings.editLabel}
            text={nickname}
            onChangeText={onChangeText}
            onPressClear={onPressClear}
          />
        </View>
        <ModalButtonLayout
          onPressCancle={closeEditModal}
          onPressConfirm={handleUpdateNickname}
        />
      </View>
    </ModalContainer>
  );
};
