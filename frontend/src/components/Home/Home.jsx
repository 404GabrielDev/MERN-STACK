import React from "react";
import useAuth from "../AuthContext/useAuth";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();

  return (
    <main className={`container-home ${!user ? 'wallpaper-new-user' : user.isVerified ? 'wallpaper-logged-in' : 'wallpaper-logged-out'}`}>
      {user ? (
        <div className="container-home-user">
          <section className="container-name-user">
            <p>Olá{user && <p>{user.username}</p>}</p>
          </section>

          <div className="container-title-user">
            <div>
              <h1>
                Bem-vindo ao futuro da inovação tecnológica! Explore novas
                possibilidades, conecte-se e transforme ideias em realidade.
              </h1>
            </div>
          </div>
          <div className="container-btt-journey">
              <h2>Preparado?</h2>
              <button>Começar Jornada</button>
            </div>
        </div>
      ) : (
        <div className="wlc-section">
          <div className="title-home">
            <h1>
              Olá, Visitante! O futuro da inovação tecnológica está ao seu
              alcance!
              <br />
              Faça Login ou registre-se para começar sua jornada, explorar novas
              possibilidades e transformar ideias em realidades
            </h1>
          </div>
          <section className="section-btt-form">
            <p>Se cadastre já! para receber novidades!</p>
            <div className="container-btt-home">
              <button>
                <Link className="button-Link" to="/form">Registrar ou Logar</Link>
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Home;
