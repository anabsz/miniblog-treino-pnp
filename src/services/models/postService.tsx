import type iPost from "../../interfaces/iPost";
import { microblogApi } from "../commom/microblogApi";

export default class postService {
	static async get() {
		const response = await microblogApi.get("/publicacao/");
		return response.data;
	}

	static async post(data: iPost) {
		const response = await microblogApi.post("/publicacao/", data);
		return response.data;
	}
}
