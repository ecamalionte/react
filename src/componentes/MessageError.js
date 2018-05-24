import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class MessageError extends Component {

    constructor() {
        super();
        this.state = {messageError: '' };
        PubSub.subscribe('flash-message-error', function(topic, error){
            this.setState({messageError: error});
        }.bind(this));
        PubSub.subscribe('clean-message-error', function(topic, params){
            this.setState({messageError: ''});
        }.bind(this));
    }

    render(){
        return(
          <div className={this.props.type}>
            <p> {this.state.messageError} </p>
          </div>
        );
    }
}
