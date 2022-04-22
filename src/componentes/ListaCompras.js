import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ListaCompras.css";

const ListaCompras = (props) => {
    const [produtosSugeridos, setProdutosSugeridos] = useState(props.produtosSugeridos);
    const [produtosFaltantes, setProdutosFaltantes] = useState(props.produtosFaltantes);

    /** Pesquisa produtos faltantes por nome **/
    const pesquisar = (value) => {
        let produtosFiltrados = [];
        props.produtosFaltantes.forEach((produto) => {
            if(removerCaracteresEspeciais(produto.descricao).includes(removerCaracteresEspeciais(value))) {
                produtosFiltrados.push(produto);
            }
        })
        
        setProdutosFaltantes(produtosFiltrados);
    };

    const removerCaracteresEspeciais = (str) => {
        return !str ? str : str.normalize('NFD').replace(/[^\w\s]/gi, '').trim().toLowerCase();
    }

    /** Finaliza a lista de compras **/
    const finalizarLista = () => { 
        if (window.confirm("Deseja realmente finalizar esta lista de compras?")) {
            props.onFinalizarLista();
            setProdutosFaltantes([]);
        }
    };

    /** Adiciona a lista de compras um produto sugerido **/
    const adicionarProdutoSugeridoALista = (produto) => {
        produto.acabou = true;

        props.onAlteraProduto(produto);
        props.onAdicionaFaltante(produto);
        props.onRemoveSugerido(produto);

        setProdutosSugeridos(produtosSugeridos.filter(p => p.id !== produto.id));
        setProdutosFaltantes([...produtosFaltantes, produto]);
    } 

    /** Funções de validação da existencia de produtos faltantes ou sugeridos **/
    const possuiProdutosFaltantes = () => {
        return produtosFaltantes && produtosFaltantes.length > 0
    }

    const possuiProdutosSugeridos = () => {
        return produtosSugeridos && produtosSugeridos.length > 0
    }

    return (
        <div id="componente1">
            <div className="componentHeader">
                <h1 className="componentTitle">Lista de Compras</h1> 
            </div>

            <div className="componentContent">
                <div className="field">
                    <input id="fieldPesquisa" type="text" onChange={ (e) => pesquisar(e.target.value) } autoComplete="off" placeholder="Pesquisar ..."/>
                </div>

                <div id="blank" className={ !possuiProdutosFaltantes() && !possuiProdutosSugeridos() ? "" : "hidden" }>
                    <p>Lista Vazia</p>
                </div>

                <div id="divProdutosFaltantes" className={ possuiProdutosFaltantes() ? "" : "hidden" }>
                    <h3 className="opacityText mt1" id="labelProdFaltantesTitle">PRODUTOS FALTANTES</h3> 
                    <table id="produtosFaltantes" className="mt1">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Quantidade</th>
                                <th><div className="alinha-final">Comprado</div></th>
                            </tr>
                        </thead>
                        <tbody id="produtosRow">
                            { produtosFaltantes.map((prod, idx) => (
                                <tr key={idx}>
                                    <td><Link className="link" id="nomeProduto" to={ `produto/${prod.id}` }>{prod.descricao}</Link></td>
                                    <td>{ prod.quantidade ? prod.quantidade + ( prod.tpQuantidade ? " - " + prod.tpQuantidade : "") : "" }</td>
                                    <td>
                                        <div className="formButtonGroup">
                                            <input type="checkbox"></input>
                                        </div>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>

                    <div id="finalizarLista" className="mt2">
                        <button className="button primary" onClick={ finalizarLista }>Finalizar lista de compras</button>
                    </div>
                </div>

                <div id="divProdutosSugeridos" className={ possuiProdutosSugeridos() ? '': "hidden" }>
                    <h3 className="opacityText italicText mt3" id="labelProdSugeridosTitle">PRODUTOS SUGERIDOS</h3> 
                    <table id="produtosSugeridos">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody id="produtosRow">
                            { produtosSugeridos.map((prod, idx) => (
                                <tr key={idx}>
                                    <td>{prod.descricao}<label className="opacityText italicText">{` (Comprado à ${prod.diasUltimaCompra} dias)`}</label></td>
                                    <td>
                                        <div className="alinha-final">
                                            <label className="italicText" onClick={ (e) => adicionarProdutoSugeridoALista(prod) }>Adicionar</label>
                                        </div>
                                    </td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ListaCompras;