import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useLogIn from "./hooks/useLogIn";
import useStyles from "./hooks/useStyles";

const LogIn = () => {
  const { boxStyles, cardStyles, textStyles, formControlStyles, buttonStyles } =
    useStyles();
  const { handleLogIn } = useLogIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => handleLogIn({ ...data });

  return (
    <Box {...boxStyles}>
      <Card {...cardStyles}>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text textAlign="center" {...textStyles}>
              Log In
            </Text>
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
        </CardBody>
      </Card>
    </Box>
  );
};

export default LogIn;
