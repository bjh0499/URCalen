import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authApi from "../api/authApi";
import { logout } from "../store/slices/authSlice";

type authProviderInput = {
  children: React.JSX.Element;
};

export default function AuthProvider({ children }: authProviderInput) {
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await authApi.verify();
      } catch (err) {
        dispatch(logout());
      }
    };
    verifyToken();
  }, []);

  return children;
}
