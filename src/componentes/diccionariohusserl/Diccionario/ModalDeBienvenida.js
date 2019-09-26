import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const modalBienvenida={
    modalinB:{
        width: "50%",
        maxHeight:"75vh",
        top: "25.5vh",
        position:"absolute",
        padding: "30px 30px",
        overflowY: "auto",
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

function ModalDeBienvenida(props){
    const {classes}=props;

    function clickHandleCloseModal(){
        props.setOpenModal(false)
    }

    return(
        <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.openModal}
        >
            <Paper className={classes.modalinB}>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography variant="h4">
                            Bienvenido
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
                            Si esta es tu primera vez que utiliza el diccionario, será conveniente que visite nuestra guía.
                        </Typography>
                    </Grid>
                    <Divider/>
                    <Grid item xs={12} className={classes.gridDelBoton}>
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.botonAceptar}
                        onClick={clickHandleCloseModal}
                        >
                            Aceptar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}

export default withStyles(modalBienvenida)(ModalDeBienvenida)