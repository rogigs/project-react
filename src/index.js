import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import AutorBox from './autor/autor';
import Home from './Home';
import LivroBox from './livro/livro';

ReactDOM.render((
  <Router>
      <App>
              <Switch>            
                  <Route exact path="/" component={Home}/>
                  <Route path="/home" component={Home}/>
                  <Route path="/autor" component={AutorBox}/>
                  <Route path="/livro" component={LivroBox}/>                
              </Switch>            
      </App>
  </Router>

),
  document.getElementById('root')
);
