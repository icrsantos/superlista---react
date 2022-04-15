import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Produto.css";

const Produto = (props) => {
    
    /** Pesquisa produtos faltantes por nome **/
    const pesquisar = (value) => { };
    
    return (
        <div id="componente2" className="component">
            <div className="componentHeader">
                <h1 className="componentTitle">Produtos</h1> 
                <Link id="btnAdic" to="/produto/novo">
                    <button className="button primary">
                        <img src="./assets/plus1.png" alt="Adicionar Produto"/>
                    </button>
                </Link>
            </div>

            <div className="componentContent">
                <div id="blankProdutos">
                    <p>Nenhum produto cadastrado</p>
                </div>

                <div className="hidden" id="divProdutos">
                    
                </div>
            </div>
        </div>
    );
}

export default Produto;