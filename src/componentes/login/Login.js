import React from 'react';

import LoginForm from './LoginForm';
import RegistroForm from './RegistroForm';
import Header from './Header';
import Footer from './Footer';

import { withStyles } from '@material-ui/styles';

import fondo from "../../Imagenes/fondo.jpeg";

const loGin ={
  back: {
    backgroundImage: `url(${fondo})`,
    position : "fixed",
    zIndex : -1,
    height : "100vh",
    width : "100vw",
    opacity: 0.45,
    top: 0
  }
}

function Login(props){
  const [login, setLogin] = React.useState(true)
  const {classes} = props
  return(
    <div>
      <div className={classes.back}/>
      <Header lang={props.lang} setLang={props.setLang}/>
      {login ? <LoginForm lang={props.lang} setLang={props.setLang} setLogin={setLogin}/> : <RegistroForm lang={props.lang} setLang={props.setLang} setLogin={setLogin}/>}
      <br/>
      <Footer lang={props.lang}/>
    </div>
  )
}

export default withStyles(loGin)(Login);