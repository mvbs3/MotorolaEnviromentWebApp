import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import React, { useEffect, useState } from "react";
import axios from 'axios'

function App() {
  const baseUrl = "http://localhost:5000";
  const [status5g, setStatus5g] = useState({
    
  });

  return (
    <div className="App">
      <Header />
      <Body />
      <a
        href="https://www.youtube.com/watch?v=w3vs4a03y3I"
        style={{ color: "black" }}
      >
        Video pra fazer o server express rapido 
      </a>
    </div>
  );
}

export default App;
