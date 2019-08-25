import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';

import Alerts from '../Alerts';
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

class LoginForm extends React.Component {
  constructor(props){
    super(props)
  }
  // static contextType  = LanguageContext;

  state={  correo:'', password:'', alert : false, mensajeAlert : "", tituloAlert: "", loading : false}

   onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({loading : true})
    var service = "/login/usuario"
    var params = JSON.stringify({'userId' : this.state.correo, 'password' : this.state.password})
    loginService(service, "POST", params, (data) => {
      console.log(data)
      if(data.data.error){
          this.setState({mensajeAlert : data.data.error, alert : true, tituloAlert:"Alerta"})
      }else{
          setStore(data.response, this.state.password)
          document.getElementById("toMain").click()
      }
      this.setState({loading : false})
    })
  }

  handleAlertClose = () => {
    this.setState({alert:false})
  }

  componentDidMount = () =>{
    if(localStore.getObjects("sesion")) document.getElementById("toMain").click()
  }


  render(){
    const{ correo, password } = this.state
    const { classes } = this.props;

    return (
      <form onSubmit={this.onFormSubmit}>
        <Typography variant="h3" align="center" gutterBottom >
          Inicio
        </Typography>
        <Grid className="gridsF" container direction="column" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={8} lg={7} className="grids">
            <TextField
              label="Correo"
              // variant="outlined"
              id="custom-css-outlined-input"
              margin="normal"
              value={this.state.correo}
              onChange={e => this.setState({correo: e.target.value})}
              className={classes.TextField1}
              type="email"
            />
          </Grid>
          <Grid item xs={12} sm={8} lg={7} className="grids">
            <TextField
              label="Contraseña"
              // variant="outlined"
              id="custom-css-outlined-input"
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
              className={classes.TextField2}
              type = "password"
            />
          </Grid>
          {/* <Modals/> */}
          <Grid item xs={12} sm={8} lg={7} className="grids">
            <Grid container justify="flex-end" className="grids">
              <Grid item>
                <Button
                  onClick={this.onSubmitRegistre}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                Ingresar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8} lg={7}>
            <Typography variant = "h4">
              Si no está registrado, registrarse<a href="#" onClick={() => this.props.setLogin(false) }> Aqui</a>
            </Typography>
          </Grid>
        </Grid>
        <Alerts lang={this.props.lang} mensaje={this.state.mensajeAlert} open={this.state.alert} handleClose={this.handleAlertClose} titulo={this.state.tituloAlert}/>
        <LinearProgress className={classNames([{"hidden" : !this.state.loading}, "loadingBar"])}/>
        <Link id="toMain" to="/husserl"/>
      </form>
    )
  }
};

export default withStyles(stylesFor)(LoginForm);
