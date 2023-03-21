import { createClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
  const supabaseAnonKey = process.env
    .REACT_APP_SUPABASE_TEST_ANON_KEY as string;
  const supabaseApiUrl = process.env.REACT_APP_SUPABASE_TEST_API_URL as string;

  // Create a single supabase client for interacting with your database
  return {
    supabase: createClient(supabaseApiUrl, supabaseAnonKey),
  };
};
