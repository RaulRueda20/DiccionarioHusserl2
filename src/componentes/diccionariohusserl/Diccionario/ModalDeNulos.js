import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/styles';

const modalNul={
    modalinN:{
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

function ModalDeNulos(props){
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
            <Paper className={classes.modalinN}>
                <Grid container alignContent="center" alignItems="center">
                    <Grid item xs={11}>
                        <Typography variant="h4">
                            No contiene pasajes
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
                            No hay ninguna referencia para esta expresión. Ver por favor la lista de expresiones derivadas.
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}

export default withStyles(modalNul)(ModalDeNulos);