import  React from 'react';
import {Link} from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import '../../../css/expresiones.css';

export default function PanelExpresionIzquierdo(props){
    const [open, setOpen] = React.useState(false)

  return (
    <li 
        className={classNames([{"pasajeSeleccionado":props.expresion.id==props.idExpresion}, "sideListIzquierdo"])} 
        key={props.expresion.id} 
        id={"VP"+props.expresion.id} value={props.expresion.id}
    >
        <Grid container justify="center" alignItems="center">
            <Grid item xs={10} id={props.expresion.id} onClick={props.clickHandleVista}>
                <Link to={`/husserl/pasaje/${props.expresion.id}/${props.expresion.referencias[0].refid}`}>
                    <p className={"parrafo"}>{props.expresion.expresion + '//' + props.expresion.traduccion}</p>
                </Link>
            </Grid>
            <Grid item id={props.expresion.id} xs={2} onClick={()=>setOpen(!open)}>
                {open==false ?
                <Icon className="iconosIluminados">
                    <ExpandMoreIcon/>
                </Icon> :
                <Icon className="iconosIluminados">
                    <ExpandLessIcon/>
                </Icon>
            }
            </Grid>
        </Grid>
        <div>
            {open ?
                <ul key={props.expresion.id} id={"referencias"+props.expresion.id} className="ulDelPanelDeExpresiones">
                    {props.expresion.referencias.map(referencia =>(
                        <li>
                            <Typography variant="h6" className={classNames([{"remarcadoDeReferencias" : referencia.orden==1}])}>
                            <Link to={`/husserl/pasaje/${props.expresion.id}/${props.expresion.referencias[0].refid}`} className="consultaDePasajes">{referencia.referencia_original + "    //    " + referencia.referencia_traduccion}</Link>
                            </Typography>
                        </li>
                    ))}
                </ul>
                :null
            }
        </div>
    </li>
  );
}