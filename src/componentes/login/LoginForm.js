import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';

import {inicio, email, contra, ingresar, olvidoDeContra, registrarse, aqui, correoInvalido} from '../../js/Language';

import Snackbars from './Snackbars';
import ModalRecuperacion from './ModalRecuperacion';
import {loginService} from '../../js/webServices';
import * as localStore from '../../js/localStore';

const stylesFor = {
 TextField1:{
    justify: 'center',
    width:"100%",
   },
  TextField2:{
     justify: 'center',
     width:"100%",
  },
  gridsF : {
    margin: "7.5vh 2.5vw"
  }
 }

var setStore = (user, pass) => {
    var newSession = {"user" : user, "password" : pass}
    newSession['ultimasVisitadas'] = []
    newSession["ultimaVisitada"] = "alfabeto"
    localStore.setObjects("sesion", newSession)
    document.getElementById("toMain").click()
    // linkTo("main.html")
}

function LoginForm (props){
  const {classes}=props;
  const [correo, setCorreo]=React.useState("");
  const [password, setPassword]=React.useState("");
  const [snackbar, setSnackbar]=React.useState({open:false, variant:"", message:""});
  const [loading, setLoading]=React.useState(false);
  const [recuperarContra,setRecuperarContra]=React.useState(false);

  var lang=props.lang;

   function onFormSubmit(event){
    event.preventDefault();
    setLoading(true)
    var service = "/login/usuario"
    var params = JSON.stringify({'userId' : correo, 'password' : password})
    loginService(service, "POST", params, (data) => {
      console.log("login",data)
      if(data.data.error){
        setSnackbar({open:true,variant:"error",message:correoInvalido(props.lang)})
      }else{
          setStore(data.response, password)
          // document.getElementById("toMain").click()
      }
      setLoading(false)
    })
  }

  function handleClickModal(){
    setRecuperarContra(true)
  }

  React.useEffect(()=>{
    if(localStore.getObjects("sesion")) document.getElementById("toMain").click()
  }, [])

  const handleClose=(event,reason)=>{
    console.log("ajajhdsksjd")
    console.log(reason)
    // if (reason==='clickaway'){
    //     return;
    // }
    setSnackbar({open:false,variant:snackbar.variant,message:""})
  }

  return (
    <div>
      <Typography variant="h3" align="center" gutterBottom >
        {inicio(props.lang)}
      </Typography>
      <form onSubmit={onFormSubmit} style={{marginTop : "5%"}}>
        <Grid className="gridsF" container direction="column" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={8} lg={7} className="grids">
            <TextField
              label={email(props.lang)}
              // variant="outlined"
              id="custom-css-outlined-input"
              margin="normal"
              value={correo}
              onChange={e => setCorreo(e.target.value)}
              className={classes.TextField1}
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={8} lg={7} className="grids">
            <TextField
              label={contra(props.lang)}
              // variant="outlined"
              id="custom-css-outlined-input"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={classes.TextField2}
              type = "password"
            />
          </Grid>
          <Grid item xs={12} sm={8} lg={7} className="grids">
            <Grid container justify="flex-end" className="grids">
              <Grid item>
                <Button
                  // onClick={onSubmitRegistre}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                {ingresar(props.lang)}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={8} lg={7}>
            <Typography variant = "h4">
              {olvidoDeContra(props.lang)} <a onClick={handleClickModal} className="links">{aqui(props.lang)}</a>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8} lg={7}>
            <Typography variant = "h4">
              {registrarse(props.lang)}<a href="#" onClick={() =>props.setLogin(false)} className="links"> {aqui(props.lang)}</a>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <ModalRecuperacion recuperarContra={recuperarContra} setRecuperarContra={setRecuperarContra} loading={loading} 
      setLoading={setLoading} setSnackbar={setSnackbar} lang={props.lang}
        />
      <Snackbars snackbar={snackbar} handleClose={handleClose} lang={props.lang}/>
      <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
      <Link id="toMain" to="/husserl"/> 
    </div>
  )
};

export default withStyles(stylesFor)(LoginForm);
