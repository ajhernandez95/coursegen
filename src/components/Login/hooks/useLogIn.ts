import { AuthResponse } from "@supabase/gotrue-js";
import { useContext } from "react";
import { defaultSupabaseContext } from "../../../constants/supabase";
import { SupabaseContext } from "../../../context/SupabaseContext";

interface useLogInProps {
  email: string;
  password: string;
}

const useLogIn = () => {
  const { supabaseClient } =
    useContext(SupabaseContext) ?? defaultSupabaseContext;

  const handleLogIn = async ({ email, password }: useLogInProps) => {
    try {
      const res: AuthResponse | undefined =
        await supabaseClient?.auth.signInWithPassword({
          email,
          password,
        });

      if (res?.data) {
        const { user, session } = res.data;

        console.log("SUCCESS", user, session);
        return { user, session };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleLogIn,
  };
};

export default useLogIn;
