import React from 'react';
import Navbar from "../components/Navbar.jsx";
import Information from '../components/Home/MyInformationComponent/Information.jsx';
import Form from '../components/Home/MyFormComponent/Form.jsx';

function Home() {
  return (
    <div className="h-screen flex flex-col bg-black text-white">
      {/* Navbar */}
      <Navbar />
      <div className="flex flex-1">
        {/* Left Side - Information */}
        <div className="w-1/2 flex items-center justify-center">
          <Information />
        </div>
        {/* Right Side - Form */}
        <div className="w-1/2 flex items-center justify-center">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default Home;
