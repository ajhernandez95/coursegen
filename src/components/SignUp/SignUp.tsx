import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useStyles from "./hooks/useStyles";

const SignUp = () => {
  const { boxStyles, cardStyles, textStyles, formControlStyles, buttonStyles } =
    useStyles();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <Box {...boxStyles}>
      <Card {...cardStyles}>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Text textAlign="center" {...textStyles}>
              Sign Up
            </Text>
            <FormControl {...formControlStyles}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register("email")} />
              <FormHelperText>We'll never share your email.</FormHelperText>
            </FormControl>
            <FormControl {...formControlStyles}>
              <FormLabel>Password</FormLabel>
              <Input type="password" {...register("password")} />
              <FormHelperText>TODO: Password strength</FormHelperText>
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

export default SignUp;
