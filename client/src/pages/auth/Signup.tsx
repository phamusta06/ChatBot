import { motion } from "framer-motion"
import { NavLink } from "react-router-dom";
import logo from "../../assets/ai.png";
import {useSignup} from "../../hooks/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
const Signup = () => {
  const {signup}=useSignup();
  const [inputs,setInputs]=useState({
    name:'',
    email:'',
    password:''
  });
  const handleSignup=() => {
  
    signup(inputs);
    
  }
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center  md:space-y-0 md:space-x-16 items-center  mx-5 md:mx-0 md:my-0">
      <Helmet>
    
     <title>  Sign up</title>

    </Helmet>
      <div className="w-60 md:w-1/3 max-w-sm ">
        <motion.img
        initial={{scale:0}}
        animate={{scale:1}}
        transition={{duration:0.5}}
        draggable={false}
        src={logo} alt="logo ai" />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center   m-5">
          <label className="tracking-wider font-semibold ">create account </label>
        </div>

        <input
        onChange={(e) => { 
          setInputs({...inputs,name:e.target.value})
        }}
        name="name"
          className="outline-none text-sm w-full px-4 py-2  rounded"
          type="text"
          placeholder="Your Name"
        />
        <input
        onChange={(e) => {
          setInputs({...inputs,email:e.target.value})
          
        }}
        name="email"
         
          className="outline-none text-sm w-full px-4 py-2 mt-3  rounded"
          type="text"
          placeholder="Email Address"
        />
        <input
        onChange={(e) => {
          setInputs({...inputs,password:e.target.value})
          
        }}
        name="password"
          className=" outline-none text-sm w-full px-4 py-2  rounded mt-3"
          type="password"
          placeholder="Password"
        />
        <div className="mt-3 flex justify-between font-semibold text-sm"></div>
        <div className="text-center md:text-left">
          <button
          onClick={handleSignup}
            className="mt-3  bg-slate-950 w-full text-white p-4  uppercase rounded text-xs tracking-wider font-semibold"
            type="submit"
          >
         Create an account
          </button>
        </div>
        <div className="mt-3 font-semibold text-sm text-slate-900 text-center md:text-left">
        Already have an account? {" "}
          <NavLink
            className="text-blue-950 hover:underline hover:underline-offset-4"
            to="/login"
          >
            Login here
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default Signup;
