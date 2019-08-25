import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/styles';

const styles = {
  TextFieldbus:{
     width:"100%"
    }
  }

function MenuDerecho(props){
  const {classes}=props;

  return (
    <div>
      <FormControl classname={classes.TextFieldbus}>
        <InputLabel htmlFor="input-with-icon-adornment">Busqueda por letra</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Jerarquía</Typography>
          </ExpansionPanelSummary>
          <Divider />
          <ExpansionPanelDetails>
            <Typography>Derivada de:</Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelDetails>
            <Typography>Expresión:</Typography>
          </ExpansionPanelDetails>
          <Divider />
          <ExpansionPanelDetails>
            <Typography>Expresiones derivadas:</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
          >
          <Typography>Referencias consultadas:</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
          </ExpansionPanelDetails>
        </ExpansionPanel>
    </div>
  )
}

export default  withStyles(styles)(MenuDerecho);
