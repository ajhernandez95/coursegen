import { createClient } from "@supabase/supabase-js";

export const useSupabaseClient = () => {
  console.log(process.env);
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_TEST_ANON_KEY;
  const supabaseApiUrl = process.env.REACT_APP_SUPABASE_TEST_API_URL;

  // Create a single supabase client for interacting with your database
  return {
    // supabase: createClient(supabaseAnonKey, supabaseApiUrl),
    supabase: () => console.log("Supabase should work :o"),
  };
};
