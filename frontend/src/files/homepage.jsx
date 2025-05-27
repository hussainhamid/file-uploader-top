import { useContext } from "react";
import styled from "styled-components";
import { shopContext } from "../App";

export default function Home() {
  const { user, addUser } = useContext(shopContext);

  return (
    <>
      <div>
        <h1>hello {user}</h1>
        <button onClick={addUser}>click to sign in</button>
      </div>
    </>
  );
}
