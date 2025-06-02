import { useContext } from "react";
import styled from "styled-components";
import { shopContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BtnDiv = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
`;

const Btn = styled.button`
  font-size: 15px;
`;

export default function Home() {
  const { user, addUser } = useContext(shopContext);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await axios.get("http://localhost:3000/log-out", {
        withCredentials: true,
      });

      if (res.data.logout) {
        addUser("");
        navigate("/log-in");
      }
    } catch (err) {
      console.error("error in logout function: ", err);
    }
  };

  return (
    <>
      <div>
        <h1>hello {user || "guest"}</h1>
      </div>

      <BtnDiv>
        <Btn
          type="submit"
          onClick={() => {
            logout();
          }}
        >
          log out
        </Btn>
        <Btn onClick={() => navigate("/add-file")}>Add file</Btn>
        <Btn>Create folder</Btn>
      </BtnDiv>
    </>
  );
}
