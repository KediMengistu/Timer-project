import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./components/App.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";
import DefaultView from "./components/default-components/DefaultView.tsx";
import DefaultMainComponent from "./components/default-components/DefaultMainComponent.tsx";
import DefaultMainContentContainer from "./components/default-components/DefaultMainContentContainer.tsx";
import SignUpForm from "./components/auth-components/SignUpForm.tsx";
import SignInForm from "./components/auth-components/SignInForm.tsx";
import ForgotPasswordForm from "./components/auth-components/ForgotPasswordForm.tsx";
import SignUpVerifyUserForm from "./components/auth-components/SignUpVerifyUserForm.tsx";
import TimerDefaultContainerComponent from "./components/timer-components/timer-default-components/TimerDefaultContainerComponent.tsx";
import SignInVerifyUserForm from "./components/auth-components/SignInVerifyUserForm.tsx";
import ForgotPasswordUserVerifyForm from "./components/auth-components/ForgotPasswordVerifyUserForm.tsx";
import SignOutForm from "./components/auth-components/SignOutForm.tsx";
import DeleteAccountForm from "./components/auth-components/DeleteAccountForm.tsx";
import DeleteAccountVerifyUserForm from "./components/auth-components/DeleteAccountVerifyUserForm.tsx";
import RequireAuthGuard from "./components/guard-components/RequireAuthGuard.tsx";
import RequireNoAuthGuard from "./components/guard-components/RequireNoAuthGuard.tsx";
import TimerSelectScrollComponent from "./components/timer-components/timer-select-components/TimerSelectScrollComponent.tsx";
import AddTimerForm from "./components/timer-components/timer-add-components/AddTimerForm.tsx";
import Timer from "./components/timer-components/timer-display-components/Timer.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <DefaultView />,
        children: [
          {
            path: "",
            element: <DefaultMainComponent />,
            children: [
              {
                index: true,
                element: <DefaultMainContentContainer />,
              },
              // Routes that require NO authentication
              {
                element: <RequireNoAuthGuard />,
                children: [
                  {
                    path: "signup",
                    element: <SignUpForm />,
                  },
                  {
                    path: "verify-user-from-signup",
                    element: <SignUpVerifyUserForm />,
                  },
                  {
                    path: "verify-user-from-signin",
                    element: <SignInVerifyUserForm />,
                  },
                  {
                    path: "signin",
                    element: <SignInForm />,
                  },
                  {
                    path: "forgotpassword",
                    element: <ForgotPasswordForm />,
                  },
                  {
                    path: "verify-user-forgot-password",
                    element: <ForgotPasswordUserVerifyForm />,
                  },
                ],
              },
              // Routes that require authentication
              {
                element: <RequireAuthGuard />,
                children: [
                  {
                    path: "signout",
                    element: <SignOutForm />,
                  },
                  {
                    path: "manage-timers",
                    element: <TimerDefaultContainerComponent />,
                    children: [
                      {
                        index: true,
                        element: <TimerSelectScrollComponent />,
                      },
                      {
                        path: "add-timer",
                        element: <AddTimerForm />,
                      },
                      {
                        path: ":id",
                        element: <Timer />,
                      },
                    ],
                  },
                  {
                    path: "delete-account",
                    element: <DeleteAccountForm />,
                  },
                  {
                    path: "verify-delete-account",
                    element: <DeleteAccountVerifyUserForm />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
