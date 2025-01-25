import { useState } from "react";
import "./Form.css";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import useAuth from "../AuthContext/useAuth";


const Form = ({setUsername}) => {
  console.log(setUsername)
  const navigate = useNavigate()
  const [state, setState] = useState("Registrar");
  const {setUser, loginUser, loading, setLoading} = useAuth()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const[dataLogin, setDataLogin] = useState({
    email:"",
    password:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    if(state === "Registrar") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (state === "login") {
      setDataLogin({
        ...dataLogin,
        [name]: value
      })
    }
    
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${state === "Registrar" ? "registrar" :"login"}`,
        state === "Registrar" ? formData : dataLogin,
        { withCredentials: true }
      );

      if(state === "Registrar") {
        toast.success("Conta criada com sucesso!")
        setState("login")
      } else {
        const {username, email, isVerified} = response.data.data

        setUsername(username);
        setUser({
          username,
          email,
        })

        loginUser(username, isVerified);
        toast.success("login realizado com sucesso!")

        if(!isVerified) {
          toast.info("Sua conta ainda não foi verificada.")
          navigate('/verifyAccount');
        } else {
          navigate('/')
        }

        
        
      }

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro desconhecido"
      console.log(error);
      toast.error(errorMessage)

    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="container-formPage">
      <div className="container-Tform">
        <h2>{state === "Registrar" ? "Criar conta" : "Logar"}</h2>
        <p>{state === "Registrar" ? "Crie sua conta" : "Logue na sua conta"}</p>
      </div>

      <form className="container-form" onSubmit={submitHandler}>
        {state === "Registrar" ? (
          <>
          <div className="container-inputs">
            <label htmlFor="username">
              Username:
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="username"
                required
                value={formData.username}
                onChange={handleChange}
              />
          </div>

          <div className="container-inputs">
          <label htmlFor="email">
            Email:
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          
        </div>

        <div className="container-inputs">
          <label htmlFor="password">
            Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          
        </div>

        <div className="container-inputs">
          <label htmlFor="passwordConfirm">
            Password Confirm:
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="Password Confirm"
              required
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
        </div>
          </>       
        ) : (
          <>
          <div className="container-inputs">
          <label htmlFor="email">
            Email:
            </label>
            <input
              id="email"
              name="email"
              type="text"
              placeholder="email"
              required
              value={dataLogin.email}
              onChange={handleChange}
            />
          
        </div>

        <div className="container-inputs">
          <label htmlFor="password">
            Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="password"
              required
              value={dataLogin.password}
              onChange={handleChange}
            />
          
        </div>
          </>
        )}

        <p className="p-forgetP"><Link to = '/forgetPassword' className="p-forgetP">Esqueceu a senha?</Link></p>

        <button disabled={loading} className="button-submit" type="submit">{loading ? 'Carregando...' : state}</button>

        {state === 'Registrar' ? (
        <p className="Red-form">Já tem uma conta?
            <span onClick={() => setState("login")}>Logue aqui!</span>
        </p>
      ): (
        <p className="Red-form">
          Não tem uma conta?
          <span onClick={() => setState("Registrar")}>Se Registre aqui!</span>
        </p>
      )}
      </form>
    </div>
  );
};

export default Form;
