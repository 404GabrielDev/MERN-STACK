import "./VerifyAccount.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const VerifyAccount = () => {
  const navigate = useNavigate();

  const [verify, setVerify] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const [formOtp, setFormOtp] = useState({
    email:"",
    otp:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(!verify) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormOtp({
        ...formOtp,
        [name]: value,
      })
    }
    
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${verify ? "verifyEmailAccount" : "sendOtpEmail"}`,
        verify === false ? formData : formOtp,
        { withCredentials: true }
      );
      if(verify === false) {
        toast.success("Códico enviado com sucesso ao seu email!");
        setVerify(true)
      } else {
        toast.success("Email Verificado com Sucesso!")
        navigate('/')
      }
      
        
    } catch (error) {
      console.log("houve um erro na requisição", error);
      toast.error("Erro ao enviar o códico, certifique seu email digitado");
    }
  };

  return (
    <form onSubmit={submitHandle} className="container-verifyAccount">
      {!verify && (
        <div className="container-sendOtp">
          <div>
            <h1>
              Verifique sua conta para obter acesso a mais informações e manter
              a segurança da sua conta!
            </h1>
            <p>Um codico de verificação será enviado ao seu email!</p>
          </div>

          <div className="container-inputEmail">
            <label htmlFor="sendEmail">Insira seu email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              id="sendEmail"
              required
              placeholder="email"
              onChange={handleChange}
            />
          </div>
        </div>
      )}

      {verify && (
        <>
          <form onSubmit={submitHandle} className="container-Verify">
            <div className="container-emailVerify">
            <p>Certifique de que está tudo correto!</p>
              <div className="emailVerify">
              <label htmlFor="verifyEmail">Confirmando Seu email</label>
              <input
                type="email"
                name="email"
                value={formOtp.email}
                id="verifyEmail"
                required
                placeholder="email"
                onChange={handleChange}
              />
              </div>
              
            </div>

            <div className="container-inputOtp">
              <label htmlFor="otp">
                Insira o codico que enviamos ao seu email:
              </label>
              <input
                type="text"
                name="otp"
                value={formOtp.otp}
                id="otp"
                required
                placeholder="codico"
                onChange={handleChange}
              />
            </div>
          </form>
        </>
      )}

      <button id="button-sendOtp" type="submit">
        Enviar
      </button>
    </form>
  );
};

export default VerifyAccount;
