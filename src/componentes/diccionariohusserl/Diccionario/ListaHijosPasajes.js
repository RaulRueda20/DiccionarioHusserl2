// React
import React from 'react';
import {Link} from 'react-router-dom';

// Elements
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Jerarquia from '@material-ui/icons/DeviceHub';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// Other req
import {webService} from '../../../js/webServices';

const ITEM_HEIGHT = 48;

function ListaHijosPasajes(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [padreDeHijos,setPadreDeHijos]=React.useState([]);
    const [hijosDeHijos,setHijosDeHijos]=React.useState([]);  

    const handleClickExpresionesDerivadas = event =>{
        setAnchorEl(event.currentTarget)
        var hid = event.currentTarget.id.split("hijo")[1]
        webService(("/expresiones/"+props.language+"/abuelosList/"+hid),"GET", {}, (data2) => {
          setPadreDeHijos(data2.data.response)
          console.log("idPa",data2.data.response)
        })
        webService(("/expresiones/"+props.language+"/hijosList/"+hid),"GET", {}, (data) => {
          setHijosDeHijos(data.data.response)
        })
      }
    
      const handleCloseExpresionesDerivadas = () => {
        setAnchorEl(null);
      };

    return(
        <div>
            <li key={props.hijo.refid+"-"+props.index}>
                <Grid container alignItems="center">
                    <Grid item xs={8}>
                        <Link to={`/husserl/pasaje/${props.hijo.hijo}`}>
                            <Typography variant="h6" className="consultaDePasajes">{props.hijo.expresion}</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={4}>
                    <Icon className="iconosIluminadosPasaje" id={"hijo" + props.hijo.hijo} onClick={handleClickExpresionesDerivadas}>
                        <Jerarquia className="iconoJerarquiaPasajes"/>
                    </Icon>
                    </Grid>
                    <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleCloseExpresionesDerivadas}
                    PaperProps={{
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 400,
                        },
                    }}
                    >
                    <MenuItem><b>Deriva De:</b></MenuItem>
                    <Divider/>
                    {padreDeHijos.length < 1 ?  <MenuItem>No deriva de ninguna expresión.</MenuItem> : padreDeHijos.map((padresHijo,index)=>
                        <MenuItem onClick={handleCloseExpresionesDerivadas} key={padresHijo.id + "-" + index}>
                            <Link to={`/husserl/pasaje/${padresHijo.padre}`}>
                                <Typography>{padresHijo.expresion}</Typography>
                            </Link>
                        </MenuItem>
                    )}
                    <Divider/>
                    <MenuItem><b>Expresiones Derivadas:</b></MenuItem>
                    <Divider/>
                    {hijosDeHijos.length < 1 ? <MenuItem>No contiene ninguna expresión derivada.</MenuItem>: hijosDeHijos.map((hijosHijo,index)=>
                        <MenuItem onClick={handleCloseExpresionesDerivadas} key={hijosHijo.id + "-" + index}>
                            <Link to={`/husserl/pasaje/${hijosHijo.hijo}`}>
                                <Typography>{hijosDeHijos.expresion}</Typography>
                            </Link>
                        </MenuItem>
                    )}
                    </Menu>
                </Grid>
            </li>
        </div>
    )
}

export default ListaHijosPasajes;