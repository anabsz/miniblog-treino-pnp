import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthStore } from "./interfaces/AuthStore";

export const useAuthStore = create<AuthStore>()(
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
