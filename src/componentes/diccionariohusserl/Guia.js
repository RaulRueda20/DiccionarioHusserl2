// React
import React from 'react'

// Components
import LinearProgress from '@material-ui/core/LinearProgress';

// Other reqs
import {webService} from '../../js/webServices';
import classNames from 'classnames';
import * as localStore from '../../js/localStore';

function Guia(props){
    const [guia, setGuia]=React.useState("");
    const [loading, setLoading]=React.useState(false);

    React.useEffect(()=>{
        if(!localStore.getObjects("sesion")) document.getElementById("toLogin").click()
        setLoading(true)
        webService("/manual/get", "GET", {}, (data) => {
           setGuia(data.data.response[0])
        })
        setLoading(false)
    }, [])

    function renderizadoGuia(){
        switch(props.lang){
            case "es":
                return {__html: guia.contenido}
            case "ca":
                return {__html: guia.contenido_ca}
            case "al":
                return {__html: guia.contenido_de}
            case "en":
                return {__html: guia.contenido_en}
            case "fr":
                return {__html: guia.contenido_fr}
        }
    }

    return(
        <div>
            <div className="guia" dangerouslySetInnerHTML={renderizadoGuia()}></div>
            <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
            <Link id="toLogin" to="/"/>
        </div>
    )
}

export default Guia;