import React from 'react';
import {Switch, Redirect, Link, Route} from 'react-router-dom';

import HeaderMain from './HeaderMain';
import DiccionarioMain from './Diccionario/DiccionarioMain';

export default function Subvistas({match}){
    return(
        <div>
            <HeaderMain match={match}/>
            <Switch>
                <Route path={`${match.url}/diccionario`} component={DiccionarioMain}/>
                <Route path={`${match.url}/acercade`} />
                <Route path={`${match.url}/guia`} />
                <Route path={`${match.url}/`}>
                    <Redirect to={`${match.url}/diccionario`} />
                </Route>
                <Link id="toLogin" to="/"/>
            </Switch>
        </div>
    )
}