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
import * as localStore from '../../../js/localStore';

//Language
import {noDerivaDe, noContieneExpresionesDerivadas, menuDerechoJerarquiaDerivadaDe, menuDerechoJerarquiaExpresionesDerivadas} from '../../../js/Language';

const ITEM_HEIGHT = 48;

function ListaPadresEscondidos(props){
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

    function fixReferenciasConsultadas(expresion){
        var referencia = {
            clave: expresion[0].clave,
            expresion: expresion[0].expresion_original,
            traduccion: expresion[0].expresion_traduccion,
            id: expresion[0].id,
            index_de: expresion[0].index_de,
            index_es: expresion[0].index_es,
            pretty_e: expresion[0].epretty,
            pretty_t: expresion[0].tpretty,
            referencias : []
        }
        referencia.referencias.push({
            referencia_original : expresion[0].ref_original,
            referencia_traduccion : expresion[0].ref_traduccion,
            refid : expresion[0].refid,
            orden: expresion[0].orden,
        })
        return referencia
    }

    function handleFlagLetraMain(){
        props.setFlagLetraMain(false)
        setTimeout(() => {
            if(document.getElementById("VP" + props.idExpresion) != null){
              document.getElementById("VP" + props.idExpresion).scrollIntoView()
            }
        }, 1000)
        var idExpresion = event.target.id.split("/")[0]
        var service = "/referencias/obtieneReferencias/" + idExpresion
        webService(service, "GET", {}, data => {
            var referencias = fixReferenciasConsultadas(data.data.response)
            console.log("referencias", referencias)
            if(localStore.getObjects("referenciasConsultadas")==false){
                var referenciasConsultadas = []
                referenciasConsultadas.push(referencias)
                localStore.setObjects("referenciasConsultadas",referenciasConsultadas)
            }else{
                var store = localStore.getObjects("referenciasConsultadas")
                store.push(referencias)
                localStore.setObjects("referenciasConsultadas",store)
            }
        })
    }

    return(
        <div>
            <li key={props.padre.refid+"-"+props.index}>
                <Grid container alignItems="center">
                    <Grid item xs={8}>
                        <Link to={`/husserl/pasaje/${props.padre.padre}`} onClick={()=>handleFlagLetraMain()}>
                            <Typography variant="h6" className="consultaDePasajes" id={props.padre.padre+"/"+props.index}>{props.padre.expresion}</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={4} onClick={handleClickDerivadaDe} id={"padre" + props.padre.padre} className="iconosAlineado">
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
                                <Typography id={padresPadre.padre+"/"+index}>{padresPadre.expresion}</Typography>
                            </Link>
                        </MenuItem>
                    )}
                    <Divider/>  
                    <MenuItem><b>{menuDerechoJerarquiaExpresionesDerivadas(props.lang)}</b></MenuItem>
                    <Divider/>                    
                    {hijosDePadres.length < 1 ? <MenuItem>{noContieneExpresionesDerivadas(props.lang)}</MenuItem> : hijosDePadres.map((hijosPadre,index)=>
                        <MenuItem onClick={handleCloseDerivadaDe} key={hijosPadre.id + "-" + index}>
                            <Link to={`/husserl/pasaje/${hijosPadre.hijo}`} onClick={()=>handleFlagLetraMain()}>
                                <Typography id={hijosPadre.hijo+"/"+index}>{hijosPadre.expresion}</Typography>
                            </Link>
                        </MenuItem>
                    )}
                    </Menu>
                </Grid>
            </li>
        </div>
    )
}

export default ListaPadresEscondidos;