import React,{ useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';
import Navbar from '../components/Navbar';


const UserLogin = () => {
  const navigate = useNavigate();
  const [submit,setSubmit] = useState([]);
  const Websearch = yup.object({
    email: yup.string().required("o campo deve ser preenchido"),
    password: yup.string().required("o campo deve ser preenchido")
    }).required();
  const {register,handleSubmit,formState:{errors}} = useForm({
      resolver: yupResolver(Websearch)
  });
  const onSubmit = data =>{
    axios.post("http://127.0.0.1:8000/api/user/login",data)
    .then((response)=>{
        setSubmit(response.data.message);
        localStorage.setItem('AccessToken',response.data.accessToken);
        localStorage.setItem('email',response.data.email);
        navigate('/user/home');
    })
    .catch((error)=>{
      console.log(error);
    });
}
  return <div>
    <Navbar/>
      <div className='login'>
                <h1>Iniciar sessão</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">Email</label>
                      <input type="email" className="form-control" {...register("email")}
                      id="exampleInputEmail1"/>
                      <p className='error-message'>{errors.email?.message}</p>
                  </div>
                  <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">Senha</label>
                      <input type="password" className="form-control" {...register("password")}
                      id="exampleInputPassword1"/>
                      <p className='error-message'>{errors.password?.message}</p>
                  </div>
                  <button type="submit" className="btn btn-primary">entrar</button>
                </form>
          </div>
  </div>
}

export default UserLogin;
