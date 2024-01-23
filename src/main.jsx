import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/authentications/SignUp.jsx'
import SignIn from './components/authentications/SignIn.jsx'
import Home from './components/Home/Home.jsx'
import AccountVerification from './components/authentications/AccountVerification.jsx'
import Classes from './components/Home/Classes.jsx'
import History from './components/Home/History.jsx'
import Profile from './components/Home/Profile.jsx'
import LogOut from './components/Home/LogOut.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
    <Routes>
      <Route  path='/' element={<SignUp/>} />
      <Route  path='/SignIn' element={<SignIn/>} />
      <Route  path='/AccountVerification' element={<AccountVerification/>} />
      <Route  path='/Home' element={<Home/>}>
        <Route path=':text'  element={<Classes/>}/>
        <Route path='/Home/History/:text'  element={<History/>}/>
        <Route path='/Home/Profile/:text'  element={<Profile/>}/>
        <Route path='/Home/Logout/:text'  element={<LogOut/>}/>
      </Route>
      
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
