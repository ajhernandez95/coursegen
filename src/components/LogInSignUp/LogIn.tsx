import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useLogIn from "./hooks/useLogInSignUp";
import useStyles from "./hooks/useStyles";

const LogIn = () => {
  const { formControlStyles, buttonStyles } = useStyles();
  const { handleLogIn } = useLogIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => handleLogIn({ ...data });

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