import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useLogInSignUp from "./hooks/useLogInSignUp";
import useStyles from "./hooks/useStyles";
import usePasswordStrength from "./hooks/usePasswordStrength";

const SignUp = () => {
  const { formControlStyles, buttonStyles } = useStyles();
  const { handleSignUp } = useLogInSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const strength = usePasswordStrength(watch("password"));
  const onSubmit = (data: any) => handleSignUp({ ...data });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl {...formControlStyles}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" {...register("email")} />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
      <FormControl {...formControlStyles}>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password")} />
        <FormHelperText>Strength: {strength.label}</FormHelperText>
      </FormControl>
      <Box {...buttonStyles} display="flex" justifyContent="center">
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export default SignUp;
