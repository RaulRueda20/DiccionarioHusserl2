import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Login from './login/Login';
import Subvistas from './diccionariohusserl/Subvistas';

class App extends React.Component{
  render(){
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/husserl" component={Subvistas} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App;