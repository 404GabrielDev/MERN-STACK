import { useState } from "react";
import "./ForgetPassword.css";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios'

const ForgetPassoword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const submitCamp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/forget-password`,
        formData,
        {withCredentials: true}
      );
      console.log(response)
      toast.success("Email enviado com sucesso!")
    } catch (error) {
      console.log(error)
      toast.error("Erro ao enviar o códico, certifique seu email digitado")
    }
  }

  return (
    <form onSubmit={submitCamp} className="container-forgetPass">
      <label htmlFor="forgetPassword">Insira seu email:</label>
      <input type="email" name="email" value={formData.email} id="forgetPassword" required placeholder="email" onChange={handleChange}/>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ForgetPassoword;
