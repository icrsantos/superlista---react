import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Produto.css";

const ProdutoFormulario = (props) => {
    
    /** Pesquisa produtos faltantes por nome **/
    const removerProduto = () => {};
    const salvarProduto = () => {};

    return (
        <div id="componente3">
            <div className="componentHeader">
                <h1 className="componentTitle" id="tituloProduto">Novo Produto</h1>
                <button id="btnRemov" className="button primary" onClick={ removerProduto }>
                    <img src="../assets/delete.png" alt="Remover Produto"/>
                </button>
            </div>

            <div className="componentContent">
                <div className="field mt1">
                    <label className="fifth">Nome</label>
                    <input type="text" autoComplete="off" id="descricao"/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Marca</label>
                    <input type="text" autoComplete="off" id="marca"/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Última compra</label>
                    <input type="date" autoComplete="off" id="ultimaCompra"/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Periodicidade da compra</label>
                    <select name="select" id="periodicidade">
                        <option value="semanal">Semanal</option>
                        <option value="quinzenal">Quinzenal</option>
                        <option value="mensal">Mensal</option>
                    </select>
                </div>
                <div className="field mt1">
                    <label className="fifth">Último valor pago</label>
                    <input type="number" autoComplete="off" id="ultimoValorPago"/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Tipo da quantidade</label>
                    <select name="select" id="tipoQuantidade">
                        <option value="kilo">Kilo</option>
                        <option value="litro">Litro</option>
                        <option value="pacote">Pacote</option>
                        <option value="pote">Pote</option>
                        <option value="sache">Sache</option>
                        <option value="vidro">Vidro</option>
                    </select>
                </div>
                <div className="field mt1">
                    <label className="fifth">Quantidade</label>
                    <input type="number" autoComplete="off" id="quantidade"/>
                </div>
                <div id="inputImagemProduto" className="mt1">
                    <input type="file" className="custom-file-input" accept="image/*" id="img-input" />
                </div>
                <div id="divImagemProduto" className="mt1 hidden">
                    <img id="imagem-preview" src=""/>
                </div>
                <div id="divGraficosProduto" className="mt1 hidden">
                    <canvas id="chartHistoricoProduto"></canvas>
                </div>
            </div>
             
            <div className="formButtonGroup mb1 mr1">
                <Link id="btnCancelarForm" to="/produto">
                    <button className="button light half">Cancelar</button>
                </Link>
                <button id="salvarProduto" className="button primary half ml1" onClick={ salvarProduto }>Salvar</button>
            </div>
        </div>
    );
}

export default ProdutoFormulario;