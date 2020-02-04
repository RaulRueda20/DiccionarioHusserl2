import React from 'react';
import {HashRouter, Route, Switch, Redirect, Link} from 'react-router-dom';

import Login from './login/Login';
import Subvistas from './diccionariohusserl/Subvistas';
import * as localStore from '../js/localStore';

function App(){
  const [lang, setLang]=React.useState("es");

  React.useEffect(()=>{
    if(localStore.getObjects("sesion")) document.getElementById("toMain").click()
  },[true])

  return (
    <div>
      <HashRouter>
        <Switch>
            <Route path="/husserl" render={(props) => <Subvistas {...props} lang={lang} setLang={setLang}/>}/>
            <Route path="/" render={(props) => <Login {...props} lang={lang} setLang={setLang}/>}/>
            {/* <Route path={`/`}>
              <Redirect to={`/login`} />
            </Route> */}
        </Switch>
        <Link id="toMain" to="/husserl"/>
      </HashRouter>
    </div>
  )

}

export default App;