import { useContext } from "react";
import styled from "styled-components";
import { shopContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user } = useContext(shopContext);

  // const navigate = useNavigate();

  // if (!user) {
  //   navigate("/sign-up");
  // }

  return (
    <>
      <div>
        <h1>hello {user || "guest"}</h1>
      </div>
    </>
  );
}
