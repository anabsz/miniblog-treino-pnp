import { create } from "zustand";
import { persist } from "zustand/middleware";
import type iAuthState from "../interfaces/iAuthState";

export const useAuthState = create<iAuthState>()(
	persist(
		(set) => ({
			accessToken: null,
			refreshToken: null,

			login: (access: string, refresh: string) =>
				set({ accessToken: access, refreshToken: refresh }),
			logout: () => set({ accessToken: null, refreshToken: null }),
		}),
		{
			name: "auth-storage",
		}
	)
);
