import { microblogApi } from "../../../services/commom/microblogApi";
import type { iRegister } from "../interfaces/iRegister";

export const registerService = async (data: iRegister) => {
	const response = await microblogApi.post("/cadastrar/", data);
	return response.data;
};
