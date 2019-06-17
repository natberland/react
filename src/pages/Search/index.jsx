import React, { Component, Container, Row } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';


import * as CurrencyFormat from 'react-currency-format';

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
            <div class="lista mdl-grid-2 mdl-cell--12-col-desktop">
            
            <li  key={ item.id }>
                <div  align="center">
                    <div><img class="thumb" src={item.thumbnail}></img></div>
                </div>
                
                <div align="center">
                    <div class="id">{ item.id } </div>
                    <div class="prodtitle">{ item.title } </div>
                </div>

                <div class="price-item">
                     <h4 align="center">
                         <CurrencyFormat value={item.price} 
                                         decimalScale={2} 
                                         thousandSeparator={"."} 
                                         fixedDecimalScale={true} 
                                         displayType={'text'}
                                         decimalSeparator={","} 
                                         thousandSpacing={2} 
                                         prefix={'R$'} />
                    </h4>                              
                 </div>
                
                <div>

                    <div class="botao"><Link 
                         to={ `/product/${item.id}` }>

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