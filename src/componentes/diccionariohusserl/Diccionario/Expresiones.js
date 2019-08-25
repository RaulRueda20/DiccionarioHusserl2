import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Expresiones(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        {props.expresiones.map(expresion=>(
            <ExpansionPanel  TransitionProps={{ unmountOnExit: true }}>
             <ExpansionPanelSummary
               expandIcon={<ExpandMoreIcon />}
               aria-controls="panel1a-content"
               id="panel1a-header"
             >
               <Typography className={classes.heading}>{expresion.expresion + "//" + expresion.traduccion}</Typography>
             </ExpansionPanelSummary>
             <ExpansionPanelDetails>
               <Typography>
                 {expresion.pretty_e + "//" + expresion.pretty_t}
               </Typography>
             </ExpansionPanelDetails>
           </ExpansionPanel>
        ))}
    </div>
  );
}