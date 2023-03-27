import { getSupabaseClient } from "../util/getSupabaseClient";

export const defaultSupabaseContext = {
  supabaseClient: getSupabaseClient().supabase,
  isLoggedIn: false,
};
