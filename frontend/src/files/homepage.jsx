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

export default function Home() {
  const { user, addUser, loading } = useContext(shopContext);
  const [buttons, setBtns] = useState([]);
  const [btnMessage, setBtnMessage] = useState("see less");
  const [showAll, setShowAll] = useState(false);
  const [selectBtn, setSelectBtn] = useState(false);
  const [checkedBtn, setCheckedBtn] = useState([]);
  const [deleteMsg, setDeleteMsg] = useState("");
  const [loadingDivState, setLoading] = useState(false);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/log-out", {
        withCredentials: true,
      });

      if (res.data.logout) {
        addUser("");
        setLoading(false);
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
      setLoading(true);
      if (checkedBtn.length >= 1) {
        const res = await axios.post(
          `http://localhost:3000/delete/${user}`,
          { folders: checkedBtn },
          { withCredentials: true }
        );

        if (res.data.success) {
          setDeleteMsg(`folder deleted`);
          await fetchLessFolder();
          setLoading(false);
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
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/create-folder/${user}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setBtns(res.data.lessFolders);
        setLoading(false);
      }
    } catch (err) {
      console.error("error in homepage btns useEffect: ", err);
      setLoading(false);
    }

    setShowAll(true);
    setBtnMessage("see more");
  };

  const fetchAllFolder = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3000/create-folder/${user}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setBtns(res.data.allFolders);
        setLoading(false);
      }
    } catch (err) {
      console.error("error in displaying all folder btns: ", err);
      setLoading(false);
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
    <>
      <RootDiv>
        <Nav>
          {selectBtn
            ? buttons.map((btn, index) => (
                <InputDiv>
                  <label key={index}>
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        fillsArray(btn, e.target.checked);
                      }}
                    />
                    {btn}
                  </label>
                </InputDiv>
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

      {loadingDivState && (
        <LoadingDiv>
          <LoadingInsideDiv>
            <p>Pls wait...</p>
          </LoadingInsideDiv>
        </LoadingDiv>
      )}
    </>
  );
}
