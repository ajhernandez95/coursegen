export const defaultSupabaseContext = {
  supabaseClient: {
    auth: {
      signUp: () => undefined,
      signInWithPassword: () => undefined,
      signOut: () => undefined,
    },
    fetch: () => undefined,
  },
  isLoggedIn: false,
};

export const defaultSignOut = {
  error: undefined,
};
