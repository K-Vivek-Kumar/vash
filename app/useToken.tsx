"use client";

function useToken() {
  let token = null;
  if (typeof window !== undefined) {
    token = localStorage.getItem("token") || null;
  }
  function saveToken(userToken: string) {
    if (typeof window !== undefined) {
      localStorage.setItem("token", userToken);
    }
    token = userToken;
  }

  function removeToken() {
    if (typeof window !== undefined) {
      localStorage.removeItem("token");
    }
    token = null;
  }
  return {
    token,
    setToken: saveToken,
    removeToken,
  };
}

export default useToken;
