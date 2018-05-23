import React, { Component } from 'react';
import '../css/pure-min.css';
import '../css/side-menu.css';
import $ from 'jquery';

export default class InputCustom extends Component {

    constructor() {
        super();
    }

    render(){
        return(
         <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
         </div>
        );
    }
}
