import { useContext, useState } from "react";
import { shopContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormDiv = styled.div`
  border: 1px solid grey;
  border-radius: 20px;
  height: 150px;
  width: 230px;
  padding: 20px;
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
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

const Input = styled.input`
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  background: #242424;
`;

const BtnDiv = styled.div`
  display: flex;
  gap: 15px;
`;

const Btn = styled.button`
  font-size: 17px;
`;

const LoadingDiv = styled.div`
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

export default function CreateFolderForm() {
  const { addFolders, user } = useContext(shopContext);

  const navigate = useNavigate();

  const [folder, setFolder] = useState({
    name: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const folderTosend = {
      userName: user,
      name: folder.name,
    };

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/create-folder",
        folderTosend,
        { withCredentials: true }
      );

      if (res.data.success) {
        addFolders(folderTosend);
        setLoading(false);

        navigate(`/${user}`);
      }
    } catch (err) {
      console.error("error in createFolder.jsx: ", err);
      setLoading(false);
    }
  };

  return (
    <>
      <FormDiv>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="folder">Folder name:</label>
            <Input
              type="text"
              name="folder"
              required
              value={folder.name}
              onChange={(e) => {
                setFolder({ ...folder, name: e.target.value });
              }}
            ></Input>
          </FormGroup>

          <BtnDiv>
            <Btn type="submit">Create</Btn>
            <Btn
              onClick={() => {
                navigate(`/${user}`);
              }}
            >
              Go back
            </Btn>
          </BtnDiv>
        </Form>
      </FormDiv>

      {loading && (
        <LoadingDiv>
          <LoadingInsideDiv>
            <p>Creating...</p>
          </LoadingInsideDiv>
        </LoadingDiv>
      )}
    </>
  );
}
