import React , { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/layouts/side-menu-old-ie.css';
import './css/layouts/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './componentes/InputCustomizado';
import BotaoSubmitCustomizado from './componentes/BotaoSubmitCustomizado';
import AutorBox, {FormularioAutor, TabelaAutores} from './autor/autor';
import {Link} from 'react-router-dom';
// Erro por causa do Link

class App extends Component {
  
  /*constructor(props){
    super(props)
  }

  funcao(){
    console.log("oi")
  }*/
  
  render() {
    return (
      <div id="layout">
    
    <a href="#menu" id="menuLink" className="menu-link">
        
    <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><Link to="/home" className="pure-menu-link">Home</Link></li>
                <li className="pure-menu-item"><Link to="/autor" className="pure-menu-link">Autor</Link></li>
                <li className="pure-menu-item"><Link to="/livro" className="pure-menu-link">Livro</Link></li>
            </ul>
            
        </div>
    </div>

    <div id="main">
      {this.props.children}
    </div>         

</div> 
    );
  }
}

export default App;
