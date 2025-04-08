import { useEffect } from "react";
import { useDispatch } from "react-redux";
import authApi from "../api/authApi";
import { logout } from "../store/slices/authSlice";

export default function AuthProvider({ children }) {
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
