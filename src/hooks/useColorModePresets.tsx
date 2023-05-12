import { useColorModeValue } from "@chakra-ui/react";

const useColorModePresets = () => {
  const drawerBg = useColorModeValue("white", "#1A1C1E");
  const floatingBtnBg = useColorModeValue("#EDF2F7", "#2C2D2E");
  const activeBg = useColorModeValue("#EDF2F7", "#2C2D2E");
  const tertiary = useColorModeValue("#EDF2F7", "#F5EFED");
  return {
    drawerBg,
    floatingBtnBg,
    activeBg,
    tertiary,
  };
};

export default useColorModePresets;
