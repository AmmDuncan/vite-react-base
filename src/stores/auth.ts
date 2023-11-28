import { StateCreator, create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { User } from '@/types/stores';

type State = {
  token?: string | null;
  user?: User | null;
  isAuthenticated: boolean;
  redirect?: string;
};

type Actions = {
  /** reset auth store to initial state */
  reset: () => void;
  /**
   * authenticate user
   * @param {Object} details - object containing user object and token
   */
  authenticate: (details: { user: User; token: string }) => void;
  setRedirect: (redirect: string) => void;
  getToken: () => State['token'];
  setToken: (newToken: string) => void;
};

const initialState: State = {
  token: null,
  isAuthenticated: false,
};

const authStore: StateCreator<State & Actions> = (set, get) => ({
  ...initialState,
  reset: () => set(initialState),
  authenticate: ({ user, token }: { user: User; token: string }) => {
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },
  setRedirect: (redirect: string) => set({ redirect }),
  getToken: () => get().token,
  setToken: (newToken: string) => set({ token: newToken }),
});

const useAuthStore = create(
  persist(authStore, { name: 'carduvy-web-auth-store' }),
);

export { useAuthStore };
