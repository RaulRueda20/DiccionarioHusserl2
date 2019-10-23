import React from 'react';
import {Switch, Redirect, Link, Route} from 'react-router-dom';

import HeaderMain from './HeaderMain';
import Expresion from './Diccionario/Expresion';
import Pasaje from './Diccionario/Pasaje';
import Acercade from './Acercade';
import Guia from './Guia';
import moduloBusquedas from './moduloBusquedas'

export default function Subvistas({match, lang, setLang}){
    const [language,setLanguage] = React.useState("al");
    const [letraMain, setLetraMain] = React.useState('A');

    return(
        <div>
            <HeaderMain match={match} lang={lang} setLang={setLang}/>
            <Switch>
                <Route path={`${match.url}/diccionario`} render={(props) => <Expresion {...props} lang={lang} setLang={setLang} language={language} setLanguage={setLanguage} letraMain={letraMain} setLetraMain={setLetraMain}/>}/>
                <Route path={`${match.url}/pasaje/:expresion/:id`} render={(props) => <Pasaje {...props} lang={lang} setLang={setLang} language={language} setLanguage={setLanguage} letraMain={letraMain} setLetraMain={setLetraMain}/>}/>
                <Route path={`${match.url}/pasaje/:expresion`} render={(props) => <Pasaje {...props} lang={lang} setLang={setLang} language={language} setLanguage={setLanguage} letraMain={letraMain} setLetraMain={setLetraMain}/>}/>
                <Route path={`${match.url}/busquedas`} component={moduloBusquedas}/>
                <Route path={`${match.url}/acercade`} component={Acercade}/>
                <Route path={`${match.url}/guia`} component={Guia}/>
                <Route path={`${match.url}/`}>
                    <Redirect to={`${match.url}/diccionario`} />
                </Route>
                <Link id="toLogin" to="/"/>
            </Switch>
        </div>
    )
}