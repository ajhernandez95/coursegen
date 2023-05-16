import {
  Box,
  BoxProps,
  Card,
  CardBody,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  TabProps,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import LogIn from "./LogIn";
import useStyles from "./hooks/useStyles";
import SignUp from "./SignUp";
import { FC } from "react";
import { useSupabase } from "../../context/SupabaseContext";
import { Navigate, useLocation } from "react-router-dom";

interface LogInSignUpProps {
  startTab?: number;
}

const LogInSignUp: FC<LogInSignUpProps> = ({ startTab = 0 }) => {
  const { isLoggedIn } = useSupabase();
  const { boxStyles, tabStyles } = useStyles();
  const tabColorScheme = useColorModeValue("gray", "gray");
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const pathRedirect = query.get("pathRedirect");
  const path = pathRedirect ? pathRedirect : "/";

  if (isLoggedIn) {
    return <Navigate to={path} />;
  }

  return (
    <Box {...(boxStyles as BoxProps)}>
      <Card>
        <CardBody>
          <Tabs
            colorScheme={tabColorScheme}
            variant="solid-rounded"
            align="center"
            defaultIndex={startTab}
          >
            <TabList>
              <Tab {...(tabStyles as TabProps)}>Log In</Tab>
              <Tab {...(tabStyles as TabProps)}>Sign Up</Tab>
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
