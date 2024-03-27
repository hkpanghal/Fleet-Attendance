import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignIn from '../components/authentications/SignIn'
import SignUp from '../components/authentications/SignUp'
import AccountVerification from '../components/authentications/AccountVerification'
import ForgotPassword from '../components/authentications/ForgotPassword'
import ResetPassword from '../components/authentications/ResetPassword'


const AuthStack = () => {
  return (
    <Routes>
      <Route  path='/' element={<SignIn/>} />
      <Route  path='/SignUp' element={<SignUp/>} />
      <Route  path='/ForgotPassword' element={<ForgotPassword/>} />
      <Route  path='/ResetPassword' element={<ResetPassword/>} />
      <Route  path='/AccountVerification' element={<AccountVerification/>} />
    </Routes>
  )
}

export default AuthStack