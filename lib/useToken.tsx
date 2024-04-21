"use client";
import { useState, useEffect } from "react";

function useToken() {
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", userToken);
      setToken(userToken);
    }
  };

  const removeToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      setToken(null);
    }
  };

  // Update token state when localStorage changes
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, []); // Only run this effect once on component mount

  return {
    token,
    setToken: saveToken,
    removeToken,
  };
}

export default useToken;
