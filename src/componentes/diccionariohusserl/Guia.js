import React from 'react';
import Typography from '@material-ui/core/Typography';

import {webService} from '../../js/webServices';

function Guia(props){
    const [guia, setGuia]=React.useState("")

    React.useEffect(()=>{
        webService("/manual/get", "GET", {}, (data) => {
           console.log(data)
           setGuia(data.data.response[0])
        })
    }, [])

    var guiaEs=guia.contenido;

    function htmlguiaEs(){
        return {__html: guiaEs}
    }

    return(
        <div dangerouslySetInnerHTML={htmlguiaEs()}></div>
    )
}

export default Guia;