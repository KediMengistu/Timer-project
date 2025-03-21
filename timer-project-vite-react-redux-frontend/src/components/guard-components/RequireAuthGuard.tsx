import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../app/hooks";

function RequireAuthGuard() {
  const location = useLocation();
  const signedInState = useAppSelector((state) => state.auth.isSignedIn);

  if (signedInState === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default RequireAuthGuard;
