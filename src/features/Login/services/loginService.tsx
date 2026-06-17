import { microblogApi } from "../../../services/commom/microblogApi";
import type { iLoginForm } from "../interfaces/iLoginForm";

export const loginService = async (data: iLoginForm) => {
	const response = await microblogApi.post("/login/", data);
	return response.data;
};
