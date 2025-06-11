import { useContext, useEffect, useState } from "react";
import { shopContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateFolderForm() {
  const { addFolders, folders, user } = useContext(shopContext);

  const navigate = useNavigate();

  const [folder, setFolder] = useState({
    name: "",
    files: [],
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const folderTosend = {
      userName: user,
      name: folder.name,
      files: folder.files,
    };

    try {
      const res = await axios.post(
        "http://localhost:3000/create-folder",
        folderTosend,
        { withCredentials: true }
      );

      if (res.data.success) {
        addFolders(folderTosend);
        navigate("/add-file");
      }
    } catch (err) {
      console.error("error in createFolder.jsx: ", err);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    // console.log(folders.map((f) => f.userName));

    if (folders.length > 0) {
      const folderData = folders.map((f) => `${f.name} By: ${f.userName}`);

      setMessage(folderData);
    }
  }, [folders, user]);

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="folder">Folder name:</label>
            <input
              type="text"
              name="folder"
              required
              value={folder.name}
              onChange={(e) => {
                setFolder({ ...folder, name: e.target.value });
              }}
            ></input>
          </div>

          <div>
            <button type="submit">Create</button>
          </div>
        </form>

        <h1>{message}</h1>
      </div>
    </>
  );
}
