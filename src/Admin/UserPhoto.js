import React,{useState} from 'react'
import Navbar from '../components/AdminNav';
import axios from 'axios';
import {useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';
const UserPhoto = () => {
    const navigate = useNavigate();
    const [file,setFile] =useState();
    const { id } = useParams();
    let Token = localStorage.getItem("AccessToken");
    const sendPhoto =(e)=>{
        e.preventDefault();
        if(!file)
        {
            navigate('/admin');
        }
        const data = new FormData();
        const filename = Date.now()+file.name;
        data.append("name",filename);
        data.append("file",file);
        const perfil_photo = filename;
        try{
            axios.put("http://127.0.0.1:8000/api/user/photo/"+id,data,{
                headers:{
                    Authorization: 'Bearer ' + Token
                  }
            })
            .then((e)=>{
                Store.addNotification({
                    title: "Sucesso",
                    message: "Foto actualizada",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
                navigate('/admin');
            })
            .catch((err)=>{
                Store.addNotification({
                    title: "Erro",
                    message: "não conseguimos inserir a nova foto",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
            })
        }catch(e){console.log(e)}
    }
  return (
    <div>
        <Navbar></Navbar>
        <form onSubmit={sendPhoto}>
            <div className="mb-3">
                <label for="perfil_photo" className="form-label">Foto de perfil</label>
                <input type="file" name="file" className="form-control" id="perfil_photo" 
                onChange={(e)=>setFile(e.target.files[0])} aria-describedby="perfil" />
                <button type='submit' className='btn btn-primary'>nova imagem</button>
            </div>
        </form>
    </div>
  )
}

export default UserPhoto