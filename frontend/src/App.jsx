import "./App.css";
import axios from "axios";
import Home from "./files/homepage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { createContext, useState } from "react";
import SignUpForm from "./files/signUpForm";

export const shopContext = createContext({
  user: [],
  addUser: () => {},
});

function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-up", element: <SignUpForm /> },
    ],
  },
]);

export default function App() {
  const [user, setUser] = useState("");

  const addUser = () => {
    setUser("hussain");
  };

  return (
    <shopContext.Provider value={{ user, addUser }}>
      <RouterProvider router={router} />
    </shopContext.Provider>
  );
}
