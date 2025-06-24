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
  margin-top: 20px;
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
  const { user, addUser, loading } = useContext(shopContext);
  const [buttons, setBtns] = useState([]);
  const [btnMessage, setBtnMessage] = useState("see less");
  const [showAll, setShowAll] = useState(false);
  const [selectBtn, setSelectBtn] = useState(false);
  const [checkedBtn, setCheckedBtn] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");

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

  const fillsArray = async (folderName, isChecked) => {
    setCheckedBtn((prev) => {
      if (isChecked) {
        return [...prev, { folderName }];
      } else {
        return prev.filter((name) => name !== folderName);
      }
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      if (checkedBtn.length >= 1) {
        const res = await axios.post(
          `http://localhost:3000/delete/${user}`,
          { folders: checkedBtn },
          { withCredentials: true }
        );

        if (res.data.success) {
          setDeleteMsg(`folder deleted`);
          await fetchLessFolder();
        }
      }
    } catch (err) {
      console.error("error in handleDelete in homepage: ", err);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate("/log-in");
      }
    }

    fetchLessFolder();
  }, [navigate, user, loading]);

  const fetchLessFolder = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `http://localhost:3000/create-folder/${user}`,
        {
          withCredentials: true,
        }
      );

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
      const res = await axios.get(
        `http://localhost:3000/create-folder/${user}`,
        {
          withCredentials: true,
        }
      );

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
    if (showAll) {
      fetchAllFolder();
    } else {
      fetchLessFolder();
    }
  };

  return (
    <RootDiv>
      <Nav>
        {selectBtn
          ? buttons.map((btn, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    fillsArray(btn, e.target.checked);
                  }}
                />
                {btn}
              </label>
            ))
          : buttons.map((btn, index) => (
              <Btn key={index} onClick={() => navigate(`/folder/${btn}`)}>
                {btn}
              </Btn>
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
          onClick={() => {
            logout();
          }}
        >
          log out
        </Btn>
        <Btn onClick={() => navigate("/create-folder")}>Create folder</Btn>
        <Btn
          onClick={() => {
            if (selectBtn) {
              setSelectBtn(false);
            } else {
              setSelectBtn(true);
            }
          }}
        >
          Select Folder
        </Btn>

        {selectBtn && (
          <Btn
            onClick={(e) => {
              handleDelete(e);
            }}
          >
            Delete
          </Btn>
        )}
      </BtnDiv>

      <p>{deleteMsg}</p>
    </RootDiv>
  );
}
