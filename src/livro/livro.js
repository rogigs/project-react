import React, { Component } from "react";
import InputCustomizado from '../componentes/InputCustomizado';
import BotaoSubmitCustomizado from '../componentes/BotaoSubmitCustomizado';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import TratadorErros from "../TratadorErros";

class FormularioLivro extends Component{

    constructor(){
        super();
        this.state = {titulo: '', preco: '', autorId: ''};
        this.enviaForm = this.enviaForm.bind(this);
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutorId = this.setAutorId.bind(this);
    }

    enviaForm(evento){
        evento.preventDefault();
        $.ajax({
            url: 'https://cdc-react.herokuapp.com/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'POST',
            data: JSON.stringify({titulo: this.state.titulo, preco: this.state.preco, autorId: this.state.autorId}),
            success: function(novaListagem) {
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({titulo: '', preco: '', autorId: ''});
            }.bind(this),
            error: function (resposta) {
                if (resposta.status === 400) {
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }

    setTitulo(evento){
        this.setState({titulo:evento.target.value});
    }

    setPreco(evento){
        this.setState({preco:evento.target.value});
    }

    setAutorId(evento){
        this.setState({autorId:evento.target.value});
    }

    // Values e onChanges não implementados 
    render(){
        var autores = this.props.autores.map(function(autor){
            return <option key={autor.id} value={autor.id}>{autor.nome}</option>;
          });
        return(
            <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned"  method="post" onSubmit={this.enviaForm} method="post"> 
                <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="titulo" />
                <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="preco"/>
                <div className="pure-controls">
                <select value={this.state.autorId} name="autorId" onChange={this.setAutorId}>
                <option value="">Selecione o Autor...</option>
                    {autores}
                </select>
                </div>
                <BotaoSubmitCustomizado/>
            </form>             
        </div> 
        );
    }
}

class TabelaLivros extends Component{

    render(){
        return(
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Preço</th>
                            <th>idAutor</th>
                            <th>NomeAutor</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.lista.map(function(livro){
                            return (
                            <tr key={livro.id}>
                                <td>{livro.titulo}</td>
                                <td>{livro.preco}</td>
                                <td>{livro.autor.id}</td>
                                <td>{livro.autor.nome}</td>
                            </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default class LivroBox extends Component{

    constructor(props){
        super(props);
        this.state = {lista: [], autores: []};
    }

    componentDidMount(){
        $.ajax({
            url: "https://cdc-react.herokuapp.com/api/livros",
            dataType: 'json',
            success: function (resposta) {
                this.setState({lista:resposta});
            }.bind(this)
        });

        $.ajax({
            url: "http://cdc-react.herokuapp.com/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({autores:resposta});
            }.bind(this)
        });

        PubSub.subscribe('atualiza-lista-livros', function (topico, novaLista) {
            this.setState({lista:novaLista});
        }.bind(this));
    }
    render(){
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro autores={this.state.autores}/>
                    <TabelaLivros lista={this.state.lista}/>
                </div>
            </div>
        );
    }
}