import { View } from "react-native";
import { MainColors } from "@/constants/Colors";
import { ModalContainer, ModalButtonLayout } from "../ui/Modal";
import { HeadingMd, Caption } from "../ui/Typography";

import { MyStrings } from "@/constants/my/strings";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
  onPressConfirm: () => void;
}

export const DeleteAccountModal = ({
  visible,
  onClose,
  onPressConfirm,
}: DeleteAccountModalProps) => {
  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <View className="justify-center items-center py-6 gap-6">
        <FontAwesome6
          name="circle-exclamation"
          size={80}
          color={MainColors.danger}
        />
        <View className="justify-center items-center gap-4">
          <HeadingMd>{MyStrings.deleteModal.title}</HeadingMd>
          <Caption color="text-gray40 text-center">
            {MyStrings.deleteModal.body}
          </Caption>
        </View>
      </View>
      <ModalButtonLayout
        onPressCancle={onClose}
        onPressConfirm={onPressConfirm}
      />
    </ModalContainer>
  );
};
