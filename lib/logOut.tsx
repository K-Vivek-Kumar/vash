"use client";

import axios from "axios";
import useToken from "@/components/useToken";

const logout = async () => {
  const { token, removeToken } = useToken();
  try {
    if (token) {
      const response = await axios.post("http://127.0.0.1:5000/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        removeToken();
      }
    }
  } catch (error: any) {}
};

export default logout;
