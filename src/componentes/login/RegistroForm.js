import React from 'react';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';

import {registro, nombre, apellido, escuela, puesto, pais, email, contra, comprobacionContra, ingresar, registrado, aqui} from '../../js/Language';

import Snackbars from './Snackbars';
import Alerts from '../Alerts';

import {loginService} from '../../js/webServices';
import * as localStore from '../../js/localStore';

const stylesReg = {
  TextField1:{
    justify: 'center',
    width:"100%",

  },
  TextField2:{
    justify: 'center',
    width:"100%",
  }
}

var setStore = (user, pass) => {
    var newSession = {"user" : user, "password" : pass}
    newSession['ultimasVisitadas'] = []
    newSession["ultimaVisitada"] = "alfabeto"
    localStore.setObjects("sesion", newSession)
}

function RegistroForm(props){
  const { classes }=props;
  const [nuevoNombre,setNuevoNombre]=React.useState("");
  const [nuevoApellido, setNuevoApellido]=React.useState("");
  const [nuevaEscuela,setNuevaEscuela]=React.useState("");
  const [nuevoPuesto, setNuevoPuesto]=React.useState("");
  const [nuevoPais, setNuevoPais]=React.useState("");
  const [nuevoCorreo, setNuevoCorreo]=React.useState("");
  const [nuevoPassword, setNuevoPassword]=React.useState("");
  const [repassword, setRepassword]=React.useState("");
  const [mensajeDeAlerta, setMensajeDeAlerta]=React.useState({open:false,mensaje:"", tituloAlerta:""});
  const [loading, setLoading]=React.useState(false);

  function onFormSubmit(event){
    event.preventDefault();
    setLoading(true)
      var params = {
      'nombre' : nuevoNombre,
      'apellidos' : nuevoApellido,
      'email' : nuevoCorreo,
      'institucion' : nuevaEscuela,
      'grado' : nuevoPuesto,
      'pais' : nuevoPais,
      'password' : nuevoPassword
    }
    if(params.password == repassword){
      var service = "/login/registrar"
      loginService(service, "POST", JSON.stringify(params), (data) => {
        console.log("error",data.error)
        if(data.data.status == 200){
          var serviceh = "/login/sendRegistroEmail/" + localStore.getItem("es")
          loginService(serviceh, "GET", {"nombre" : params.nombre,"email" : params.email,"pass" : params.password}, (data) => {
            console.log("data", JSON.parse(data.config.data))
            setMensajeDeAlerta({mensaje : "Operación Exitosa", open : true, tituloAlerta:"Operación Concluida con Exito"})
            setStore(params.email, params.password)
          })
        }else if(data.data.status == 501){
          setMensajeDeAlerta({mensaje : "El correo ya se encuentra registrado", open : true, tituloAlerta:"Alerta de Error"})
        }else if(data.data.status == 500){
          setMensajeDeAlerta({mensaje : "Hubo Un Error El Enviar El Correo De Notificación", open : true, tituloAlerta:"Alerta de Error"})
        }
      })
    }else{
      setMensajeDeAlerta({mensaje : "El password no coincide", open : true, tituloAlerta:"Alerta de Error"})
    }
    setLoading(false)
  }

  function handleAlertClose(){
    setMensajeDeAlerta({open:false,mensaje:mensajeDeAlerta.mensaje, tituloAlerta:mensajeDeAlerta.tituloAlerta})
  }

  return (
    <form onSubmit={onFormSubmit}>
      <Typography variant="h3" align="center" gutterBottom >
        {registro(props.lang)}
      </Typography>
      <Grid className="gridsF" container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label={nombre(props.lang)}
            id="custom-css-outlined-input"
            margin="normal"
            value={nuevoNombre}
            onChange={e => setNuevoNombre(e.target.value)}
            className={classes.TextField1}
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label={apellido(props.lang)}
            id="custom-css-outlined-input"
            value={nuevoApellido}
            onChange={e => setNuevoApellido(e.target.value)}
            className={classes.TextField2}
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label={escuela(props.lang)}
            id="custom-css-outlined-input"
            value={nuevaEscuela}
            onChange={e =>setNuevaEscuela(e.target.value)}
            className={classes.TextField2}
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label={puesto(props.lang)}
            id="custom-css-outlined-input"
            value={nuevoPuesto}
            onChange={e => setNuevoPuesto(e.target.value)}
            className={classes.TextField2}
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label={pais(props.lang)}
            id="custom-css-outlined-input"
            value={nuevoPais}
            onChange={e => setNuevoPais(e.target.value)}
            className={classes.TextField2}
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label={email(props.lang)}
            id="custom-css-outlined-input"
            value={nuevoCorreo}
            onChange={e => setNuevoCorreo(e.target.value)}
            className={classes.TextField2}
            type = "email"
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label={contra(props.lang)}
            id="custom-css-outlined-input"
            value={nuevoPassword}
            onChange={e => setNuevoPassword(e.target.value)}
            className={classes.TextField2}
            type = "password"
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label={comprobacionContra(props.lang)}
            id="custom-css-outlined-input"
            value={repassword}
            onChange={e => setRepassword(e.target.value)}
            className={classes.TextField2}
            type = "password"
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <Grid container justify="flex-end" className="grids">
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                className={classes.boton}
                type="submit"
              >
                {ingresar(props.lang)}
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={8} lg={7}>
          <Typography variant = "h4">
            {registrado(props.lang)} <a href="#" onClick={() =>props.setLogin(true)}> {aqui(props.lang)} </a>
          </Typography>
        </Grid>
      </Grid>
      <Alerts mensaje={mensajeDeAlerta.mensaje} open={mensajeDeAlerta.open} handleClose={handleAlertClose} titulo={mensajeDeAlerta.tituloAlerta}/>
      <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
    </form>
  )
}

export default withStyles(stylesReg)(RegistroForm);

