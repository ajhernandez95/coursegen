import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const customTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props: any) => ({
      body: {
        color: mode("gray.800", "whiteAlpha.900")(props),
        bg: mode("white", "#1A1C1E")(props),
      },
    }),
  },
});

export default customTheme;
