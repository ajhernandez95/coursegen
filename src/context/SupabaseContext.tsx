import { Session, User } from "@supabase/supabase-js";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";
import { supabase } from "../util/supabase";
import { defaultSupabaseContext } from "../constants/supabase";

interface ISupabaseContext {
  isLoading: boolean;
  isLoggedIn: boolean | null;
  user: User | null;
  session: Session | null;
}

export const SupabaseContext = createContext<ISupabaseContext>(
  defaultSupabaseContext
);

export const SupabaseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Handles initial check if user is logged in
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!session) {
        setSession(null);
        setUser(null);
        setIsLoggedIn(false);
      } else {
        setSession(session);
        setUser(session?.user || null);
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    });

    // Subscribes to auth changes to update logged in state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        if (event === "SIGNED_IN" && !isLoggedIn) {
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
    <SupabaseContext.Provider value={{ isLoading, isLoggedIn, user, session }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error("useSupabase must be used within an AuthProvider");
  }
  return context;
};
