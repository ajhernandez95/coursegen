import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useState, ReactNode, useEffect } from "react";
import { getSupabaseClient } from "../util/getSupabaseClient";
import { defaultSupabaseContext } from "../constants/supabase";

interface ISupabaseContext {
  supabaseClient: SupabaseClient;
  isLoggedIn: boolean;
}

export const SupabaseContext = createContext<ISupabaseContext>(
  defaultSupabaseContext
);

export const SupabaseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [supabaseClient] = useState<SupabaseClient>(
    getSupabaseClient().supabase
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setIsLoggedIn(true);
        } else if (event === "SIGNED_OUT") {
          setIsLoggedIn(false);
        }
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <SupabaseContext.Provider value={{ supabaseClient, isLoggedIn }}>
      {children}
    </SupabaseContext.Provider>
  );
};
