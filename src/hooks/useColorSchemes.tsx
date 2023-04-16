import { extendTheme, useColorMode } from "@chakra-ui/react";
import { useMemo } from "react";

const theme = extendTheme();
const useColorSchemes = (list: any[]) => {
  const { colorMode } = useColorMode();
  const isLightMode = colorMode === "light";

  // Function to get the color schemes list
  const getColorSchemes = (mode: string) => {
    const colorKeys = Object.keys(theme.colors);

    return colorKeys
      .filter(
        (colorKey) =>
          ![
            "transparent",
            "current",
            "blackAlpha",
            "whiteAlpha",
            "black",
            "white",
            "gray",
          ].includes(colorKey)
      )
      .map((colorKey) => {
        const colorObject = theme.colors[colorKey];
        return {
          colorScheme: colorKey,
          bgColor: colorObject[mode === "light" ? 300 : 500],
        };
      });
  };

  // Get the color schemes for both light and dark mode
  const colorSchemes = [
    getColorSchemes("light").filter(
      (scheme) =>
        scheme.colorScheme !== "current" &&
        scheme.colorScheme !== "whiteAlpha" &&
        scheme.colorScheme !== "blackAlpha"
    ),
    getColorSchemes("dark").filter(
      (scheme) => scheme.colorScheme !== "current"
    ),
  ];

  const colors = useMemo(() => {
    const modeIndex = isLightMode ? 0 : 1;
    return list?.map(
      (_: any, index: number) =>
        colorSchemes[modeIndex][index % colorSchemes[modeIndex].length]
    );
  }, [isLightMode, list]);

  return {
    colorSchemes,
    colors,
  };
};

export default useColorSchemes;
