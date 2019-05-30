import React from "react";
import MyComponent from "./calender.jsx";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <div className="cal">
          <MyComponent />
        </div>
      </header>
    </div>
  );
};

export default App;
