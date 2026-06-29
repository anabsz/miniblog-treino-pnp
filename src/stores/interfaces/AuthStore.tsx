export interface AuthStore {
	accessToken: string | null;
	refreshToken: string | null;
	login: (access: string, refresh: string) => void;
	logout: () => void;
}
