import { axiosInstance } from "../../../../../services/commom/axiosInstance";
import type { LoginForm } from "./interfaces";

export const loginService = async (data: LoginForm) => {
	const response = await axiosInstance.post("/login/", data);
	return response.data;
};
