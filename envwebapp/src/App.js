import "./App.css";
import Header from "./Components/Header";
import Body from "./Components/Body";
import React from "react";


function App() {
 
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
