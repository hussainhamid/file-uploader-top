import "./App.css";
import axios from "axios";
import Home from "./files/homepage";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import SignUpForm from "./files/signUpForm";
import LoginForm from "./files/loginForm";
import AddFile from "./files/AddFile";
import CreateFolderForm from "./files/createFolder";

export const shopContext = createContext({
  user: "",
  addUser: () => {},
  folders: [],
  addFolders: () => {},
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
      { path: "/add-file", element: <AddFile /> },
      { path: "/create-folder", element: <CreateFolderForm /> },
    ],
  },
]);

export default function App() {
  const [user, setUser] = useState("");
  const [folders, setFolders] = useState([]);

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
    <shopContext.Provider value={{ user, addUser, addFolders, folders }}>
      <RouterProvider router={router} />
    </shopContext.Provider>
  );
}
