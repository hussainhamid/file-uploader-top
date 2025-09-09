import { useParams } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { shopContext } from "../App";
import styled from "styled-components";

const RooDiv = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const FormDiv = styled.div`
  border: 1px solid grey;
  border-radius: 20px;
  height: auto;
  width: auto;
  padding: 30px;
  display: flex;
  margin-top: 150px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: fit-content;
`;

const BtnDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const Btn = styled.button`
  font-size: 15px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const LoadingDiv = styled.div`
  height: auto;
  margin-top: 70px;
`;

const InputDiv = styled.div`
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;

  &:hover {
    border-color: #646cff;
  }

  &:focus,
  &:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const LoadingDivBlurred = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  backdrop-filter: blur(10px);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingInsideDiv = styled.div`
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function OpenFolder() {
  const { folderName } = useParams();
  const { user, loading } = useContext(shopContext);
  const [folderData, setFolderData] = useState(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [selectBtn, setSelectBtn] = useState(false);
  const [checkedBtn, setCheckedBtn] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");
  const [loadingMsg, setLoadingMsg] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("uploadedFile", file);
    formData.append("folderName", folderData.foldername);
    formData.append("userName", folderData.username);

    try {
      setLoadingMsg(true);
      const res = await axios.post(
        `/add-file/${folderData.foldername}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        await fetchFolder();
        setMessage(`file uploaded successfully`);
      }

      if (res.data.loadingMsg) {
        setLoadingMsg(false);
      }
    } catch (err) {
      const errorText =
        err?.response?.data?.error ||
        (typeof err?.response?.data === "string"
          ? err.response.data
          : "Unknown error");

      console.error("error in addfile ", err);
      setMessage(`file could not be uploaded: ${errorText}`);
      setLoadingMsg(false);
    }
  }

  const fillsArray = (file, checked) => {
    setCheckedBtn((prev) => {
      if (checked) {
        return [...prev, file];
      } else {
        return prev.filter((name) => name != file);
      }
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      setLoadingMsg(true);
      if (checkedBtn.length >= 1) {
        const res = await axios.post(
          `/delete-file/${folderData.foldername}`,
          { files: checkedBtn, user: user },
          { withCredentials: true }
        );

        if (res.data.success) {
          setDeleteMsg(`deleted file: ${res.data.files}`);
          await fetchFolder();
          setLoadingMsg(false);
        }
      }
    } catch (err) {
      console.error("error in handleDelete openFolder.jsx: ", err);
      setLoadingMsg(false);
    }
  };

  const fetchFolder = async () => {
    try {
      const res = await axios.get(`/folder/${folderName}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setFolderData(res.data.folder);
      }
    } catch (err) {
      console.error("error in openFolder.jsx useEffect: ", err);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate(`/${user}`);
      }
    }

    fetchFolder();
  }, [folderName]);

  if (!folderData) return <div>Loading...</div>;

  return (
    <RooDiv>
      <Nav>
        {selectBtn
          ? folderData.File.map((file) => (
              <InputDiv>
                <label key={file.id}>
                  <input
                    type="checkbox"
                    onChange={(e) => fillsArray(file.id, e.target.checked)}
                  />
                  {file.name}
                </label>
              </InputDiv>
            ))
          : folderData.File.map((file) => (
              <Btn
                key={file.id}
                onClick={() => {
                  window.open(file.url, "_blank");
                }}
              >
                {file.name}
              </Btn>
            ))}
      </Nav>

      {loadingMsg && (
        <LoadingDivBlurred>
          <LoadingInsideDiv>
            <p>Pls wait...</p>
          </LoadingInsideDiv>
        </LoadingDivBlurred>
      )}

      <div>
        <FormDiv>
          <Form encType="multipart/form-data" onSubmit={handleSubmit}>
            <FormGroup>
              <label>File: </label>
              <input
                type="file"
                required
                name="uploadedFile"
                onChange={(e) => setFile(e.target.files[0])}
              ></input>
            </FormGroup>

            <BtnDiv>
              <Btn type="submit">Add file</Btn>
              <Btn
                onClick={() => {
                  navigate(`/${user}`);
                }}
              >
                Go back
              </Btn>

              <Btn
                onClick={(e) => {
                  e.preventDefault();

                  if (selectBtn) {
                    setSelectBtn(false);
                  } else {
                    setSelectBtn(true);
                  }
                }}
              >
                Select files
              </Btn>

              {selectBtn && <Btn onClick={(e) => handleDelete(e)}>Delete</Btn>}
            </BtnDiv>
          </Form>
        </FormDiv>

        <div>
          <p>folder: {folderData.foldername}</p>
          <p>created by: {folderData.username}</p>
          <p>We only support images and videos, sorry for the inconvenience</p>
        </div>
      </div>

      <div>
        <p>{message}</p>
        <p>{deleteMsg}</p>
      </div>
    </RooDiv>
  );
}
