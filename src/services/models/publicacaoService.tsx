import type iPublicacao from "../../interfaces/iPublicacao";
import { microblogApi } from "../commom/microblogApi";

export default class publicacaoService {
	static async get() {
		const response = await microblogApi.get("/publicacao/");
		return response.data;
	}

	static async post(data: iPublicacao) {
		const response = await microblogApi.post("/publicacao/", data);
		return response.data;
	}
}
