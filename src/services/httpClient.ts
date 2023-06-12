import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_CLOUDFLARE_API_URL;

export const getReq = async (url: string, params: any = {}) => {
  return await axios.get(url, { params });
};

export const postReq = async (url: string, data: any = {}) => {
  return await axios.post(url, data);
};

export const putReq = async (url: string, data: any = {}) => {
  return await axios.put(url, data);
};

export const deleteReq = async (url: string, params: any = {}) => {
  return await axios.delete(url, { params });
};
