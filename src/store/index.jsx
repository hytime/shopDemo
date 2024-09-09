import { create } from "zustand";
import { login as userLogin } from "@/api/user";
export const useUserState = create((set) => {
  return {
    isLogined: false,
    user: null,
    setUser: (user) => {
      if (user) {
        set(() => ({ user, isLogined: true }));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", user && user.token);
      }
    },
    login: async ({ username, password }) => {
      const result = await userLogin({ username, password });
      const user = await result.json();
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", user && user.token);
      set(() => ({ user, isLogined: true }));
    },
    logout: () => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      set(() => ({ user: {}, isLogined: false }));
    },
  };
});
