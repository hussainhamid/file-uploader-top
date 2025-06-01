import { useContext, useEffect } from "react";
import styled from "styled-components";
import { shopContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/log-in");
  //   }
  // }, [user]);

  return (
    <>
      <div>
        <h1>hello {user || "guest"}</h1>
      </div>

      <button type="submit" onClick={logout}>
        log out
      </button>
    </>
  );
}
