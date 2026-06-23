import type iPublicacaoSubmit from "../../../interfaces/iPublicacaoSubmit";
import { useAuthState } from "../../../states/useAuthStates";
import { microblogApi } from "../../commom/microblogApi";

export default class PublicacaoService {
	static async get() {
		const response = await microblogApi.get("/publicacao/");
		return response.data;
	}

	static async getById(id: number) {
		const response = await microblogApi.get(`/publicacao/${id}/`);
		return response.data;
	}

	static async post(data: iPublicacaoSubmit) {
		console.log(useAuthState.getState());
		const response = await microblogApi.post("/publicacao/", data, {
			headers: {
				Authorization: `Bearer ${useAuthState.getState().accessToken}`,
				"Content-Type": "multipart/form-data",
			},
		});
		return response.data;
	}

	static async getComentarios(id: number) {
		const response = await microblogApi.get(`/publicacao/${id}/comentarios/`);
		return response.data;
	}
}
