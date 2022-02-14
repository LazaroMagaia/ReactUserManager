import React from 'react';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/AdminNav';
//import { io } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const PF="http://127.0.0.1:8000/uploads/";
  let Token = localStorage.getItem("AccessToken");
  let email = localStorage.getItem("email");
    const [user, setUser] = useState([]);
    const [me, setMe] = useState([]);
    useEffect(() => {
        allFromUser();
        allUser();
    }, []);
    const allFromUser = () =>{
        axios.get("http://127.0.0.1:8000/api/auth/me/"+email,{
          headers:{
            Authorization: 'Bearer ' + Token
          }          
        })
        .then((response)=>{
            setMe(response.data);
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        });
    }
    const allUser = () =>{
        axios.get("http://127.0.0.1:8000/api/user/alluser",{
          headers:{
            Authorization: 'Bearer ' + Token,
          }
        })
        .then((response)=>{
            setUser(response.data);
        })
        .catch((error)=>{
            console.log(error);
            console.log(email);
        });
    }
    const Remove =(id)=>{
      axios.delete('http://127.0.0.1:8000/api/user/delete/'+id,{
        headers:{
          Authorization: 'Bearer ' + Token
        }
      })
      .then((respose)=>{
        alert("removido com sucesso");
        allUser();
      }).catch((err)=>{
        alert("erro na remoção");
      })
    }
  return <div className='homeAdmin'>
      <Navbar></Navbar>
      <div className='Banner-principal container'>
        {
          me.map((me)=>(
            <div key={me.id}>
              <div>Nome da empresa: {
              me.name_company 
              }</div>
              <div>
              {me.image_company ? (<div>
                <img src={PF+ me.image_company}/>
                <Link to={'/admin/adphoto/'+me.id} className='btn btn-warning'>
                    Editar Foto
                </Link>
              </div>):(<div>
                <Link to={'/admin/adphoto/'+me.id} className='btn btn-warning'>
                    Nova Foto
                </Link>
              </div>
              )}
                </div>
            </div>
          ))
        }
      </div>

      <table className="table">
        <thead>
            <tr>
            <th scope="col">Nome</th>
            <th scope="col">Apelido</th>
            <th scope="col">Email</th>
            <th scope="col">Foto de perfil</th>
            <th scope="col">Accoes</th>
            </tr>
        </thead>
        <tbody>
            {
            user.map((user)=>(
                    <tr key={user.id}>
                    <th>{user.first_name}</th>
                    <td>{user.second_name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.perfil_photo ? (<div className='user-image'>
                        <img src={PF+ user.perfil_photo} width={60}/>
                        </div>): 
                      (<div>
                        <Link to={'/admin/photo/'+user.id} className='btn btn-warning'>
                            Nova Foto
                        </Link>
                      </div>)
                      }
                    </td>
                    <td>
                        <Link to={'/admin/edit/'+user.id} className='btn btn-primary'>
                            Editar
                        </Link>
                        <button className='btn btn-danger' onClick={()=>Remove(user.id)}>
                            Remover
                        </button>
                    </td>
                    </tr>
                ))
            }
        </tbody>
        </table>
  </div>;
};

export default Home;
