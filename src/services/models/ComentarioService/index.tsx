import type iPublicacaoSubmit from "../../../interfaces/iPublicacaoSubmit";
import { useAuthState } from "../../../states/useAuthStates";
import { microblogApi } from "../../commom/microblogApi";

export default class ComentarioService {
	static async get() {
		const response = await microblogApi.get("/comentario/");
		return response.data;
	}

	static async getById(id: number) {
		const response = await microblogApi.get(`/comentario/${id}/`);
		return response.data;
	}
	static async post(data: iComentarioSubmit) {
		console.log(useAuthState.getState());
		const response = await microblogApi.post("/comentario/", data, {
			headers: {
				Authorization: `Bearer ${useAuthState.getState().accessToken}`,
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	}
}
