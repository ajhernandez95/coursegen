import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface IGetSupabaseClient {
  supabase: SupabaseClient;
}

export const getSupabaseClient = (): IGetSupabaseClient => {
  const supabaseAnonKey = process.env
    .REACT_APP_SUPABASE_TEST_ANON_KEY as string;
  const supabaseApiUrl = process.env.REACT_APP_SUPABASE_TEST_API_URL as string;

  return {
    supabase: createClient(supabaseApiUrl, supabaseAnonKey),
  };
};
