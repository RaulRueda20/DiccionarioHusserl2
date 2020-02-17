import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import {cintilla, guia} from '../../../js/Language';

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
        message={<span id="snackbar-fab-message-id">{cintilla(props.lang)}<Link to={`/husserl/guia`}>  {guia(props.lang)}</Link></span>}
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