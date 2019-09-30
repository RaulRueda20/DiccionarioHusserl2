import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/styles';

import {webService} from '../../../js/webServices';

const modalDescargas={
    modalinDescarga:{
        width: "50%",
        maxHeight:"75vh",
        top: "15.5vh",
        position:"absolute",
        padding: "30px 30px",
        overflowY: "auto",
        left: "calc(25% - 30px)"
    },
    gridDeBotones:{
        textAlign: "right",
    },
    // botonDescargar:{
    //     color:"primary !important"
    // },
    // gridDelBoton:{
    //     textAlign: "right"
    // },
    // gridDelTypo:{
    //     textAlign: "center"
    // }
}


function ModalDescargas(props){
    const {classes}=props;
    const [checkedA,setCheckedA] =React.useState(false)
    const [checkedB,setCheckedB] =React.useState(false)
    const [checkedC,setCheckedC] =React.useState(false)
    const [value, setValue] = React.useState('Texto')

    const handleChangeA=name=>event=>{
        setCheckedA({...checkedA, [name]:event.target.checked})
    };

    const handleChangeB=name=>event=>{
        setCheckedB({...checkedB, [name]:event.target.checked})
    };

    const handleChangeC=name=>event=>{
        setCheckedC({...checkedC, [name]:event.target.checked})
    };

    const handleChangeRadio=event=>{
        setValue(event.target.value)
    };

    function closeDescargas(){
        props.setOpenDescargas(false)
    }

    function clickHandleDescarga(){
        var opciones = [0,0,0,0]
        checkedB ? opciones.push(1) : opciones.push(0)
        checkedC ? opciones.push(1) : opciones.push(0)
        checkedA ? opciones.push(1) : opciones.push(0)
        if(value=='texto'){
            var serviceR = "/reporte/reporteText/" + props.idExpresion + "?expresion_aleman=1&expresion_espaniol=1&referencia_aleman=1\
            &referencia_espaniol=1&pasaje_aleman=" + opciones[4] + "&pasaje_espaniol=" + opciones[5] +
            "&hierarchy=" + opciones[6] + "&lang=" + props.lang + "&refid=" + props.match.params.id
            webService(serviceR, "GET", {}, (data) => {
                console.log("data",data)
                document.getElementById("toDownloadDiv").innerHTML = "<a href='/files/"+data.data.response+".txt' id='fileToDownload' download></a>"
                document.getElementById("fileToDownload").click()
            })
        }else{
            var serviceR = "/reporte/reportepdf/" + props.idExpresion + "?expresion_aleman=1&expresion_espaniol=1&referencia_aleman=1\
            &referencia_espaniol=1&pasaje_aleman=" + opciones[4] + "&pasaje_espaniol=" + opciones[5] +
            "&hierarchy=" + opciones[6] + "&lang=" + props.lang + "&refid=" + props.match.params.id
            webService(serviceR, "GET", {}, (data) => {
                console.log("data")
                document.getElementById("toDownloadDiv").innerHTML = "<a href='/files/"+data.data.response+".pdf' id='fileToDownload' download></a>"
                document.getElementById("fileToDownload").click()
            })
        }
    }

    return(
        <Modal 
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.openDescargas}
        >
        <Paper className={classes.modalinDescarga}>
            <div id="toDownloadDiv" hidden/>
                <Grid container justify="center" alignItems="center" alignContent="center">
                    <Grid item xs={11}>
                        <Typography variant="h4">Descargar Consulta</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                        aria-haspopup="true"
                        onClick={closeDescargas}
                        >
                            <ClearIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider className="divisor"/>
                <FormGroup>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography>Se genera un archivo con las siguientes especificaciones</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Jerarquía:</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel control={
                                <Checkbox 
                                    checked={checkedA} 
                                    onChange={() => setCheckedA(!checkedA)} 
                                    value="checkedA"
                                />
                                }
                                label="¿Con referencias?"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Descargar Pasaje:</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={checkedB}
                                    onChange={() => setCheckedB(!checkedB)}
                                    value="checkedB"
                                />
                                }
                                label="Aleman"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={checkedC}
                                    onChange={() => setCheckedC(!checkedC)}
                                    value="checkedC"
                                />
                                }
                                label="Español"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Tipo de archivo:</Typography>
                        </Grid>
                        <RadioGroup aria-label="Tipo de archivo" name="Tipo de archivo" value={value} onChange={handleChangeRadio}>
                            <Grid item xs={6}>
                                <FormControlLabel control={<Radio/>} value="texto" label="Texto"/>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControlLabel control={<Radio/>} value="PDF" label="PDF"/>
                            </Grid>
                        </RadioGroup>
                    </Grid>
                </FormGroup>
                <Divider className="divisor"/>
                <Grid container>
                    <Grid item xs={12} className={classes.gridDeBotones}>
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={clickHandleDescarga}
                        >
                            Descargar consulta
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>  
    )
} 

export default withStyles(modalDescargas)(ModalDescargas);