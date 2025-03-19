import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../app/hooks";

function RequireNoAuthGuard() {
  const signedInStatus = useAppSelector((state) => state.signedInStatus.value);

  if (signedInStatus === false) {
    return <Outlet />;
  } else {
    return <Navigate to="/manage-timers" replace />;
  }
}

export default RequireNoAuthGuard;
