import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../app/hooks";

function RequireAuthGuard() {
  const signedInState = useAppSelector((state) => state.auth.isSignedIn);

  if (signedInState === true) {
    return <Outlet />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default RequireAuthGuard;
