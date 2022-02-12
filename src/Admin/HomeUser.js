import React,{useEffect,useState} from 'react'
import Nav from '../components/Navbar';
import axios from 'axios';
const HomeUser = () => {
  let email = localStorage.getItem("email");
  const [user,setUser] = useState([]);
  useEffect(() => {
    AllfromUser();
  }, []);
  const AllfromUser = ()=>{
    axios.get("http://127.0.0.1:8000/api/user/me/"+email).then((response)=>{
      setUser(response.data)
    }).catch((error)=>{console.log(error)})
  }
  return (
    <div>
      <Nav></Nav>
      <div className='container'>
        <h2>ola seja bem vindo {user.first_name}</h2>
      </div>
    </div>
  )
}

export default HomeUser