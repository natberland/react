
import React, { Component, Fragment } from 'react';

import axios from 'axios'

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            loading: true,
            data: {},
       
        };
    }

    componentDidMount() {
        axios.all([
        axios.get(`https://api.mercadolibre.com/items/${this.state.id}`),
        axios.get(`https://api.mercadolibre.com/items/${this.state.id}/description`)
        ])
            .then(([ item, description ]) => {
                console.log(item.description)
                this.setState({
                    data: {
                        ...item.data,
                        description: description.data.plain_text,
                    },
                    loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    render() {
        const { id, data, loading } = this.state;
        if (!Object.keys(data).length) {
            return (
                <div style={ { fontSize: 40 } }> Carregando... </div>
            );

        } else 
        
        return (
            <Fragment>

                <div class="mdl-grid-2 mdl-grid" >
                    <div class="mdl-cell mdl-cell--6-col">
                  


                    <img class="image" src={data.pictures[0].url } alt={data.title} width="384" height="354"></img>
  
  
                        </div>

                        <div class="mdl-cell mdl-cell--6-col">
                      


                            <div class="demo-card-square mdl-card mdl-shadow--2dp">
                                <div class="mdl-card__title mdl-card--expand">
                                    <h2 class="mdl-card__title-text">{data.title}</h2>

                                </div>
                                    
                                <div class="price">
                                    <h4 align="center"> R$ {data.price},00</h4>                                </div>
                                <div class="mdl-card__supporting-text">
                                {data.description} 
  </div>
                                <div align="center" class="mdl-card__actions mdl-card--border">
                                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                                        Comprar
    </a>
                                </div>
                            </div>




                        </div>
                    </div>


            </Fragment>


                );
            }
        }
        
        export default Product;
        
