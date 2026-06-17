export default interface iAuthState {
	accessToken: string | null;
	refreshToken: string | null;
	login: (access: string, refresh: string) => void;
	logout: () => void;
}
