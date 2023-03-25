import {
  Box,
  Card,
  CardBody,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import LogIn from "./LogIn";
import useStyles from "./hooks/useStyles";
import SignUp from "./SignUp";
import { useContext } from "react";
import { SupabaseContext } from "../../context/SupabaseContext";
import { defaultSupabaseContext } from "../../constants/supabase";
import { Navigate } from "react-router-dom";

interface LogInSignUpProps {
  startTab?: number;
}

const LogInSignUp = ({ startTab = 0 }: LogInSignUpProps) => {
  const { isLoggedIn } = useContext(SupabaseContext) ?? defaultSupabaseContext;
  const { boxStyles, cardStyles } = useStyles();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Box {...boxStyles}>
      <Card {...cardStyles}>
        <CardBody>
          <Tabs variant="soft-rounded" align="center" defaultIndex={startTab}>
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
