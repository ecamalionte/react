import React, { Component } from 'react';
import $ from 'jquery';
import AuthorsForm from './AuthorsForm.js';
import AuthorsList from './AuthorsList.js';
import MessageError from './MessageError.js';

export default class AuthorsBox extends Component {

    constructor(){
        super();
        this.state = { lista: [], nome: '', email: '', senha: '' };
        this.updateList = this.updateList.bind(this);
        this.setMessage = this.setMessage.bind(this);
    }

    clearMessageError(){
        this.setState({messageError: ''});
    }

    componentWillMount(){
        this.clearMessageError();
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function(data) {
                console.log("response received!");
                this.setState({lista: data});
            }.bind(this),
            error: function(data) {
                console.log("error" + data);
                this.setState({messageError: 'Something went wrong during the list'});
            }.bind(this)
        });
    }

    updateList(newList){
        console.log('callbackSuccess' + newList);
        this.setState({lista: newList});
    }

    setMessage(error){
        console.log('callbackError' + error);
        this.setState({messageError: 'something went wrong during post' });
    }

    render(){
        return(
                <div>
                  <MessageError message={this.state.messageError}/>
                  <AuthorsForm callbackSuccess={this.updateList} callbackError={this.setMessage}/>
                  <AuthorsList lista={this.state.lista}/>
                </div>
        );
    }
}
