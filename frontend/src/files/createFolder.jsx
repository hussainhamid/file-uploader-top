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

export default function CreateFolderForm() {
  const { addFolders, user } = useContext(shopContext);

  const navigate = useNavigate();

  const [folder, setFolder] = useState({
    name: "",
    files: [],
  });

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
    </>
  );
}
