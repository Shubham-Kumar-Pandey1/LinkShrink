import React from 'react'
import { useMemo } from "react";
import Navbar from "../components/Navbar.jsx";
import Information from "../components/Information.jsx";
import Form1 from "../components/Form1.jsx";
import Form2 from "../components/Form2.jsx";
import Form3 from "../components/Form3.jsx";
import Form4 from "../components/Form4.jsx";
import Form5 from "../components/Form5.jsx";
import Form6 from "../components/Form6.jsx";
function Home() {

    // Memoized random form selection
  const randomForm = useMemo(() => {
    const formComponents = [<Form1 />, <Form2 />, <Form3 />, <Form4 />, <Form5 />, <Form6 />];
    return formComponents[Math.floor(Math.random() * formComponents.length)];
  }, []);

  return (
    <div className='h-screen flex flex-col'>
        {/* Navbar */}
        <Navbar />
        <div className="flex flex-1 ">
            {/* Left Side - Information */}
            <div className="w-1/2">
                <Information />
            </div>
            {/* Right Side - Random Form */}
            <div className="w-1/2 flex items-center justify-center">
                {randomForm}
            </div>
        </div>
    </div>
  )
}

export default Home