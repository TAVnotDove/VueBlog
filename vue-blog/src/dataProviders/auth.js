import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

export async function register(userData) {
  try {
    const res = await axios.post(`${BASE_URL}/register`, userData);
    return res;
  } catch (error) {
    if (error.message === "Network Error") {
      return { message: error.message };
    } else {
      return error.response.data;
    }
  }
}
