import { useEffect, useState } from "react";
import axios from "axios";

export default function signUpForm() {
  const [message, setMessage] = useState(0);

  const fetchApi = async () => {
    const res = await axios.post("http://localhost:3000/sign-up");
    setMessage(res.data.message);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      <form method="POST" action="/sign-up">
        <label htmlFor="name">Username: </label>
        <input
          name="name"
          className="name input"
          type="text"
          required
          placeholder="dave smith"
        ></input>

        <label htmlFor="email">Email: </label>
        <input
          name="email"
          className="email input"
          type="email"
          placeholder="davesmith@gmail.com"
        ></input>

        <label htmlFor="password">Password:</label>
        <input
          name="password"
          className="password input"
          type="password"
          required
        ></input>

        <button type="submit">Sign up</button>
      </form>

      <h1>{message}</h1>
    </>
  );
}
