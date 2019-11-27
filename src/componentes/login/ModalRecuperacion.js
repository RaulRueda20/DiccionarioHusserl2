import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';

import {modalRecuperacionContra, modalIngresarCorreo, email, ingresar, exitoBody, correoNoEncontrado} from '../../js/Language';

import * as localStore from '../../js/localStore';
import {loginService} from '../../js/webServices';

const modalRecuperacion={
    modalinR:{
        width: "40%",
        maxHeight:"75vh",
        left: "25vw",
        top: "25.5vh",
        position:"absolute",
        padding: "30px 30px",
    },
    campoDeTexto:{
        width: "100%"
    },
    botonClear:{
        left:"18px",
        bottom:"15px",
        size:"small"
    },
    botonRecuperar:{
        top:"12px"
    },
    gridDelBoton:{
        textAlign: "right"
    }
}

var setStore = (user, pass) => {
    var newSession = {"user" : user, "password" : pass}
    newSession['ultimasVisitadas'] = []
    newSession["ultimaVisitada"] = "alfabeto"
    localStore.setObjects("sesion", newSession)
}

function ModalRecuperacion(props){
    const {classes}=props;
    const [correoRecuperado, setCorreoRecuperado]=React.useState("")

    function onFormSubmit1(event){
        event.preventDefault();
        props.setLoading(true)
        var email = correoRecuperado
        var service = "/login/recoverPassword/es?email=" + email
        loginService(service, "GET", {}, (data) => {
            props.setLoading(false)
            if(data.response){
                props.setSnackbar({open:true,variant:"success",message:exitoBody(props.lang)})
                setStore(data.response, email.correo)
            }else{
                props.setSnackbar({open:true,variant:"error",message:correoNoEncontrado(props.lang)})
            }
        })
    }

    function handleClose(){
        props.setRecuperarContra(false)
    }

    return(
        <div>
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={props.recuperarContra}
            onClose={handleClose}
            >
                <Paper className={classes.modalinR}>
                    <form onSubmit={onFormSubmit1}>
                        <Grid container>
                            <Grid item xs={11}>
                                <Typography variant="h4">
                                    {modalRecuperacionContra(props.lang)}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton
                                aria-haspopup="true"
                                onClick={handleClose}
                                className={classes.botonClear}
                                >
                                    <ClearIcon fontSize="small"/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className="divisor"/>
                                <Typography variant="h5">
                                    {modalIngresarCorreo(props.lang)}
                                </Typography>
                                <TextField
                                    label={email(props.lang)}
                                    // variant="outlined"
                                    id="custom-css-outlined-input"
                                    margin="normal"
                                    value={correoRecuperado}
                                    onChange={e => setCorreoRecuperado(e.target.value)}
                                    type = "email"
                                    className={classes.campoDeTexto}
                                />
                            </Grid>
                            <Grid item={6} className={classes.gridDelBoton}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    size="small"
                                    className={classes.botonRecuperar}
                                >
                                    {ingresar(props.lang)}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Modal>
        </div>
    )
}

export default withStyles(modalRecuperacion)(ModalRecuperacion);