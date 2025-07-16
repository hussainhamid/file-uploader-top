import "./App.css";
import axios from "axios";
import Home from "./files/homepage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import SignUpForm from "./files/signUpForm";
import LoginForm from "./files/loginForm";
import CreateFolderForm from "./files/createFolder";
import OpenFolder from "./files/openFolder";

export const shopContext = createContext({
  user: "",
  addUser: () => {},
  folders: [],
  addFolders: () => {},
  loading: true,
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
      { path: "/", element: <LoginForm /> },
      { path: "/:userName", element: <Home /> },
      { path: "/sign-up", element: <SignUpForm /> },
      { path: "/log-in", element: <LoginForm /> },
      { path: "/create-folder", element: <CreateFolderForm /> },
      { path: "/folder/:folderName", element: <OpenFolder /> },
    ],
  },
]);

export default function App() {
  const [user, setUser] = useState("");
  const [folders, setFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  const addUser = (username) => {
    setUser(username);
  };

  const addFolders = (folder) => {
    setFolders((prev) => [
      ...prev,
      { userName: folder.userName, name: folder.name, files: folder.files },
    ]);
  };

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/me", {
          withCredentials: true,
        });

        if (res.data.user) {
          addUser(res.data.user.username);
        }
      } catch (err) {
        console.error("Error fetching /me", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <shopContext.Provider
      value={{ user, addUser, addFolders, folders, loading }}
    >
      <RouterProvider router={router} />
    </shopContext.Provider>
  );
}
