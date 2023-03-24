import { AuthResponse } from "@supabase/gotrue-js";
import { useContext } from "react";
import { defaultSupabaseContext } from "../../../constants/supabase";
import { SupabaseContext } from "../../../context/SupabaseContext";

interface useSignUpProps {
  email: string;
  password: string;
}

interface useLogInProps {
  email: string;
  password: string;
}

const useLogIn = () => {
  const { supabaseClient } =
    useContext(SupabaseContext) ?? defaultSupabaseContext;

  const handleSignUp = async ({ email, password }: useSignUpProps) => {
    try {
      const res: AuthResponse | undefined = await supabaseClient?.auth.signUp({
        email,
        password,
      });

      if (res?.data) {
        const { user, session } = res.data;
        return { user, session };
      }
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

      if (res?.data) {
        const { user, session } = res.data;
        return { user, session };
      }
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
