import { Button } from "@chakra-ui/button";
import { supabase } from "../../util/supabase";

const SignOutButton = () => {
  const handleSignOut = async () => {
    const { error } = await supabase?.auth.signOut();
    if (error) {
      console.error(error);
      return;
    } else {
      window.location.reload();
    }
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutButton;
