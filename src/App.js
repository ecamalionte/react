import React, { Component } from 'react';
import logo from './logo.svg';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';

class App extends Component {

    constructor() {
        super();
        this.state = { lista: [], nome: '', email: '', senha: '' };
        this.submitForm = this.submitForm.bind(this);
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

    componentWillMount(){
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function(data) {
                console.log("response received!");
                this.setState({lista: data});
            }.bind(this),
            error: function(data) {
                console.log("error" + data);
            }
          }
        );
    }

    submitForm(event){
        console.log('sending data...');
        event.preventDefault();
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({
                nome: this.state.nome,
                email: this.state.email,
                senha: this.state.senha}),
            success: function(data) {
                console.log("success" + data);
                this.setState({ lista: data});
            }.bind(this),
            error: function(data) {
                console.log("error" + data.toString());
            }
        });
    }


    render() {
        console.log("rendering...");
        return (
            <div id="layout">
              <a href="#menu" id="menuLink" className="menu-link">
                  <span></span>
              </a>

              <div id="menu">
                   <div className="pure-menu">
                      <a className="pure-menu-heading" href="#">React</a>
                      <ul className="pure-menu-list">
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                        <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
                      </ul>
                  </div>
              </div>

              <div id="main">
                    <div className="header">
                      <h1>Cadastro de Autores</h1>
                    </div>
                    <div className="content" id="content">
                      <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.submitForm} method='post'>
                          <div className="pure-control-group">
                            <label htmlFor="nome">Nome</label>
                <input id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} />
                          </div>
                          <div className="pure-control-group">
                            <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail}  />
                          </div>
                          <div className="pure-control-group">
                            <label htmlFor="senha">Senha</label>
                <input id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} />
                          </div>
                          <div className="pure-control-group">
                            <label></label>
                            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                          </div>
                        </form>
                      </div>

                      <div>
                        <table className="pure-table">
                          <thead>
                            <tr>
                              <th>Nome</th>
                              <th>email</th>
                            </tr>
                          </thead>
                          <tbody>
                             {
                                 this.state.lista.filter(function(autor){
                                     var filtered = ["heroku", "eric", "aloha"];
                                     return(filtered.includes(autor.nome));
                                 }).map(function(autor) {
                                      return(
                                          <tr>
                                            <td>{autor.nome}</td>
                                            <td>{autor.email}</td>
                                          </tr>
                                      );
                                  })
                              }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
        );
    }
}

export default App;
