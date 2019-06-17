import React, { Component, Container, Row } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

class Search extends Component {
    constructor() {
        super();
        
        this.state = {
            results: [],
        };

        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(event) {
        const value = event.currentTarget.value;

        axios.get(`https://api.mercadolibre.com/sites/MLB/search?q=${value}`)
            .then(({ data }) => {
                this.setState({
                   results: data.results, 
                });
            })
    }

    renderItem(item) {
        return (
            <div class="lista mdl-grid-2 ">
            
            <li  key={ item.id }>
                <div class=" mdl-cell--6-col">
                <div><img class="thumb" src={item.thumbnail}></img></div>
                </div>
                
                <div class="mdl-cell mdl-cell--6-col">
                <div class="prodtitle">{ item.title }</div>
                
                <div class="botao"><Link 
                    to={ `/product/${item.id}` }
                    >

                Abrir Produto
                 
                </Link>

                </div> 
                </div>
                
            </li>
            </div>
        )
    }

    render() {
        
        return (
            <div class="busca">
                    <div>     
            
                    <div align="center" class="lupa">
                        
                        <input 
                            size="40"  
                            type="text" 
                            placeholder="Buscar Produto" 
                            onChange ={ this.onSearch } />
                </div>
                </div>  
                <ul>
                    { this.state.results.map(this.renderItem) }
                </ul>
            </div>
        );
    }
}

export default Search;