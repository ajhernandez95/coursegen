export const defaultSupabaseContext = {
  supabaseClient: {
    auth: {
      signUp: () => undefined,
      signInWithPassword: () => undefined,
      signOut: () => undefined,
    },
  },
  isLoggedIn: false,
};

export const defaultSignOut = {
  error: undefined,
};
