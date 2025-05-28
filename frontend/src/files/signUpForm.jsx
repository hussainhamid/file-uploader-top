import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function signUpForm() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/sign-up", {
        username: data.name,
        email: data.email,
        password: data.password,
      });

      setMessage(res.data.message);

      if (res.data.success) {
        setSuccess(true);
      }
    } catch (err) {
      console.error("error in signUpForm.jsx: ", err);
      setMessage("sign up failed");
    }
  };

  if (success) {
    navigate("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Username: </label>
        <input
          name="name"
          className="name input"
          type="text"
          required
          placeholder="dave smith"
          value={data.name}
          onChange={(e) => {
            setData({ ...data, name: e.target.value });
          }}
        ></input>

        <label htmlFor="email">Email: </label>
        <input
          name="email"
          className="email input"
          type="email"
          placeholder="davesmith@gmail.com"
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          className="password input"
          type="password"
          required
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
        ></input>

        <button type="submit">Sign up</button>
      </form>

      <h1>{message}</h1>
    </>
  );
}
