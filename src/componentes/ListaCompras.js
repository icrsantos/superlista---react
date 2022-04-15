import React, { Component } from "react";
import "./ListaCompras.css";

const ListaCompras = (props) => {
    
    /** Pesquisa produtos faltantes por nome **/
    const pesquisar = (value) => { };

    const finalizarLista = () => { };

    return (
        <div id="componente1">
            <div className="componentHeader">
                <h1 className="componentTitle">Lista de Compras</h1> 
            </div>

            <div className="componentContent">
                <div className="field">
                    <input id="fieldPesquisa" type="text" onKeyPress={ (e) => pesquisar(e.target.value) } autoComplete="off" placeholder="Pesquisar ..."/>
                </div>

                <div id="blank">
                    <p>Lista Vazia</p>
                </div>

                <div id="compras" className="hidden">   
                    <h3 className="opacityText mt1" id="labelProdFaltantesTitle">PRODUTOS FALTANTES</h3> 
                    

                    <div className="hidden" id="divProdutosFaltantes">
                        
                    </div>

                    <div id="finalizarLista" className="mt1">
                        <button className="button primary" onClick={ finalizarLista }>Finalizar Lista de Compras</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListaCompras;