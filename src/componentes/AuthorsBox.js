import React, { Component } from 'react';
import $ from 'jquery';
import AuthorsForm from './AuthorsForm.js';
import AuthorsList from './AuthorsList.js';
import MessageError from './MessageError.js';
import PubSub from 'pubsub-js';

export default class AuthorsBox extends Component {

    constructor(){
        super();
        this.state = { lista: [], nome: '', email: '', senha: '' };
    }

    clearMessageError(){
        PubSub.publish('clean-message-error', '');
    }

    componentWillMount(){
        this.clearMessageError();
        $.ajax({
            url: 'http://cdc-react.herokuapp.com/api/autores',
            dataType: 'json',
            success: function(newList) {
                PubSub.publish('authors-list-updated', newList);
            }.bind(this),
            error: function(error) {
                PubSub.publish('flash-message-error', 'Something went wrong during the list');
            }.bind(this)
        });

        PubSub.subscribe('authors-list-updated', function(topic, newList){
            this.setState({lista: newList});
        }.bind(this));
    }


    render(){
        return(
                <div>
                  <MessageError/>
                  <AuthorsForm/>
                  <AuthorsList lista={this.state.lista}/>
                </div>
        );
    }
}
