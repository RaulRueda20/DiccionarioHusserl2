// React
import React from 'react';

// Elements
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import * as localStore from '../../../js/localStore';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      margin: 'auto',
    },
    cardHeader: {
      padding: theme.spacing(1, 2),
    },
    list: {
      width: 200,
      height: 100,
      backgroundColor: theme.palette.background.paper,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
    divLista:{
        maxHeight: "173px !important",
        overflowY: "scroll"
    }
}));

function ListaDeConsultados(props){
    const classes = useStyles();
    const [listaC, setListaC] = React.useState([]);

    function fixListaC(lista){
        var lista =  localStore.getObjects("referenciasConsultadas")
        var listaNueva = []
        var listaFinal = []
        for(var i in lista){
            if(listaNueva.indexOf(lista[i].id + "/" + lista[i].referencias[0].refid) == -1){
                listaNueva.push(lista[i].id + "/" + lista[i].referencias[0].refid)
            }
        }
        for(var j in listaNueva){
            var flag = false
            var listaid = listaNueva[j].split("/")[0]
            var listaRefId = listaNueva[j].split("/")[1]
            for(var k in lista){
                if(listaid == lista[k].id && listaRefId == lista[k].referencias[0].refid && !flag ){
                    listaFinal.push(lista[k])
                    flag = true
                }
            }
        }
        return listaFinal
    }

    React.useEffect(()=>{
        var listaConsultas = localStore.getObjects("referenciasConsultadas")
        var listaVacia = []
        for(var i in listaConsultas){
            listaVacia.push(listaConsultas[i])
        }
        setListaC(fixListaC(listaVacia))
    },[true])

    const handleToggle = value => () => {
        const currentIndex = props.checked.indexOf(value);
        const newChecked = [...props.checked];
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        props.setChecked(newChecked);
    };

    const handleToggleAll = value => () => {
        var newChecked = [...props.checked];
        for(var i in value){
            var currentIndex = props.checked.indexOf(value[i].referencias[0].refid + "/" + value[i].id);
            if (currentIndex === -1) {
                newChecked.push(value[i].referencias[0].refid + "/" + value[i].id);
            } else {
                newChecked.splice(currentIndex);
            }
        }
        props.setChecked(newChecked);
    };

    return(
        <Card>
            <CardHeader
                avatar={
                    <Checkbox
                    onClick={handleToggleAll(listaC)}
                    disabled={listaC.length === 0}
                    inputProps={{ 'aria-label': 'Todas las expresiones consultadas' }}
                    />
                    }
                    title={"Marcar todas las expresiones consultadas"}
                />
            <Divider />
            <List component="div" role="list" className={classes.divLista}>
                {listaC.map((value,index)=>{
                    const labelId = `${value.id}`;
                    return (
                        <ListItem key={value.id+"-"+index} role="listitem" button onClick={handleToggle(value.referencias[0].refid + "/" + value.id)}>
                            <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={props.checked.indexOf(value.referencias[0].refid + "/" + value.id) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                            />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={`${value.expresion +"-"+value.referencias[0].refid}`} />
                        </ListItem>
                    )
                })}
            </List>
        </Card>
    )
}

export default ListaDeConsultados;
