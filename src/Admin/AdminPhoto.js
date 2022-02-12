import React,{useState} from 'react'
import Navbar from '../components/AdminNav';
import axios from 'axios';
import {useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AdminPhoto = () => {
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
        const image_company = filename;
        try{
            axios.put("http://127.0.0.1:8000/api/auth/adminPhoto/"+id,data,{
                headers:{
                    Authorization: 'Bearer ' + Token
                  }
            })
            .then((e)=>{
                console.log("registrado com sucesso");
            })
            .catch((err)=>console.log(err))
        }catch(e){console.log(e)}
    }
  return (
    <div>
         <Navbar></Navbar>
        <form onSubmit={sendPhoto}>
            <div className="mb-3">
                <label for="image_company" className="form-label">Foto de perfil</label>
                <input type="file" name="file" className="form-control" id="image_company" 
                onChange={(e)=>setFile(e.target.files[0])} aria-describedby="perfil" />
                <button type='submit' className='btn btn-primary'>nova imagem</button>
            </div>
        </form>
    </div>
  )
}

export default AdminPhoto