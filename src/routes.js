import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Front/Home';
import AdminHome from './Admin/Home';
import Login from './Front/Login';
import Register from './Front/Register';
import Auth from './auth';
import AuthLogin from './authLogin';
import AdminEdit from './Admin/Edit';
import AdminCreate from './Admin/Create';
import UserLogin from './Front/UserLogin';
import HomeUser from './Admin/HomeUser';
import UserPhoto from './Admin/UserPhoto'
import AdminPhoto from './Admin/AdminPhoto'
const routes = () => {
  return (
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<Home/>} exact></Route>
          <Route element={<Auth/>}>
            <Route path="/admin" element={<AdminHome/>}></Route>
            <Route path="/admin/create" element={<AdminCreate/>}></Route>
            <Route path="/admin/edit/:id" element={<AdminEdit/>}></Route>
            <Route path="/admin/photo/:id" element={<UserPhoto/>}></Route>
            <Route path="/admin/adphoto/:id" element={<AdminPhoto/>}></Route>
          </Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/login/user" element={<UserLogin/>}></Route>
            <Route element={<AuthLogin/>}>
            <Route path="/user/home" element={<HomeUser/>}></Route>
            </Route>
            <Route path="/register" element={<Register/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default routes