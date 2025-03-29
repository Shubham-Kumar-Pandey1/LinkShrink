
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"; 
import Features from "./pages/Features.jsx"; 
import Pricing from "./pages/Pricing.jsx"; 
import Contact from "./pages/Contact.jsx"; 
import Login from "./pages/Login.jsx"; 
import Signup from "./pages/Signup.jsx"; 
import Dashboard from "./pages/Dashboard.jsx"; 

import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Main Routing */}  
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
