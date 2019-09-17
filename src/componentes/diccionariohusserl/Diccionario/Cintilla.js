import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import ClearIcon from '@material-ui/icons/Clear';
import { width } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  // '@global': {
  //   body: {
  //     backgroundColor: theme.palette.background.paper,
  //   },
  // },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // fab: {
  //   position: 'absolute',
  //   bottom: theme.spacing(2),
  //   right: theme.spacing(2),
  // },
  snackbar: {
    width: "100% !important",
    left: 0,
    right:0, 
    transform: "none"
  },
}));

export default function Cintilla(props) {
  const classes = useStyles();

  function handleClose(event,reason){
    props.setOpen(false)
  }

  return (
    <React.Fragment>
      <Snackbar
        open={props.open}
        onClose={event => handleClose(event, "clickaway")}
        ContentProps={{
          'aria-describedby': 'snackbar-fab-message-id',
        }}
        message={<span id="snackbar-fab-message-id">¡Advertencia! Los pasajes en español de Ideas I están en proceso de sustitución: la versión de José Gaos (1962) se reemplaza por la versión de Zirión (2013). Ver los detalles en la Guía.</span>}
        // action={
        //   <IconButton color="inherit">
        //     <ClearIcon fontSize="small"/>
        //   </IconButton>
        // }
        className={classes.snackbar}
      />
    </React.Fragment>
  );
}