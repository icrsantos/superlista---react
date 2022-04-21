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
  
  const adicionaProduto = (produto) => setProdutos([...produtos, produto]);
  const alteraProduto = (produto) => {
    let produtoInserido = produtos.filter(prod => removerCaracteresEspeciais(prod.descricao) == removerCaracteresEspeciais(produto.descricao));
    let i = produtos.indexOf(produtoInserido);
    
    const novoArrayProdutos = [...produtos];
    novoArrayProdutos[i] = produto;
    setProdutos(novoArrayProdutos);
  };

  const removeProduto = (p) => setProdutos(produtos.filter((produto) => produto.id !== p.id));
  const buscaProduto = (id) => { return produtos.filter((p) => p.id == id) };

  /** Funções de manipulação dos produtos faltantes **/
  let prodFaltantesLocalStorage = JSON.parse(localStorage.getItem("produtosFaltantes"));
  if (!prodFaltantesLocalStorage) prodFaltantesLocalStorage = [];
  const [produtosFaltantes, setProdutosFaltantes] = useState(prodFaltantesLocalStorage);

  const adicionaProdutoFaltante = (p) => {
    let prodFaltante = [...produtosFaltantes, p];
    setProdutosFaltantes([...produtosFaltantes, p])
    validarProdutosSugeridos(prodFaltante);
  };

  const removeProdutoFaltante = (p) => {
    let prodFaltante = produtosFaltantes.filter((produto) => produto.id !== p.id);
    setProdutosFaltantes(prodFaltante)
    validarProdutosSugeridos(prodFaltante);
  }

  const finalizarListaCompras = () => {
    let produtosAtualizados = produtos
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
    setProdutosFaltantes([]);
    validarProdutosSugeridos([]);
  };

  /** Funções de manipulação dos produtos sugeridos **/
  const numeroDiasPeriodicidade = (periodicidade) => {
    switch(periodicidade) {
        case "semanal" : return 7;
        case "quinzenal": return 15;
        case "mensal": return 30;
    }
  }

  const montarProdutosSugeridos = (prodFaltante) => {
    let prodSugerido = [];
    if(produtos && produtos.length > 0) {
      produtos.forEach((produto) => {
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
  if (!prodSugeridosLocalStorage || prodSugeridosLocalStorage.length == 0) prodSugeridosLocalStorage = montarProdutosSugeridos(produtosFaltantes);
  const [produtosSugeridos, setProdutosSugeridos] = useState(prodSugeridosLocalStorage);
  
  const validarProdutosSugeridos = (prodFaltante) => {
    setProdutosSugeridos(montarProdutosSugeridos(prodFaltante));
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
