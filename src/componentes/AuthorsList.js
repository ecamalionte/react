import React, { Component } from 'react';
import $ from 'jquery';

export default class AuthorsList extends Component {

    constructor() {
        super();
    }

    render(){
        return(
               <div>
                 <table className="pure-table">
                   <thead>
                     <tr>
                       <th>Nome</th>
                       <th>Email</th>
                     </tr>
                   </thead>
                   <tbody>
                      {
                          this.props.lista.filter(function(autor){
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
        );
    }
}
