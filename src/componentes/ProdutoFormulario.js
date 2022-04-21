import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Produto.css";
import moment from 'moment';

const ProdutoFormulario = (props) => {  
    const [produto, setProduto] = useState(props.produto);
    const [isEditing, setIsEditing ] = useState(props.isEditing);
    const { id } = useParams();
    
    useEffect(() => {
        if(isEditing && !produto.id) {
            let prodEdicao = props.buscaProduto(id)[0];
            setProduto(prodEdicao);
        }
    }); 

    /** Pesquisa produtos faltantes por nome **/
    const salvarProduto = () => {
        if(!produto.historicoPrecos) {
            produto.historicoPrecos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        
        if(produto.preco) {
            produto.historicoPrecos[parseInt(moment().format('M'))] = parseFloat(produto.preco);
        }

        if(isEditing) {
            props.onAltera(produto);
        } else {
            if (!produto || (!produto.descricao || produto.descricao === '')) {
                alert("Não é possível inserir um produto sem nome");
                return;
            }

            produto.id = (props.nextId() + 1);
            props.onAdiciona(produto);
        }

        setIsEditing(false);
        setProduto({});
    };

    const removerProduto = () => {
        if (window.confirm("Deseja realmente remover este produto?")) {
            props.onRemove(produto)
        }
    }

    return (
        <div id="componente3">
            <div className="componentHeader">
                <h1 className="componentTitle" id="tituloProduto">Novo Produto</h1>
                <Link to="/produto">
                    <button id="btnRemov" className="button primary" onClick={ removerProduto }>
                        <img src="../assets/delete.png" alt="Remover Produto"/>
                    </button>
                </Link>
            </div>

            <div className="componentContent">
                <div className="field mt1">
                    <label className="fifth">Nome</label>
                    <input type="text" autoComplete="off" id="descricao" defaultValue={ produto.descricao } onChange={ (e) => produto.descricao = e.target.value }/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Marca</label>
                    <input type="text" autoComplete="off" id="marca" defaultValue={ produto.marca } onChange={ (e) => produto.marca = e.target.value }/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Última compra</label>
                    <input type="date" autoComplete="off" id="ultimaCompra" defaultValue={ produto.ultimaCompra  } onChange={ (e) => produto.ultimaCompra = e.target.value }/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Periodicidade da compra</label>
                    <select name="selectPeriodicidade" defaultValue={ produto.periodicidade } onChange={ (e) => produto.periodicidade = e.target.value }>
                        <option value="semanal">Semanal</option>
                        <option value="quinzenal">Quinzenal</option>
                        <option value="mensal">Mensal</option>
                    </select>
                </div>
                <div className="field mt1">
                    <label className="fifth">Último valor pago</label>
                    <input type="number" autoComplete="off" id="ultimoValorPago" defaultValue={ produto.preco } onChange={ (e) => produto.preco = e.target.value }/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Tipo da quantidade</label>
                    <select name="selectTpQuantidade" defaultValue={ produto.tpQuantidade } onChange={ (e) => produto.tpQuantidade = e.target.value }> 
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
                    <input type="number" autoComplete="off" id="quantidade" defaultValue={ produto.quantidade } onChange={ (e) => produto.quantidade = e.target.value }/>
                </div>
                <div id="divGraficosProduto" className={ isEditing ? "mt1" : "mt1 hidden"}>
                    <canvas id="chartHistoricoProduto"></canvas>
                </div>
            </div>
             
            <div className="formButtonGroup mb1 mr1">
                <Link id="btnCancelarForm" to="/produto">
                    <button className="button light half">Cancelar</button>
                </Link>
                <Link id="btnSalvarProduto" to="/produto">
                    <button id="salvarProduto" className="button primary half ml1" onClick={ salvarProduto }>Salvar</button>
                </Link>
            </div>
        </div>
    );
}

export default ProdutoFormulario;