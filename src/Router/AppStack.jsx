import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/Home/Home'
import Classes from '../components/Home/Classes'
import History from '../components/Home/History'
import Profile from '../components/Home/Profile'
import LogOut from '../components/Home/LogOut'
import Students from "../components/Home/Students"
import Snapshots from '../components/Home/Snapshots'
import Loader from '../components/Home/Loader'

const AppStack = () => {
  return (
        <Routes >
                
                <Route path='/' element={<Home />}>
                    <Route path='/' element={<Classes/>}/>
                    <Route path='/students/:class_id/:class_name' element={<Students/>}/>
                    <Route path='/History' element={<History/>}/>
                    <Route path='/SnapShots/:class_id/:user_id' element={<Snapshots />}/>
                    <Route path='/Profile' element={<Profile />}/>
                    <Route path='/Logout' element={<LogOut />}/>
                </Route>
        
        <Route path='/loader' element={<Loader></Loader>} />
        </Routes>
   
  )
}

export default AppStack