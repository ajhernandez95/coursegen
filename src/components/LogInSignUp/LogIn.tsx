import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useLogIn from "./hooks/useLogInSignUp";
import useStyles from "./hooks/useStyles";
import en from "./locale/en_US.json";

const LogIn = () => {
  const { formControlStyles, buttonStyles } = useStyles();
  const { handleLogIn } = useLogIn();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const { isSuccess } = await handleLogIn({ ...data });

    if (!isSuccess) {
      toast({
        description: en.logIn.invalidCredentials,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl {...formControlStyles}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" {...register("email")} />
      </FormControl>
      <FormControl {...formControlStyles}>
        <FormLabel>Password</FormLabel>
        <Input type="password" {...register("password")} />
      </FormControl>
      <Box {...buttonStyles} display="flex" justifyContent="center">
        <Button type="submit">Submit</Button>
      </Box>
    </form>
  );
};

export default LogIn;
