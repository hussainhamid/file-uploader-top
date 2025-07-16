import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

export default function SignUpForm() {
  const { addUser } = useContext(shopContext);

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "/sign-up",
        {
          username: data.name,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      setMessage("sign up successfull");

      if (res.data.success) {
        addUser(res.data.user.username);
        setLoading(false);
        navigate(`/${res.data.user.username}`);
      }
    } catch (err) {
      console.error("error in signUpForm.jsx: ", err);
      setMessage("sign up failed");
      setLoading(false);
    }
  };

  return (
    <>
      <FormDiv>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">*Username</label>
            <InputFocus
              name="name"
              className="name input"
              type="text"
              required
              placeholder="dave smith"
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
              className="email input"
              type="email"
              placeholder="davesmith@gmail.com"
              value={data.email}
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
            ></InputFocus>
          </FormGroup>

          <FormGroup>
            <label htmlFor="password">*Password</label>
            <InputFocus
              name="password"
              className="password input"
              type="password"
              placeholder="password"
              required
              value={data.password}
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            ></InputFocus>
          </FormGroup>

          <BtnDiv>
            <Btn type="submit">Sign-up</Btn>
            <Btn onClick={() => navigate("/log-in")}>Log-in</Btn>
          </BtnDiv>
        </Form>

        <p>{message}</p>
      </FormDiv>

      {loading && (
        <LoadingDiv>
          <LoadingInsideDiv>
            <p>Creating your account...</p>
          </LoadingInsideDiv>
        </LoadingDiv>
      )}
    </>
  );
}
