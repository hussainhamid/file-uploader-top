import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../App";
import styled from "styled-components";

const FormDiv = styled.div`
  border: 1px solid grey;
  border-radius: 20px;
  height: 370px;
  width: 270px;
  padding: 20px;
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
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

const InputFocus = styled.input`
  padding: 5px;
  border-radius: 4px;
  border: none;
  border-bottom: 1px solid grey;
  outline: none;
  background: #242424;

  &:focus {
    outline: none;
  }
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

export default function LoginForm() {
  const navigate = useNavigate();

  const { addUser } = useContext(shopContext);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "/log-in",
        {
          username: data.name,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (res.data.success && res.data.user) {
        addUser(res.data.user.username);
        setLoading(false);
        navigate(`/${res.data.user.username}`);
      }
    } catch (err) {
      console.error("error in loginForm.jsx: ", err);

      if (err.response.data.message) {
        setMessage(err.response.data.message);
      }

      setLoading(false);
    }
  }

  return (
    <>
      <div>
        <FormDiv>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <label htmlFor="name">Username</label>
              <InputFocus
                name="name"
                className="name InputFocus"
                type="text"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              ></InputFocus>
            </FormGroup>

            <FormGroup>
              <label htmlFor="email">Email</label>
              <InputFocus
                name="email"
                className="email InputFocus"
                type="email"
                onChange={(e) => {
                  setData({ ...data, email: e.target.value });
                }}
                value={data.email}
              ></InputFocus>
            </FormGroup>

            <FormGroup>
              <label htmlFor="password">Password</label>
              <InputFocus
                name="password"
                className="password InputFocus"
                type="password"
                onChange={(e) => {
                  setData({ ...data, password: e.target.value });
                }}
                value={data.password}
              ></InputFocus>
            </FormGroup>

            <BtnDiv>
              <Btn type="submit">Log-in</Btn>
              <Btn onClick={() => navigate("/sign-up")}>Sign-up</Btn>
            </BtnDiv>
          </Form>
        </FormDiv>
        <p>{message}</p>
      </div>

      {loading && (
        <LoadingDiv>
          <LoadingInsideDiv>
            <p>Logging you in...</p>
          </LoadingInsideDiv>
        </LoadingDiv>
      )}
    </>
  );
}
