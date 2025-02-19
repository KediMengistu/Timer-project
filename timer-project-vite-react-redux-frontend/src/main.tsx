import "./index.css";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./components/App.tsx";
import HomeComponent from "./components/home-components/HomeComponent.tsx";
import AboutProjectComponent from "./components/about-components/AboutProjectComponent.tsx";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomeComponent />,
      },
      {
        path: "about-project",
        element: <AboutProjectComponent />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
