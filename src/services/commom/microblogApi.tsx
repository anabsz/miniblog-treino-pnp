import axios from "axios";

export const microblogApi = axios.create({
	baseURL: "http://localhost:8000/",
});
