import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Produto.css";

const Produto = (props) => {
    const [produtos, setProdutos] = useState(props.produtos);

    const alteraProdFaltante = (produto, value) => {
        if(value) {
            props.onAdicionaFaltante(produto);
        } else {
            props.onRemoveFaltante(produto);
        }
    }
    
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
                <div id="blankProdutos" className={ !props.produtos || props.produtos.length == 0 ? "" : "hidden" }>
                    <p>Nenhum produto cadastrado</p>
                </div>

                <div id="divProdutos" className={ props.produtos && props.produtos.length > 0 ? "" : "hidden" }>
                    <table id="produtos" className="mt1">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th><div className="alinha-final">Acabou?</div></th>
                            </tr>
                        </thead>
                        <tbody id="produtosRow">
                            { props.produtos.map((prod, idx) => (
                                <tr key={idx}>
                                    <td><Link className="link" id="nomeProduto" to={ `produtos/edicao/${idx}` }>{prod.descricao}</Link></td>
                                    <td>
                                        <div className="formButtonGroup">
                                           <label className="switch">
                                               <input type="checkbox" id={`check_${idx}`} checked={prod.acabou} onClick={ (e) => alteraProdFaltante(prod, e.target.checked) }/>
                                                <span className="round slider"></span>
                                            </label> 
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

export default Produto;