import { useEffect } from "react";
import { connectWithWebSocketServer } from "./Utils/WssConnection/wssConnection";
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import Dashboard from "./Components/Dashboard";
import LoginPage from "./Components/LoginPage";

function App() {
  useEffect(()=>{
    connectWithWebSocketServer();
  })
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/" element={<LoginPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
