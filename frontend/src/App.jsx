import "./App.css";
import axios from "axios";
import Home from "./files/homepage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import SignUpForm from "./files/signUpForm";
import LoginForm from "./files/loginForm";

export const shopContext = createContext({
  user: "",
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
      { path: "/log-in", element: <LoginForm /> },
    ],
  },
]);

export default function App() {
  const [user, setUser] = useState("");

  const addUser = (username) => {
    setUser(username);
  };

  useEffect(() => {
    async function fetchuser() {
      try {
        const res = await axios.get("http://localhost:3000/me", {
          withCredentials: true,
        });

        if (res.data.user) {
          addUser(res.data.user.username);
        }
      } catch (err) {
        console.error("error in fetchData func: ", err);
      }
    }

    fetchuser();
  }, []);

  return (
    <shopContext.Provider value={{ user, addUser }}>
      <RouterProvider router={router} />
    </shopContext.Provider>
  );
}
