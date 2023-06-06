import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { selectGlobalState } from "../../containers/Global/globalSlice";
import { useAppSelector } from "../../hooks";


const ProtectedRoutes = () => {
  const { userEmail } = useAppSelector(selectGlobalState);

  const navigate = useNavigate();
  const { pathname } = window.location;

  React.useEffect(() => {
    if (pathname !== '/' && !userEmail) {
      navigate('/', {
        replace: true,
      })
    }
  }, [pathname, userEmail, navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
