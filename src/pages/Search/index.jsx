import React, { Component } from 'react';

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
            <div class="lista">
            <li key={ item.id }>
                <span>{ item.id }</span>
                <span>{ item.title }</span>
                <Link 
                    to={ `/product/${item.id}` }
                    >

                Abrir Produto
                 
                </Link>
            </li>
            </div>
        )
    }

    render() {
        return (
            <div>
               
                <div class=" mdl-cell mdl-cell--6-col">
                
                Procurar:
                
                </div>

                <div class=" mdl-cell mdl-cell--4-col">
                    <div align="center" class="lupa">
                        <input size="50" type="text" onChange={ this.onSearch } />
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