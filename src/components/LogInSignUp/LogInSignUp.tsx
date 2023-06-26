import { Box, Card, CardBody, useColorModeValue } from "@chakra-ui/react";
import useStyles from "./hooks/useStyles";
import { FC } from "react";
import { useSupabase } from "../../context/SupabaseContext";
import { Navigate, useLocation } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

interface LogInSignUpProps {}

const LogInSignUp: FC<LogInSignUpProps> = () => {
  const { isLoggedIn, supabase } = useSupabase();
  const { boxStyles, cardStyles } = useStyles();
  const bg = useColorModeValue("#EDF2F7", "#1A1C1E");
  const color = useColorModeValue("#1A1C1E", "white");
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
    <Box minH="90vh" display="flex" justifyContent="center" alignItems="center">
      <Box {...boxStyles}>
        <Card {...cardStyles}>
          <CardBody>
            <Auth
              supabaseClient={supabase}
              providers={["google"]}
              appearance={{
                theme: ThemeSupa,
                style: {
                  container: {
                    width: "100%",
                  },
                  button: {
                    border: "none",
                    backgroundColor: bg,
                    color: color,
                  },
                  input: {
                    backgroundColor: bg,
                    color: color,
                  },
                },
              }}
              theme="dark"
              socialLayout="horizontal"
            />
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
};

export default LogInSignUp;
