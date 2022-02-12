import React, { useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import Navbar from '../components/Navbar';
const Register = () => {
    const navigate = useNavigate();
    const [submit,setSubmit] = useState([]);
    const Websearch = yup.object({
        name_company: yup.string().required("o campo deve ser preenchido"),
        Endereco: yup.string().required("o campo deve ser preenchido"),
        contact_01: yup.string().required("o campo deve ser preenchido"),
        contact_02: yup.string().required("o campo deve ser preenchido"),
        email: yup.string().required("o campo deve ser preenchido"),
        password: yup.string().required("o campo deve ser preenchido")
      }).required();
    const {register,handleSubmit,formState:{errors}} = useForm({
        resolver: yupResolver(Websearch)
    });
    const onSubmit = data =>{
        console.log(data);
       axios.post("http://127.0.0.1:8000/api/auth/register/",data)
        .then((response)=>{
            setSubmit(response.data.message);
            navigate('/login');
        })
        .catch((error)=>{
            console.log(error);
        });
    }

  return <div>
      <Navbar></Navbar>      
        <div className='login'>
                <h1>Cadastrar nova conta</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label for="Nome_Empresa" className="form-label">Nome da empresa</label>
                    <input type="text" className="form-control" {...register("name_company")}
                    id="Nome_Empresa" aria-describedby="Nome_Empresa"/>
                    <p className='error-message'>{errors.nome_da_empresa?.message}</p>
                </div>
                {/*<div className="mb-3">
                    <label for="Logo" className="form-label">Logotipo</label>
                    <input type="file" accept=".png, .jpg" className="form-control"
                        name="logotipo" {...register("logotipo")}
                    id="Logo" aria-describedby="Logo"/>
                     <p className='error-message'>{errors.logotipo?.message}</p>
                </div>*/}
                <div className="mb-3">
                    <label for="Endereco" className="form-label">Endereço</label>
                    <input type="text" className="form-control" {...register("Endereco")}
                    id="Endereco" aria-describedby="Endereco"/>
                    <p className='error-message'>{errors.nome_da_empresa?.message}</p>
                </div>
                <div className="mb-3">
                    <label for="contactoI" className="form-label">Contacto</label>
                    <input type="text" className="form-control" {...register("contact_01")}
                    id="contactoI" aria-describedby="contactoI"/>
                    <p className='error-message'>{errors.contacto?.message}</p>

                </div>
                <div className="mb-3">
                    <label for="contactoII" className="form-label">Contacto secundario</label>
                    <input type="text" className="form-control" {...register("contact_02")}
                    id="ContactoII" aria-describedby="ContactoII"/>
                     <p className='error-message'>{errors.contacto_02?.message}</p>
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
                <button type="submit" className="btn btn-primary">Nova conta</button>
                </form>
                <Link to="/login" className='register-control'>já tem conta? Entre por aqui</Link>
        </div>
    </div>
}

export default Register;
