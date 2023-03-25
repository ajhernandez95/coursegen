import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useLogInSignUp from "./hooks/useLogInSignUp";
import useStyles from "./hooks/useStyles";
import usePasswordStrength from "./hooks/usePasswordStrength";
import en from "./locale/en_US.json";

const SignUp = () => {
  const { formControlStyles, buttonStyles } = useStyles();
  const { handleSignUp } = useLogInSignUp();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  const strength = usePasswordStrength(watch("password"));
  const onSubmit = async (data: any) => {
    const { isSuccess } = await handleSignUp({ ...data });

    if (isSuccess) {
      toast({
        title: en.signUp.accountCreated,
        description: en.signUp.emailVerificationSent,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        description: en.signUp.signUpError,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    reset();
  };

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
