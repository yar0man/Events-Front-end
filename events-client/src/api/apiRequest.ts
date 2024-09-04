import { BASE_URL } from "@/constants/constants";
import axios from "axios";

const apiRequest = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default apiRequest;