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
  border: 1px solid grey;
  padding: 5px;
  border-radius: 4px;

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

export default function SignUpForm() {
  const { addUser } = useContext(shopContext);

  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/sign-up",
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

        navigate("/");
      }
    } catch (err) {
      console.error("error in signUpForm.jsx: ", err);
      setMessage("sign up failed");
    }
  };

  return (
    <>
      <FormDiv>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <label htmlFor="name">*Username: </label>
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
            <label htmlFor="email">Email: </label>
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
            <label htmlFor="password">*Password:</label>
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
      </FormDiv>

      <h1>{message}</h1>
    </>
  );
}
