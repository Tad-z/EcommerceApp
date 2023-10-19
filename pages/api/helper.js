import axios from "axios";

export async function getServerData(url) {
  if (typeof window !== "undefined") {
    let token = window.localStorage.getItem("token");
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await reqInstance.get(url);
    console.log({ data });
    return data;
  }
}

export async function postServerData(url, payload) {
  if (typeof window !== "undefined") {
    let token = window.localStorage.getItem("token");
    let reqInstance = axios.create({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await reqInstance.post(url, payload);
    return data;
  }
}
const reqInstance = axios.create();

// Add an interceptor to include the token in the headers for each request
reqInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    let token = window.localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default class ApiCall {
  static async getMethod(url) {
    const response = await axios.get(url);
    if (response.status) {
      return response.data;
    }

    return null;
  }

  static async postMethod(url, payload) {
    return axios.post(url, payload);
  }
}

