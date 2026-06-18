import type iPublicacaoPost from "../../interfaces/iPublicacaoPosty";
import { microblogApi } from "../commom/microblogApi";

export default class publicacaoService {
	static async get() {
		const response = await microblogApi.get("/publicacao/");
		return response.data;
	}

	static async post(data: iPublicacaoPost) {
		const response = await microblogApi.post("/publicacao/", data);
		return response.data;
	}
}
