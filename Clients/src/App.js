import React from 'react'
// import Home from './component/Home'
import 'bootstrap/dist/css/bootstrap.min.css';

// import 'bootswatch/dist/litera/bootstrap.min.css'; // Added this :boom:\
import './component/style.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//pages
import Home from './component/Home.jsx';
import Login from './component/Login.jsx';
import Depot from './component/Depot.jsx';
import NotFound from './component/NotFound.jsx';
import Profile from './component/Profile.jsx';
import Facture from './component/Facture.jsx';
import Client from './component/Client.jsx';
import Fournisseur from './component/Fournisseur.jsx';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/" component={Login}/>
          <Route path="/dashboard" component={Home} />
          <Route path="/Dette Clients" component={Client} />
          <Route path="/depots" component={Depot} />
          <Route path="/profile" component={Profile} />
          <Route path="/facture" component={Facture} /> 
          <Route path="/Dette Clients" component={Client} />
          <Route path="/Dette Fournisseur" component={Fournisseur} />
          <Route path="*" component={NotFound} />

         {/* <Route path="/fournisseurs " component={Fournisseur} />  */}

      </Switch>
    </Router>
    </div>
  );
}

export default App;
