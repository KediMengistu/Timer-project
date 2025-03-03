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
              {
                path: "signup",
                element: <SignUpForm />,
              },
              {
                path: "signin",
                element: <SignInForm />,
              },
              {
                path: "forgotpassword",
                element: <ForgotPasswordForm />,
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
