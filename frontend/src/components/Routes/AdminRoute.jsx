import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth.jsx";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner.jsx";
import config from "../../config.js";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  const backend = config.backendUrl;

  useEffect(() => {
    const authCheck = async () => {
      const resp = await axios.get(`${backend}/api/v1/auth/admin-auth`);

      if (resp.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="" />;
}
