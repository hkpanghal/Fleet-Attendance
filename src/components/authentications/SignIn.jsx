import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../Contexts/AuthContext';
import { signin } from '../../backend/auth';
import Loader from '../Home/Loader';
import { useDispatch } from 'react-redux';
import { fetchDetails } from '../../Slices/userDetailsSlice';

function SignIn() {
    const navigate = useNavigate()
    const [user,setUser] = useState({
    email:"",
    password:"",
  })

  const {isLoggedIn,setIsLoggedIn} = useContext(authContext)
  const [isLoading,setIsLoading] = useState(false)
  const [err,setErr] = useState("")

  const dispatch = useDispatch()

  const storeData = async (key, value) => {
    try {
      await localStorage.setItem(key, JSON.stringify(value));
      dispatch(fetchDetails())
      console.log('Data stored successfully!');
    } catch (error) {
      console.log('Error storing data: ' + error);
    }
  };


  const signInUser = async (e)=> {
    e.preventDefault();
    
    
    setIsLoading(true)
    signin(user.email,user.password)
    .then((res) => {
      if(res.data.success){
        storeData("user_data",res.data.user)
        setIsLoading(false)
        setIsLoggedIn(true)
      }
    })
    .catch((error) => {
      console.log(error)
      setIsLoading(false)
      setErr("invalid email or password")
    })
            
  }
  
  if(isLoading){
      return <Loader />
    }


  return (
    <>
    <div className="signInBox">
    <div className="top-area">
      <p>Don't have an account →</p>
      <button onClick={()=> navigate("/SignUp")}>Sign Up</button>
    </div>
    <form action="#" className="signInForm" method="POST">

        <input type="email"  onChange={(e)=>setUser({...user, email:e.target.value})} placeholder="email" className="signInInputs"/> 
        <input type="password"  onChange={(e)=>setUser({...user, password:e.target.value})} placeholder="password" className="signInInputs"/> 
        <button type="submit" onClick={signInUser} >Sign In</button>
    </form>
     <div className='bottom-area'>
      <button onClick={()=> navigate("/ForgotPassword")}>forgot password?</button>
     </div>
      <p>{err}</p>
    </div>
    </>
  );
}

export default SignIn