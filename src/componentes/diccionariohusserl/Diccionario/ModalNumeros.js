// React
import React from 'react';

// Components
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/styles';

//Language
import {tituloNumeros, mensajeNumeros} from '../../../js/Language';

const modalNumeros={
    modalinb:{
        width: "50%",
        maxHeight:"75vh",
        top: "35.5vh",
        position:"absolute",
        padding: "20px 20px",
        left: "calc(25% - 30px)"
    },
    botonClear:{
        bottom:"15px",
        size:"small"
    },
    botonAceptar:{
        top:"18px"
    },
    gridDelBoton:{
        textAlign: "right"
    },
    gridDelTypo:{
        textAlign: "center"
    }
}

function ModalNumeros(props){
    const {classes}=props;

    function clickHandleCloseModal(){
        props.setModalNumeros(false)
    }

    return(
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.modalNumeros}
        >
            <Paper className={classes.modalinb}>
                <Grid container alignContent="center" alignItems="center">
                    <Grid item xs={11}>
                        <Typography variant="h4">
                            {tituloNumeros(props.lang)}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                        aria-haspopup="true"
                        onClick={clickHandleCloseModal}
                        >
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12} className={classes.gridDelTypo}>
                        <Typography variant="h5">
                            {mensajeNumeros(props.lang)}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}

export default withStyles (modalNumeros)(ModalNumeros);