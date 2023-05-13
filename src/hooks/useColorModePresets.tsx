import { useColorModeValue } from "@chakra-ui/react";

const useColorModePresets = () => {
  const primaryBgColor = useColorModeValue("white", "#1A1C1E");
  const secondaryBgColor = useColorModeValue("#EDF2F7", "#2C2D2E");
  const altBtnColor = useColorModeValue("#EDF2F7", "#2C2D2E");
  const altBtnBg = useColorModeValue("#2C2D2E", "#EDF2F7");
  const activeBg = useColorModeValue("#EDF2F7", "#2C2D2E");
  return {
    primaryBgColor,
    secondaryBgColor,
    altBtnColor,
    altBtnBg,
    activeBg,
  };
};

export default useColorModePresets;
