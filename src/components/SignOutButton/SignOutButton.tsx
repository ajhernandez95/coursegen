import { Button } from "@chakra-ui/button";
import { useContext } from "react";
import { SupabaseContext } from "../../context/SupabaseContext";

const SignOutButton = () => {
  const { supabaseClient } = useContext(SupabaseContext);

  const handleSignOut = async () => {
    const { error } = await supabaseClient?.auth.signOut();
    if (error) {
      console.log(error);
      return;
    } else {
      window.location.reload();
    }
  };

  return <Button onClick={handleSignOut}>Sign Out</Button>;
};

export default SignOutButton;
