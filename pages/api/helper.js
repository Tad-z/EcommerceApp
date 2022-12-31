// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

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

// export default async function signUphandler(req, res) {
//   const user = {username: user.username,
//                 email: user.email,
//                 password: user.password}
//   await axios.post(`http://localhost:4000/user/signup`, user)
// }

export default class ApiCall {
  static async getMethod(url) {
    // const authenticated = localStorage.getItem("isAuthenticated") !== null
    // const response = axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
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
