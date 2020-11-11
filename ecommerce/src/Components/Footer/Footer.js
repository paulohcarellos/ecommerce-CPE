import React from "react";
import "./Footer.css"

function Footer(){
  return (
    <div id="footerInteiro">
        <div id="footerUp">
          <div id="descriçao">
            <h3>O projeto:</h3>
            O Coetus 3 foi fruto de um desafio proposto pela CPEJr ao grupo 3 do Trainee da EJ. Feito com muito suor, carinho e empolgação!

          </div>
          <div id="linksCPE">
            <h3>CPEJr:</h3>
            <a href="https://www.instagram.com/cpe.jr/">Instagram</a>
            <a href="https://www.linkedin.com/company/cpe-jr">Linkedin</a>
            <a href="https://www.facebook.com/cpejr">Facebook</a>
            <a href="https://cpejr.com.br/site/">Site</a>

          </div>
          <div id="linksDevs">
            <h3>Desenvolvedores:</h3>
            <a href="https://www.instagram.com/helioneto29/">João Menezes</a>
            <a href="https://www.instagram.com/paulohcarellos/">Paulo Carellas</a>
            <a href="https://www.instagram.com/joaop.mm/">Helio Neto</a>
            <a href="https://www.instagram.com/klayor/">Kaio Amaral</a>

          </div>

        </div>

        <div id="footerDown">
          <h5>© 2020 Copyright:</h5>
          <a className="ml-2" href="https://cpejr.com.br/site/"> TraineesCPEjr.com</a>
          
        </div>
    </div>
  );
}

export default Footer;