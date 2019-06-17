
import React, { Component, Fragment } from 'react';

import axios from 'axios'

import Loader from 'react-loader-spinner'
import * as CurrencyFormat from 'react-currency-format';
import ReadMoreAndLess from 'react-read-more-less';
import Media from "react-media";






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
            .then(([item, description]) => {
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
        const { data } = this.state;
        if (!Object.keys(data).length) {
            return (
                <div class="mdl-grid">
                    <div style={{
                        textAlign: "center",
                        marginTop: "20%",
                    }}>
                        <Loader
                            type="Circles"
                            color="#252E7C"
                            height="80"
                            width="80"

                        />
                        <span style={{
                            fontSize: 30,
                            color: "#0d0d0d",
                            textAlign: "center",
                            marginTop: 20
                        }}> Carregando!
                   </span>
                    </div>
                </div>

            );


        } else

            return (

                <Media query={{ maxHeight: 399}}>
                    {matches =>
                        matches ? (
                            <Fragment>

                                <div class="mdl-cell--middle">



                                    <img class="image" src={data.pictures[0].url} alt={data.title} width="346" height="346"></img>


                                </div>

                                <div>



                                    <div class="mdl-cell--middle">
                                        <div>
                                            <h2 class="layhor">{data.title}</h2>

                                        </div>

                                        <div class="price">
                                            <h4 align="center"><CurrencyFormat value={data.price} decimalScale={2} thousandSeparator={"."} fixedDecimalScale={true} displayType={'text'} decimalSeparator={","} thousandSpacing={2} prefix={'R$'} /></h4>                                </div>
                                        <div>
                                            <ReadMoreAndLess
                                                ref={this.ReadMore}
                                                className="read-more-content"
                                                charLimit={300}
                                                readMoreText="Leia mais"
                                                readLessText="Leia menos"
                                            >
                                                {data.description}
                                            </ReadMoreAndLess>


                                        </div>
                                        <div class-="layout" align="center">
                                            <a class="botao" href="https://www.mercadolivre.com">

                                                Comprar
</a>
                                        </div>
                                    </div>




                                </div>

                        </Fragment>


                            
                        ) : (
                                <Fragment>

                                    <div class="mdl-grid-2 mdl-grid" >
                                        <div class="mdl-cell mdl-cell--6-col">



                                            <img class="image" src={data.pictures[0].url} alt={data.title} width="345.6" height="345.6"></img>


                                        </div>

                                        <div class="mdl-cell mdl-cell--6-col">



                                            <div class="mdl-card mdl-shadow--2dp">
                                                <div class="mdl-card__title mdl-card--expand">
                                                    <h2 class="mdl-card__title-text">{data.title}</h2>

                                                </div>

                                                <div class="price">
                                                    <h4 align="center"><CurrencyFormat value={data.price} decimalScale={2} thousandSeparator={"."} fixedDecimalScale={true} displayType={'text'} decimalSeparator={","} thousandSpacing={2} prefix={'R$'} /></h4>                                </div>
                                                <div class="mdl-card__supporting-text">
                                                    <ReadMoreAndLess
                                                        ref={this.ReadMore}
                                                        className="read-more-content"
                                                        charLimit={300}
                                                        readMoreText="Leia mais"
                                                        readLessText="Leia menos"
                                                    >
                                                        {data.description}
                                                    </ReadMoreAndLess>


                                                </div>
                                                <div align="center" class="mdl-card__actions mdl-card--border">
                                                    <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" href="https://www.mercadolivre.com">

                                                        Comprar
    </a>
                                                </div>
                                            </div>




                                        </div>
                                    </div>

                                </Fragment>

                            )
                    }
                </Media>



            );
    }
}




export default Product;

