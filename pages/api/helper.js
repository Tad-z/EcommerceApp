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
