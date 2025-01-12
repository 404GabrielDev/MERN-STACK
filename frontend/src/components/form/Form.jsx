import { useState } from "react";
import "./Form.css";
import axios from "axios";

const Form = () => {
  const [state, setState] = useState("Register");

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
  };

  return (
    <div>
      <div className="container-Tform">
        <h2>{state === "Register" ? "Criar conta" : "Logar"}</h2>
        <p>{state === "Register" ? "Crie sua conta" : "Logue na sua conta"}</p>
      </div>

      <form onSubmit={submitHandler}>
        {state === "Register" && (
          <div>
            <label>
              username:
              <input
                name="username"
                type="text"
                placeholder="username"
                required
                value={formData.username}
                onChange={handleChange}
              />
            </label>
          </div>
        )}

        <div>
          <label>
            email:
            <input
              name="email"
              type="text"
              placeholder="email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            password:
            <input
              name="password"
              type="password"
              placeholder="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <div>
          <label>
            Password Confirm:
            <input
              name="passwordConfirm"
              type="password"
              placeholder="Password Confirm"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>

        <p>Esqueceu a senha?</p>

        <button>{state}</button>

      </form>
    </div>
  );
};

export default Form;
