import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Admin from './Admin';
import Home from './Home';
import Edit from './Edit';
import EditProfile from './EditProfile';
import CartItem from './CartItem';
import AdminDashboard from './AdminDashboard';
import { ToastContainer } from 'react-toastify';
import { AdminAdd } from './AdminAdd';
import CAnimate from './CAnimate';


function App() {
  return (
    <>
      <Router>
        <ToastContainer/>
        <Nav></Nav>
        <Routes>
        <Route path="/" element={<Home/>}></Route>
          <Route path="/Signup" element={<Signup/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Profile" element={<Profile/>}></Route>
          <Route path="/Admin" element={<Admin/>}></Route>
          <Route path="/CartItem" element={<CartItem/>}></Route>

          <Route path="/Edit/:userid" element={<Edit/>}></Route>
          <Route path="/EditProfile/:userid" element={<EditProfile/>}></Route>
          <Route path="/AdminDashboard" element={<AdminDashboard/>}></Route>
          <Route path="/AdminAdd" element={<AdminAdd/>}></Route>
          <Route path="/CAnimate" element={<CAnimate/>}></Route>



        </Routes>

      </Router>


    </>
  )
}

export default App