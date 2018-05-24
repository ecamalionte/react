import React, { Component } from 'react';
import $ from 'jquery';
import InputCustom from './InputCustom.js';
import PubSub from 'pubsub-js';

export default class AuthorsForm extends Component {

    constructor() {
        super();
        this.state = { lista: [], nome: '', email: '', senha: '' };
        this.onSubmit = this.onSubmit.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    setNome(event) {
        this.setState({nome: event.target.value});
    }

    setEmail(event){
        this.setState({email: event.target.value});
    }

    setSenha(event){
        this.setState({senha: event.target.value});
    }

    buildData() {
        return JSON.stringify({
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha
        });
    }

    onSubmit(event){
        console.log('sending data...');
        event.preventDefault();
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: this.buildData(),
            success: function(newList) {
                PubSub.publish('authors-list-updated', newList);
            }.bind(this),
            error: function(error) {
                PubSub.publish('flash-message-error', 'Validation errors');
            }.bind(this)
        });
    }


    render(){
        return(
           <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.onSubmit} method='post'>
                <InputCustom id='nome' name='nome' label='Nome' type='text' value={this.state.nome} onChange={this.setNome}/>
                <InputCustom id='email' name='email' label='Email' type='email' value={this.state.email} onChange={this.setEmail}/>
                <InputCustom id='senha' name='senha' label='Senha' type='password' value={this.state.senha} onChange={this.setSenha}/>

                <div className="pure-control-group">
                   <label></label>
                   <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </div>
             </form>
          </div>
        );
    }
}
