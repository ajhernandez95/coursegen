import {
  Box,
  BoxProps,
  Card,
  CardBody,
  CardProps,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import LogIn from "./LogIn";
import useStyles from "./hooks/useStyles";
import SignUp from "./SignUp";
import { FC } from "react";
import { useSupabase } from "../../context/SupabaseContext";
import { Navigate } from "react-router-dom";

interface LogInSignUpProps {
  startTab?: number;
}

const LogInSignUp: FC<LogInSignUpProps> = ({ startTab = 0 }) => {
  const { isLoggedIn } = useSupabase();
  const { boxStyles, cardStyles } = useStyles();
  const tabColorScheme = useColorModeValue("gray", "gray");

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Box {...(boxStyles as BoxProps)}>
      {/** @ts-ignore */}
      <Card {...(cardStyles as CardProps)}>
        <CardBody>
          <Tabs
            colorScheme={tabColorScheme}
            variant="solid-rounded"
            align="center"
            defaultIndex={startTab}
          >
            <TabList>
              <Tab>Log In</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <LogIn />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
    </Box>
  );
};

export default LogInSignUp;
