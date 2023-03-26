import React from "react";
import { Input as ChakraInput } from "@chakra-ui/react";
import { InputProps as ChakraInputProps } from "@chakra-ui/react";
import {
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

interface InputProps extends ChakraInputProps {
  additionalProps?: any;
}

const Input = ({ type = "text", additionalProps }: InputProps) => {
  return <ChakraInput type={type} {...additionalProps}></ChakraInput>;
};

export default Input;
