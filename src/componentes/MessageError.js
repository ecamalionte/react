import React, { Component } from 'react';

export default class MessageError extends Component {

    constructor() {
        super();
    }

    render(){
        return(
          <div className={this.props.type}>
            <p> {this.props.message} </p>
          </div>
        );
    }
}
