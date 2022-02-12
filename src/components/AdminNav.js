import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
const AdminNav = () => {
  const navigate = useNavigate()
  const sair =()=>{
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("email");
    localStorage.removeItem("admin");
    navigate("/login");
  }
  return (
    <div className='navbar'>
        <nav>
          <ul>
              <li>
                  <Link to="/admin">Home</Link>
              </li>
              <li>
                  <Link to="/admin/create">cadastrar utilizador</Link>
              </li>
              <li>
                  <button className='btn btn-primary' onClick={sair}>Sair</button>
              </li>
          </ul>
      </nav>
    </div>
  )
}

export default AdminNav