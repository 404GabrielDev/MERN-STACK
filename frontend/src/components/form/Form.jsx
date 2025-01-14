import { useState } from "react";
import "./Form.css";
import axios from "axios";
import {ToastContainer, toast} from 'react-toastify';


const Form = () => {
  const [state, setState] = useState("Registrar");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/registrar`,
        formData,
        { withCredentials: true }
      );
      const user = response.data;
      toast.success("Conta criada com sucesso!")

    } catch (error) {
      console.log(error);
      toast.error("Erro ao criar conta. Tente novamente!")
    }
  };

  return (
    <div className="container-formPage">
      <div className="container-Tform">
        <ToastContainer />
        <h2>{state === "Registrar" ? "Criar conta" : "Logar"}</h2>
        <p>{state === "Registrar" ? "Crie sua conta" : "Logue na sua conta"}</p>
      </div>

      <form className="container-form" onSubmit={submitHandler}>
        {state === "Registrar" && (
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
        )}

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

        <p className="p-forgetP">Esqueceu a senha?</p>

        <button className="button-submit" type="submit">{state}</button>
      </form>
      {state === 'Registrar' ? (
        <p className="Red-form">Já tem uma conta?
            <span onClick={() => setState("Login")}>Logue aqui!</span>
        </p>
      ): (
        <p className="Red-form">
          Não tem uma conta?
          <span onClick={() => setState("Registrar")}>Se Registre aqui!</span>
        </p>
      )}
    </div>
  );
};

export default Form;
