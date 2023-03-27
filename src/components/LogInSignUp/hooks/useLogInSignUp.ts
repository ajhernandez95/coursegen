import { AuthResponse } from "@supabase/gotrue-js";
import { SupabaseClient } from "@supabase/supabase-js";
import { useContext } from "react";
import { SupabaseContext } from "../../../context/SupabaseContext";
import handleSupabaseResponse from "../../../util/handleSupabaseResponse";

interface useSignUpProps {
  email: string;
  password: string;
}

interface useLogInProps {
  email: string;
  password: string;
}

const useLogIn = () => {
  const { supabaseClient } = useContext(SupabaseContext);

  const handleSignUp = async ({ email, password }: useSignUpProps) => {
    try {
      const res: AuthResponse | undefined = await supabaseClient?.auth.signUp({
        email,
        password,
      });
      return handleSupabaseResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogIn = async ({ email, password }: useLogInProps) => {
    try {
      const res: AuthResponse | undefined =
        await supabaseClient?.auth.signInWithPassword({
          email,
          password,
        });

      return handleSupabaseResponse(res);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSignUp,
    handleLogIn,
  };
};

export default useLogIn;
