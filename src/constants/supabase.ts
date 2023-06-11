import { supabase } from "../util/supabase";

export const defaultSupabaseContext = {
  isLoading: true,
  isLoggedIn: null,
  user: null,
  session: null,
  supabase,
};
