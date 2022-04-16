import React, { useState, useEffect } from "react";
import ListaCompras from './componentes/ListaCompras';
import Produto from "./componentes/Produto";
import ProdutoFormulario from "./componentes/ProdutoFormulario";
import Cabecalho from "./componentes/Cabecalho";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";

const App = () =>  {
  /** Funções de manipulação dos produtos faltantes **/
  let prodFaltantesLocalStorage = JSON.parse(localStorage.getItem("produtosFaltantes"));
  if (!prodFaltantesLocalStorage) prodFaltantesLocalStorage = [];
  const [produtosFaltantes, setProdutosFaltantes] = useState(prodFaltantesLocalStorage);

  const adicionaProdutoFaltante = (p) => setProdutosFaltantes([...produtosFaltantes, p]);
  const removeProdutoFaltante = (p) => setProdutosFaltantes(produtosFaltantes.filter((produto) => produto.id !== p.id));

   /** Funções de manipulação dos produtos sugeridos **/
   let prodSugeridosLocalStorage = JSON.parse(localStorage.getItem("produtosSugeridos"));
   if (!prodSugeridosLocalStorage) prodSugeridosLocalStorage = [];
   const [produtosSugeridos, setProdutosSugeridos] = useState(prodSugeridosLocalStorage);
 
   const adicionaProdutoSugerido = (p) => setProdutosSugeridos([...produtosSugeridos, p]);
   const removeProdutoSugerido = (p) => setProdutosSugeridos(produtosSugeridos.filter((produto) => produto.id !== p.id));
   
   /** Funções de manipulação dos produtos **/
   let produtosLocalStorage = JSON.parse(localStorage.getItem("produtos"));
   if (!produtosLocalStorage) produtosLocalStorage = [];
   const [produtos, setProdutos] = useState(produtosLocalStorage);
  
  const adicionaProduto = (produto) => setProdutos([...produtos, produto]);
  const alteraProduto = (produto) => {
    let produtoInserido = produtos.filter(prod => removerCaracteresEspeciais(prod.descricao) == removerCaracteresEspeciais(produto.descricao));

    const i = produtos.indexOf(produtoInserido);
    const novoArrayProdutos = [...produtos];
    novoArrayProdutos[i] = produto;
    setProdutos(novoArrayProdutos);
  };

  const removeProduto = (p) => setProdutos(produtos.filter((produto) => produto.id !== p.id));

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    localStorage.setItem("produtosFaltantes", JSON.stringify(produtosFaltantes));
    localStorage.setItem("produtosSugeridos", JSON.stringify(produtosSugeridos));
  });

  const removerCaracteresEspeciais = (str) => {
    return str.normalize('NFD').replace(/[^\w\s]/gi, '').trim().toLowerCase();
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
              <ListaCompras/>
            </Route>
            <Route exact path="/produto">
              <Produto 
                onAdicionaFaltante={ adicionaProdutoFaltante }
                onRemoveFaltante={ removeProdutoFaltante }
                produtos={ produtos }
              />
            </Route>
            <Route exact path="/produto/novo">
              <ProdutoFormulario
                produto={ {} }
                isEditing={ false }
                nextId = { nextId }
                onAdiciona={ adicionaProduto }
                onAltera={ alteraProduto }
                onRemove={ removeProduto }
              />
            </Route>
            <Route exact path="/produto/:id">
              <ProdutoFormulario/>
            </Route>
        </Switch>
        <Navbar />
      </Router>
    </div>
  );
}

export default App;
