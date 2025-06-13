import { useContext, useEffect } from "react";
import styled from "styled-components";
import { shopContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const RootDiv = styled.div`
  height: 100vh;
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

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
  const [buttons, setBtns] = useState([]);
  const [btnMessage, setBtnMessage] = useState("see less");
  const [showAll, setShowAll] = useState(false);

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

  useEffect(() => {
    if (!user) {
      navigate("/log-in");
    }

    fetchLessFolder();
  }, [user]);

  const fetchLessFolder = async () => {
    try {
      const res = await axios.get("http://localhost:3000/create-folder", {
        withCredentials: true,
      });

      if (res.data.success) {
        setBtns(res.data.lessFolders);
      }
    } catch (err) {
      console.error("error in homepage btns useEffect: ", err);
    }

    setShowAll(true);
    setBtnMessage("see more");
  };

  const fetchAllFolder = async () => {
    try {
      const res = await axios.get("http://localhost:3000/create-folder");

      if (res.data.success) {
        setBtns(res.data.allFolders);
      }
    } catch (err) {
      console.error("error in displaying all folder btns: ", err);
    }

    setShowAll(false);
    setBtnMessage("see less");
  };

  const handleClick = () => {
    console.log("button clicked: ", showAll);
    if (showAll) {
      fetchAllFolder();
    } else {
      fetchLessFolder();
    }
  };

  return (
    <RootDiv>
      <Nav>
        {buttons.map((btn, index) => (
          <Btn key={index}>{btn}</Btn>
        ))}
        <Btn
          onClick={() => {
            handleClick();
          }}
        >
          {btnMessage}
        </Btn>
      </Nav>

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
        <Btn onClick={() => navigate("/create-folder")}>Create folder</Btn>
      </BtnDiv>
    </RootDiv>
  );
}
