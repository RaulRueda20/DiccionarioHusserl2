// React
import React from 'react'

// Components
import LinearProgress from '@material-ui/core/LinearProgress';

// Other reqs
import {webService} from '../../js/webServices';
import classNames from 'classnames';
import * as localStore from '../../js/localStore';

function Acercade(props){
    const [acercade, setAcercade] = React.useState("");
    const [loading, setLoading]=React.useState(false);

    React.useEffect(()=>{
        if(!localStore.getObjects("sesion")) document.getElementById("toLogin").click()
        setLoading(true)
        webService("/acerca_de/get", "GET", {}, (data) => {
           setAcercade(data.data.response[0]) 
        })
        setLoading(false)
    }, [])

    function renderizadoDeAcercaDe(){
        switch(props.lang){
            case "es":
                return {__html: acercade.contenido}
            case "ca":
                return {__html: acercade.contenido_ca}
            case "al":
                return {__html: acercade.contenido_de}
            case "en":
                return {__html: acercade.contenido_en}
            case "fr":
                return {__html: acercade.contenido_fr}
        }
    }

    return(
        <div>
            <div className="acercaDe" dangerouslySetInnerHTML={renderizadoDeAcercaDe()}></div>
            <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
            {/* <Link id="toLogin" to="/login"/> */}
        </div>
    )
}

export default Acercade;