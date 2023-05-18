import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/SignUpPage";
import HomePage from "./Components/HomePage";

function App() {

  const [token,setToken]=useState('')

  useEffect(()=>{
    async function invoke(){
      await setToken(localStorage.getItem('myToken'))
    }invoke()
  },[])

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
        </Routes>
        <Routes>
          <Route path="/login" element={token?<HomePage/>:<LoginPage/>} />
        </Routes>
        <Routes>
          <Route path="/signup" element={token?<HomePage/>:<SignUpPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
