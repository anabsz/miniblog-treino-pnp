export function getAuthHeaders(accessToken: string | null) {
	if (!accessToken) {
		return {};
	}
	return {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "multipart/form-data",
	};
}
