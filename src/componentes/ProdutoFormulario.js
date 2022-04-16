import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Produto.css";

const ProdutoFormulario = (props) => {    
    const [produto, setProduto] = useState(props.produto ? props.produto : {});
    const [isEditing, setIsEditing ] = useState(props.isEditing);
    const [exibirImg, setExibirImg ] = useState(false);
    
    useEffect(() => document.getElementById("img-input").addEventListener("change", readImage, false)); 
    
    const inputChange = (inputName, value) => {
        switch(inputName) {
            case "descricao": 
                produto.descricao = value;
            break;
            case "marca": 
                produto.marca = value;
            break;
            case "ultimaCompra": 
                produto.ultimaCompra = value;
            break;
            case "periodicidade": 
                produto.periodicidade = value;
            break;
            case "preco": 
                produto.preco = value;
            break;
            case "tpQuantidade": 
                produto.tpQuantidade = value;
            break;
            case "quantidade": 
                produto.quantidade = value;
            break;
        }
    }

    const readImage = (event) => {
        if (event && event.target && event.target.files && event.target.files.length > 0) {
            var file = new FileReader();
            file.onload = function(e) {
                document.getElementById("imagem-preview").src = e.target.result;
            };
    
            file.readAsDataURL(event.target.files[0]);
            produto.imagem = toBase64String(document.getElementById("imagem-preview"));
            setExibirImg(true);
        }
    }

    const toBase64String = (imagem) =>  {
        if(imagem instanceof Image && imagem.src != 'data:,') {
            var canvas = document.createElement("canvas");
            canvas.width = imagem.width;
            canvas.height = imagem.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(imagem, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            return dataURL;
        }
    }

    /** Pesquisa produtos faltantes por nome **/
    const salvarProduto = () => {
        if(isEditing) {
            
        } else {
            if (!produto || !produto.descricao) {
                alert("Não é possível inserir um produto sem nome");
                return;
            }

            produto.id = (props.nextId() + 1);
            props.onAdiciona(produto);
        }

        setIsEditing(false);
        setProduto("");
    };

    return (
        <div id="componente3">
            <div className="componentHeader">
                <h1 className="componentTitle" id="tituloProduto">Novo Produto</h1>
                <button id="btnRemov" className="button primary" onClick={ () => props.onRemove(this.produto) }>
                    <img src="../assets/delete.png" alt="Remover Produto"/>
                </button>
            </div>

            <div className="componentContent">
                <div className="field mt1">
                    <label className="fifth">Nome</label>
                    <input type="text" autoComplete="off" id="descricao" value={produto.descricao} onChange={ (e) => inputChange("descricao", e.target.value) }/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Marca</label>
                    <input type="text" autoComplete="off" id="marca" value={produto.marca} onChange={ (e) => inputChange("marca", e.target.value) }/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Última compra</label>
                    <input type="date" autoComplete="off" id="ultimaCompra" value={produto.ultimaCompra} onChange={ (e) => inputChange("ultimaCompra", e.target.value) }/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Periodicidade da compra</label>
                    <select name="select" id="periodicidade" value={produto.periodicidade} onChange={ (e) => inputChange("periodicidade", e.target.value) }>
                        <option value="semanal">Semanal</option>
                        <option value="quinzenal">Quinzenal</option>
                        <option value="mensal">Mensal</option>
                    </select>
                </div>
                <div className="field mt1">
                    <label className="fifth">Último valor pago</label>
                    <input type="number" autoComplete="off" id="ultimoValorPago" value={produto.preco} onChange={ (e) => inputChange("preco", e.target.value) }/>
                </div>
                <div className="field mt1">
                    <label className="fifth">Tipo da quantidade</label>
                    <select name="select" id="tipoQuantidade" value={produto.tpQuantidade} onChange={ (e) => inputChange("tpQuantidade", e.target.value) }> 
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
                    <input type="number" autoComplete="off" id="quantidade" value={produto.quantidade} onChange={ (e) => inputChange("quantidade", e.target.value) }/>
                </div>
                <div id="inputImagemProduto" className="mt1">
                    <input type="file" className="custom-file-input" accept="image/*" id="img-input" onChange={ readImage }/>
                </div>
                <div id="divImagemProduto" className={ !exibirImg ?  "mt1 hidden" : "mt1" }>
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
                <Link id="btnSalvarProduto" to="/produto">
                    <button id="salvarProduto" className="button primary half ml1" onClick={ salvarProduto }>Salvar</button>
                </Link>
            </div>
        </div>
    );
}

export default ProdutoFormulario;