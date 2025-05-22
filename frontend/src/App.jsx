import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [fruits, setFruites] = useState([]);

  const fetchApi = async () => {
    const response = await axios.get("http://localhost:3000/");
    setFruites(response.data.fruits);
    console.log(response.data.fruits);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      {fruits.map((fruit, index) => (
        <div key={index}>
          <p>{fruit}</p>
        </div>
      ))}
    </>
  );
}

export default App;
