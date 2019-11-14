import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Login from './login/Login';
import Subvistas from './diccionariohusserl/Subvistas';

function App(){
  const [lang, setLang]=React.useState("es");

  return (
    <div>
      <HashRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} lang={lang} setLang={setLang}/>}/>
          <Route path="/husserl" render={(props) => <Subvistas {...props} lang={lang} setLang={setLang}/>}/>
        </Switch>
      </HashRouter>
    </div>
  )

}

export default App;