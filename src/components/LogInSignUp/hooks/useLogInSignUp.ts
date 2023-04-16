import { AuthResponse } from "@supabase/gotrue-js";
import { supabase } from "../../../util/supabase";
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
  const handleSignUp = async ({ email, password }: useSignUpProps) => {
    try {
      const res: AuthResponse | undefined = await supabase?.auth.signUp({
        email,
        password,
      });
      return handleSupabaseResponse(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogIn = async ({ email, password }: useLogInProps) => {
    try {
      const res: AuthResponse | undefined =
        await supabase?.auth.signInWithPassword({
          email,
          password,
        });

      return handleSupabaseResponse(res);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleSignUp,
    handleLogIn,
  };
};

export default useLogIn;
