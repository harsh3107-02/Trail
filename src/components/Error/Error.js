import React from "react";
import logo from "../../assets/beer.png";
import Error from '../../assets/icons8-error-100.png'
import "./Error.css";
import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
    const err=useRouteError();
  return (
    <div className="Error_container">
      
      <img alt="Logo" className="logo" src={Error}/>
      <h1>{err.status+":" +err.statusText}</h1>
      <h1>Oops! Something went wrong.</h1>
      
      <p>
        We're sorry, but it seems there was an error. Please try again later.
      </p>
      <Link to="/"><img alt="Logo" className="logo" src={logo}/></Link>
    </div>
  );
}

export default ErrorPage;
