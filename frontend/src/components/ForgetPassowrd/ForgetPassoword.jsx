import { useState } from "react";
import "./ForgetPassword.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPassoword = () => {
  const navigate = useNavigate()
  const [forgetPassword, setForgetPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const [otpData, setOtpData] = useState({
    email:"",
    otp: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (forgetPassword) {
      setOtpData({
        ...otpData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitCamp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/forget-password`,
        formData,
        { withCredentials: true }
      );
      console.log(response);
      toast.success("Email enviado com sucesso!");
      setForgetPassword(true);
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar o códico, certifique seu email digitado");
    }
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/reset-password`,
        {...otpData, email: formData.email},
        { withCredentials: true }
      );
      toast.success("Senha alterada com sucesso!");
      toast.success("Senha alterada com sucesso! Use sua nova senha para fazer login e acessar sua conta!")
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(
        "Erro ao alterar a senha, certifique seu email e tente novamente!"
      );
    }
  };

  return (
    <form
      onSubmit={forgetPassword ? submitNewPassword : submitCamp}
      className="container-forgetPass"
    >
      {!forgetPassword && (
        <>
          <label htmlFor="forgetPassword">Insira seu email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            id="forgetPassword"
            required
            placeholder="email"
            onChange={handleChange}
          />
          <button type="submit">Enviar</button>
        </>
      )}

      {forgetPassword === true && (
        <div className="container-msenha">
          <div className="container-sInput">

            <label id="labelOtp" htmlFor="otp">
              Insira o codico de verificação enviado ao seu email:
            </label>
            <input
              type="text"
              id="otp"
              required
              placeholder="seu códico aqui"
              name="otp"
              onChange={handleChange}
            />
          </div>

          <div className="container-sInput">
            <label htmlFor="password">Insira sua nova senha:</label>
            <input
              type="text"
              id="password"
              required
              placeholder="sua nova senha"
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="container-sInput">
            <label htmlFor="passwordConfirm">Confirme sua nova senha</label>
            <input
              type="text"
              id="passwordConfirm"
              required
              placeholder="senha"
              name="passwordConfirm"
              onChange={handleChange}
            />
          </div>
          <button id="b-senha" type="submit">Redefinir Senha</button>
        </div>
      )}
    </form>
  );
};

export default ForgetPassoword;
