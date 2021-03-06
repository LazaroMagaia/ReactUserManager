import React, { useState,useEffect } from 'react';
import { Link, useParams,useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import Navbar from '../components/AdminNav';
import { Store } from 'react-notifications-component';
const Edit = () => {
    const navigate = useNavigate();
    let Token = localStorage.getItem("AccessToken");
    const { id } = useParams();
    const [submit,setSubmit] = useState([]);
    const Websearch = yup.object({
        first_name: yup.string().required("o campo deve ser preenchido"),
        second_name: yup.string().required("o campo deve ser preenchido"),
        email: yup.string().required("o campo deve ser preenchido"),
        password: yup.string().required("o campo deve ser preenchido"),
      }).required();
    const {register,handleSubmit,formState:{errors},reset} = useForm({
        resolver: yupResolver(Websearch)
    });
    useEffect(() => {
        userdata();
    }, [])
    const onSubmit = data =>{
       axios.put("http://127.0.0.1:8000/api/user/edit/"+id,data,{
        headers:{
            Authorization: 'Bearer ' + Token
          }
       })
        .then((response)=>{
            setSubmit(response.data.message);
            Store.addNotification({
                title: "Sucesso",
                message: "Usuario editado com sucesso",
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
        .catch((error)=>{
            Store.addNotification({
                title: "Erro",
                message: "O usuario ja existe",
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
        });
    }
    const userdata =()=>{
        axios.get("http://127.0.0.1:8000/api/user/OneUser/"+id,{
            headers:{
                Authorization: 'Bearer ' + Token
              }
        })
        .then((response)=>{
            reset(response.data);
        })
        .catch((error)=>{
            Store.addNotification({
                title: "Erro",
                message: "O usuario ja existe",
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
        });
    }
  return <div> <Navbar></Navbar>
            <div className='login'>
                <Link to={'/admin/photo/'+id} className='btn btn-warning'>
                    Editar Foto
                </Link>
                <h1>Editar usuario</h1>
                <form  onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label for="Nome" className="form-label">Nome</label>
                    <input type="text" className="form-control" {...register("first_name")}
                    id="Nome" aria-describedby="Nome"/>
                    <p className='error-message'>{errors.first_name?.message}</p>
                </div>
                <div className="mb-3">
                    <label for="second_name" className="form-label">Apelido</label>
                    <input type="text" className="form-control" {...register("second_name")}
                    id="second_name" aria-describedby="second_name"/>
                    <p className='error-message'>{errors.second_name?.message}</p>
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" {...register("email")}
                    id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <p className='error-message'>{errors.email?.message}</p>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Senha</label>
                    <input type="password" className="form-control" {...register("password")}
                    id="exampleInputPassword1"/>
                    <p className='error-message'>{errors.password?.message}</p>
                </div>
                <button type="submit" className="btn btn-primary">Novo usuario</button>
                </form>
        </div>
  </div>
};

export default Edit;
