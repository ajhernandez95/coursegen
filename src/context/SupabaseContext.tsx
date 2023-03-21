import { SupabaseClient } from "@supabase/supabase-js";
import { createContext, useState, ReactNode } from "react";
import { useSupabaseClient } from "../hooks/useSupabaseClient";

export const SupabaseContext = createContext<SupabaseClient | null>(null);
export const SupabaseContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { supabase }: { supabase: SupabaseClient } = useSupabaseClient();
  const [supabaseClient] = useState<SupabaseClient>(supabase);

  return (
    <SupabaseContext.Provider value={supabaseClient}>
      {children}
    </SupabaseContext.Provider>
  );
};
