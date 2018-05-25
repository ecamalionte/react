import React, { Component } from 'react';
import '../css/pure-min.css';
import '../css/side-menu.css';
import $ from 'jquery';
import PubSub from 'pubsub-js';

export default class InputCustom extends Component {

    constructor() {
        super();
        this.state = { validationError: '' };
        PubSub.subscribe('flash-validation-error', function(topic, error){
            if(error.field === this.props.name){
                this.setState({validationError: error.defaultMessage});
            }
        }.bind(this));

        PubSub.subscribe('clean-message-error', function(topic, params){
            this.setState({validationError: ''});
        }.bind(this));
    }

    render(){
        return(
         <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
                <label>{this.state.validationError}</label>
         </div>
        );
    }
}
