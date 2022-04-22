import React, { useState, useEffect } from "react";
import ListaCompras from './componentes/ListaCompras';
import Produto from "./componentes/Produto";
import ProdutoFormulario from "./componentes/ProdutoFormulario";
import Cabecalho from "./componentes/Cabecalho";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import moment from 'moment';

const App = () =>  {

  /** Funções de manipulação dos produtos **/
  let produtosLocalStorage = JSON.parse(localStorage.getItem("produtos"));
  if (!produtosLocalStorage) produtosLocalStorage = [];
  const [produtos, setProdutos] = useState(produtosLocalStorage);
  
  const adicionaProduto = (produto) => {
    let novoArrayProdutos = [...produtos, produto];
    setProdutos(novoArrayProdutos);
    validarProdutosSugeridos(novoArrayProdutos, produtosFaltantes);
  }

  const alteraProduto = (produto) => {
    let produtoInserido = produtos.filter(prod => removerCaracteresEspeciais(prod.descricao) == removerCaracteresEspeciais(produto.descricao));
    let i = produtos.indexOf(produtoInserido);
    
    const novoArrayProdutos = [...produtos];
    novoArrayProdutos[i] = produto;
    setProdutos(novoArrayProdutos);
    validarProdutosSugeridos(novoArrayProdutos, produtosFaltantes);
  };

  const removeProduto = (p) => {
    let novoArrayProdutos = produtos.filter((produto) => produto.id !== p.id);
    setProdutos(novoArrayProdutos);
    validarProdutosSugeridos(novoArrayProdutos, produtosFaltantes);
  }

  /** retorna um produto a partir do id **/
  const buscaProduto = (id) => { return produtos.filter((p) => p.id == id) };

  /** Funções de manipulação dos produtos faltantes **/
  let prodFaltantesLocalStorage = JSON.parse(localStorage.getItem("produtosFaltantes"));
  if (!prodFaltantesLocalStorage) prodFaltantesLocalStorage = [];
  const [produtosFaltantes, setProdutosFaltantes] = useState(prodFaltantesLocalStorage);

  const adicionaProdutoFaltante = (p) => {
    let prodFaltante = [...produtosFaltantes, p];
    setProdutosFaltantes([...produtosFaltantes, p])
    validarProdutosSugeridos(produtos, prodFaltante);
  };

  const removeProdutoFaltante = (p) => {
    let prodFaltante = produtosFaltantes.filter((produto) => produto.id !== p.id);
    setProdutosFaltantes(prodFaltante)
    validarProdutosSugeridos(produtos, prodFaltante);
  }

  /** atualiza os produtos e finaliza uma lista de compras **/
  const finalizarListaCompras = () => {
    let produtosAtualizados = produtos;
    let prodFaltante = [];

    produtosAtualizados.filter(produto => produto.acabou).forEach((produto) => {
      produto.acabou = false
      produto.ultimaCompra = moment().format('YYYY-MM-DD');
      if(!produto.historicoCompras) {
        produto.historicoCompras = [
          ['Mês', 'Preço'],
          ['Jan', 0], ['Fev', 0], ['Mar', 0],
          ['Abr', 0], ['Mai', 0], ['Jun', 0],
          ['Jul', 0], ['Ago', 0], ['Set', 0],
          ['Out', 0], ['Nov', 0], ['Dez', 0]
        ];
      }
      if(!produto.quantidade) {
        produto.quantidade = 1;
      }
      produto.historicoCompras[parseInt(moment().format('M'))][1] += parseInt(produto.quantidade);
    });

    setProdutos(produtosAtualizados)
    setProdutosFaltantes(prodFaltante)
    validarProdutosSugeridos(produtosAtualizados, []);
  };

  /** Funções de manipulação dos produtos sugeridos **/
  const numeroDiasPeriodicidade = (periodicidade) => {
    switch(periodicidade) {
        case "semanal" : return 7;
        case "quinzenal": return 15;
        case "mensal": return 30;
    }
  }

  /** monta a lista de produtos sugeridos a partir da ultima compra e periodicidade **/
  const montarProdutosSugeridos = (prods, prodFaltante) => {
    let prodSugerido = [];
    if(prods && prods.length > 0) {
      prods.forEach((produto) => {
        let ultimaCompra = new Date(produto.ultimaCompra)
        let timeDiff = Math.abs(new Date() - ultimaCompra);
        let totalDias = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        if(totalDias >= numeroDiasPeriodicidade(produto.periodicidade)
            && prodFaltante.filter(prod => prod.id == produto.id).length == 0) {
            produto.diasUltimaCompra = totalDias;
            prodSugerido.push(produto);
        }
      });
    }

    return prodSugerido;
  }

  let prodSugeridosLocalStorage = JSON.parse(localStorage.getItem("produtosSugeridos"));
  if (!prodSugeridosLocalStorage || prodSugeridosLocalStorage.length == 0) prodSugeridosLocalStorage = montarProdutosSugeridos(produtos, produtosFaltantes);
  const [produtosSugeridos, setProdutosSugeridos] = useState(prodSugeridosLocalStorage);
  
  /** atualiza state dos produtos sugeridos **/
  const validarProdutosSugeridos = (prods, prodFaltante) => {
    setProdutosSugeridos(montarProdutosSugeridos(prods, prodFaltante));
  };

  const adicionaProdutoSugerido = (p) => setProdutosSugeridos([...produtosSugeridos, p]);
  const removeProdutoSugerido = (p) => setProdutosSugeridos(produtosSugeridos.filter((produto) => produto.id !== p.id));

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("produtosFaltantes", JSON.stringify(produtosFaltantes));
    localStorage.setItem("produtosSugeridos", JSON.stringify(produtosSugeridos));
  });

  const removerCaracteresEspeciais = (str) => {
    return !str ? str : str.normalize('NFD').replace(/[^\w\s]/gi, '').trim().toLowerCase();
  }

  /** retorna um id para o produto **/
  const nextId = () => {
    let idMax = 0;
    for(const prod of produtos) {
      if(prod.id > idMax) {
        idMax = prod.id;
      }
    }

    return idMax;
  }

  return (
    <div className="app">
      <Cabecalho pendentes={ produtosFaltantes.length } />
      <Router>
        <Switch>
            <Route exact path="/">
              <ListaCompras
                produtosFaltantes={ produtosFaltantes }
                produtosSugeridos={ produtosSugeridos }
                onAlteraProduto={ alteraProduto }
                onFinalizarLista={ finalizarListaCompras }
                onRemoveSugerido={ removeProdutoSugerido }
                onAdicionaFaltante={ adicionaProdutoFaltante }
              />
            </Route>
            <Route exact path="/produto">
              <Produto 
                onAdicionaFaltante={ adicionaProdutoFaltante }
                onRemoveFaltante={ removeProdutoFaltante }
                onAdicionaSugerido= { adicionaProdutoSugerido }
                onRemoveSugerido= { removeProdutoSugerido }
                produtos={ produtos }
              />
            </Route>
            <Route exact path="/produto/novo">
              <ProdutoFormulario
                produto={ {} }
                isEditing={ false }
                nextId = { nextId }
                onAdiciona={ adicionaProduto }
                onRemove={ removeProduto }
              />
            </Route>
            <Route exact path="/produto/:id">
              <ProdutoFormulario
                produto={ {} }
                buscaProduto={ buscaProduto }
                isEditing={ true }
                onAltera={ alteraProduto }
                onRemove={ removeProduto }
              />
            </Route>
        </Switch>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
