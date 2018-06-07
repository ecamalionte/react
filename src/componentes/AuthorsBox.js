import React, { Component } from 'react';
import $ from 'jquery';
import AuthorsForm from './AuthorsForm.js';
import AuthorsList from './AuthorsList.js';
import MessageError from './MessageError.js';
import PubSub from 'pubsub-js';

export default class AuthorsBox extends Component {

    constructor(){
        super();
        this.state = { lista: [] };

        PubSub.subscribe('authors-list-updated', (topic, newList) =>{
            console.log('antes de mudar o estado');
            this.setState({lista: newList});
            console.log('mudou o estado');
        });
    }

    clearMessageError(){
        PubSub.publish('clean-message-error', '');
    }

    componentWillMount(){
        this.clearMessageError();
        console.log('fetch na lista');
        fetch('http://cdc-react.herokuapp.com/api/autores')
            .then(response => {
                if(response.ok) {
                    return response.json();
                }else {
                    throw new Error('Erro na Listagem');
                }
            })
            .then(authors => { PubSub.publish('authors-list-updated', authors); })
            .catch(error => {
                PubSub.publish('flash-message-error', error.message);
            });
    }


    render(){
        console.log('renderizando o Box');
        return(
                <div>
                  <MessageError/>
                  <AuthorsForm/>
                  <AuthorsList lista={this.state.lista}/>
                </div>
        );
    }
}
