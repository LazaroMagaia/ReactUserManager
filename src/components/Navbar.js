import React,{useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    let admin = localStorage.getItem("admin");
    let email = localStorage.getItem("email");
    let user = null;
    if(!admin)
    {
        if(email)
        {
            user = true;
        }
    }
    const sair =()=>{
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("email");
        navigate("/login/user");
      }
  return <div className='navbar'>
      <nav>
          <ul>
              <li>
                  <Link to="/">Home</Link>
              </li>
              <li>
                {
                      user ? <Link to="/user/home">Admin</Link>:""
                }
              </li>
              <li>
                  {
                      user ? "":<Link to="/login">iniciar sessao</Link>
                  }
              </li>
              <li>
                  {
                      user ? "":<Link to="/login/user">Area usuario</Link>
                  }
              </li>
              <li>
                {
                      user ? <button className='btn btn-primary' onClick={sair}>Sair</button>:""
                }
              </li>
          </ul>
      </nav>
  </div>
}
export default Navbar;
