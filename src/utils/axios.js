import axios from "axios";

export const apiCall = async (endpoint, data, method, isToken) => {
  let token = null;

  const headers = {
    "Content-Type": "application/json",
  };

  if (isToken) {
    token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const config = {
    method: method,
    url: endpoint,
    headers: headers,
    data: data,
  };

 

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
    
  }
};