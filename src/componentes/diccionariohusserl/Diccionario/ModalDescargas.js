import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/styles';

function ModalDescargas(props){
    <Modal 
    aria-labelledby="simple-modal-title"
    aria-describedby="simple-modal-description"
    >
        <Paper>
            <Grid container>
                <Grid item xs={11}>
                    <Typography>Descargar Consulta</Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton
                    aria-haspopup="true"
                    >
                        <ClearIcon/>
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Se genera un archivo con las siguientes especificaciones</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>Jerarquía</Typography>
                </Grid>
            </Grid>
        </Paper>
    </Modal>
}