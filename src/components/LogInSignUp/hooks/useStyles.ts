import { ResponsiveValue, useColorModeValue } from "@chakra-ui/react";
import type { Property } from "csstype";

const useStyles = () => {
  const boxStyles: {
    display: string;
    justifyContent: string;
    margin?: string;
  } = {
    display: "flex",
    justifyContent: "center",
    margin: "20px",
  };

  const tabStyles: { fontSize: string[] } = {
    fontSize: ["sm", "md", "md"],
  };

  const formControlStyles: {
    mt: string;
    textAlign: ResponsiveValue<Property.TextAlign>;
  } = {
    mt: "15px",
    textAlign: "left",
  };

  const buttonStyles: { mt: string } = {
    mt: "15px",
  };

  return {
    boxStyles,
    tabStyles,
    formControlStyles,
    buttonStyles,
  };
};

export default useStyles;
