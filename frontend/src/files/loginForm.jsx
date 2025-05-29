import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { shopContext } from "../App";

export default function LoginForm() {
  const navigate = useNavigate();

  const { addUser } = useContext(shopContext);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/log-in",
        {
          username: data.name,
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        addUser(res.data.user.username);
        navigate("/");
      }
    } catch (err) {
      console.error("error in loginForm.jsx: ", err);
      setMessage("log in failed");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username:</label>
        <input
          name="name"
          className="name input"
          type="text"
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        ></input>

        <label htmlFor="email">Email:</label>
        <input
          name="email"
          className="email input"
          type="email"
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          className="password input"
          type="password"
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        ></input>

        <button type="submit">log in</button>
      </form>
      <h1>{message}</h1>
    </>
  );
}
