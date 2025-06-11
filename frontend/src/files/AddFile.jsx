import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useEffect } from "react";

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
  gap: 10px;
`;

const BtnDiv = styled.div`
  display: flex;
  gap: 15px;
`;

const Btn = styled.button`
  font-size: 15px;
`;

export default function AddFile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const res = await axios.post("http://localhost:3000/add-file", formData, {
        withCredentials: true,
      });

      if (res.data.success) {
        setMessage("file uploaded successfully");
      }
    } catch (err) {
      console.error("error in addfile.jsx: ", err);
    }
  }

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await axios.get("http://localhost:3000/create-folder", {
          withCredentials: true,
        });

        console.log(res.data.folderName);

        if (res.data.success) {
          setMessage(res.data.folderName);
        }
      } catch (err) {
        console.error("error in fetchFolder: ", err);
      }
    };

    fetchFolder();
  }, []);

  return (
    <>
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
            <Btn onClick={() => navigate("/")}>Go back</Btn>
          </BtnDiv>
        </Form>
      </FormDiv>

      <p>{message}</p>
    </>
  );
}
