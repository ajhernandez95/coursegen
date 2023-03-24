import { ResponsiveValue } from "@chakra-ui/react";
import type { Property } from "csstype";

const useStyles = () => {
  const boxStyles: {
    display: string;
    margin: string;
    paddingTop: string;
    justifyContent: string;
  } = {
    display: "flex",
    margin: "auto",
    paddingTop: "150px",
    justifyContent: "center",
  };

  const cardStyles: { padding: string } = {
    padding: "10px 30px",
  };

  const textStyles: { fontSize: string } = {
    fontSize: "2xl",
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
    cardStyles,
    textStyles,
    formControlStyles,
    buttonStyles,
  };
};

export default useStyles;
