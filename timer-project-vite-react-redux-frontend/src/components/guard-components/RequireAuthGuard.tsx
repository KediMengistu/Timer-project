import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../app/hooks";

function RequireAuthGuard() {
  const location = useLocation();
  const signedInStatus = useAppSelector((state) => state.signedInStatus.value);

  if (signedInStatus === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default RequireAuthGuard;
