import { cookieStorage } from "@/cookies/cookie-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ErrorObject {
  error: string;
}

export interface UserState {
  name: string;
  id: string;
  email: string;
  accessToken: string | undefined | null;
}

export interface UserStore {
  user: UserState | null;
  updateUser: (user: UserState) => void;
  removeUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      updateUser: (user) => set(() => ({ user })),
      removeUser: () => set(() => ({ user: null })),
    }),
    {
      name: "user-store",
      storage: {
        getItem: (name) => {
          const cookie = cookieStorage.getItem(name);
          return cookie ? JSON.parse(cookie) : null;
        },
        setItem: (name, value) => {
          cookieStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          cookieStorage.removeItem(name);
        },
      },
    }
  )
);
