import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ApiError } from "../types/types";

const urlApi: string = import.meta.env.VITE_API_URL;

// login
export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${urlApi}/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        const token = res.data?.token;
        if (token) {
          localStorage.setItem("token", token);
          window.location.href = "/";
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
      }
    } catch (err: unknown) {
      const ApiError = err as ApiError;
      if (ApiError.response?.data.message) {
        toast.error(ApiError.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

// register
export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const signup = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${urlApi}/register`,
        { username, email, password },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("User has been created successfully!");
        window.location.href = "/login";
      }
    } catch (err: unknown) {
      const ApiError = err as ApiError;
      if (ApiError.response?.data.message) {
        toast.error(ApiError.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

//logout
export const logout = async () => {
  try {
    await axios.get(`${urlApi}/logout`);
    localStorage.removeItem("token");
    window.location.href = "/login";
  } catch (err: unknown) {
    const ApiError = err as ApiError;
    if (ApiError.response?.data.message) {
      toast.error(ApiError.response.data.message);
  } else {
      toast.error("An unexpected error occurred. Please try again later.");
  }
  }
};
