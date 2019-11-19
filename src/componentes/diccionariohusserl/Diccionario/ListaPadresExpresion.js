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

//Language
import {noDerivaDe, noContieneExpresionesDerivadas, menuDerechoJerarquiaDerivadaDe, menuDerechoJerarquiaExpresionesDerivadas} from '../../../js/Language';

const ITEM_HEIGHT = 48;

function ListaPadresExpresion(props){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [padreDePadres,setPadreDePadres]=React.useState([]);
    const [hijosDePadres,setHijosDePadres]=React.useState([]);

    const handleClickDerivadaDe = event => {
        setAnchorEl(event.currentTarget);
        var pid = event.currentTarget.id.split("padre")[1]
        webService(("/expresiones/"+props.language+"/abuelosList/"+pid),"GET", {}, (data2) => {
          setPadreDePadres(data2.data.response)
        })
        webService(("/expresiones/"+props.language+"/hijosList/"+pid),"GET", {}, (data) => {
          setHijosDePadres(data.data.response)
        })
      };
    
    const handleCloseDerivadaDe = () => {
    setAnchorEl(null);
    };

    function handleFlagLetraMain(){
        props.setFlagLetraMain(false)
    }

    return(
        <div>
            <li key={props.padre.refid+"-"+props.index}>
                <Grid container alignItems="center">
                    <Grid item xs={8}>
                        <Link to={`/husserl/pasaje/${props.padre.padre}`} onClick={()=>handleFlagLetraMain()}>
                            <Typography variant="h6" className="consultaDePasajes">{props.padre.expresion}</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={4} onClick={handleClickDerivadaDe} id={"padre" + props.padre.padre}>
                    <Icon className="iconosIluminadosPasaje">
                        <Jerarquia className="iconoJerarquiaPasajes"/>
                    </Icon>
                    </Grid>
                    <Menu
                    id="long-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={open}
                    onClose={handleCloseDerivadaDe}
                    PaperProps={{
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: 400,
                        },
                    }}
                    >
                    <MenuItem><b>{menuDerechoJerarquiaDerivadaDe(props.lang)}</b></MenuItem>
                    <Divider/>
                    {padreDePadres.length < 1 ? <MenuItem>{noDerivaDe(props.lang)}</MenuItem> : padreDePadres.map((padresPadre,index)=>
                        <MenuItem onClick={handleCloseDerivadaDe} key={padresPadre.id + "-" + index}>
                            <Link to={`/husserl/pasaje/${padresPadre.padre}`} onClick={()=>handleFlagLetraMain()}>
                                <Typography>{padresPadre.expresion}</Typography>
                            </Link>
                        </MenuItem>
                    )}
                    <Divider/>  
                    <MenuItem><b>{menuDerechoJerarquiaExpresionesDerivadas(props.lang)}</b></MenuItem>
                    <Divider/>                    
                    {hijosDePadres.length < 1 ? <MenuItem>{noContieneExpresionesDerivadas(props.lang)}</MenuItem> : hijosDePadres.map((HijosPadre,index)=>
                        <MenuItem onClick={handleCloseDerivadaDe} key={hijosDePadres.id + "-" + index}>
                            <Link to={`/husserl/pasaje/${HijosPadre.hijo}`} onClick={()=>handleFlagLetraMain()}>
                                <Typography>{HijosPadre.expresion}</Typography>
                            </Link>
                        </MenuItem>
                    )}
                    </Menu>
                </Grid>
            </li>
        </div>
    )
}

export default ListaPadresExpresion;