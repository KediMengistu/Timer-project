import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../app/hooks";

function RequireNoAuthGuard() {
  const signedInState = useAppSelector((state) => state.auth.isSignedIn);

  if (signedInState === false) {
    return <Outlet />;
  } else {
    return <Navigate to="/manage-timers" replace />;
  }
}

export default RequireNoAuthGuard;
