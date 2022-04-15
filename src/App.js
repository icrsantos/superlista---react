import React, { useState, useEffect } from "react";
import ListaCompras from './componentes/ListaCompras';
import Produto from "./componentes/Produto";
import ProdutoFormulario from "./componentes/ProdutoFormulario";
import Cabecalho from "./componentes/Cabecalho";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";

const App = () =>  {
  let prodFaltanteLocalStorage = JSON.parse(localStorage.getItem("produtosFaltantes"));
  if (!prodFaltanteLocalStorage) prodFaltanteLocalStorage = [];
  const [produtosFaltantes, setProdutosFaltantes] = useState(prodFaltanteLocalStorage);

  const adicionaProdutoFaltante = (p) => setProdutosFaltantes([...produtosFaltantes, p]);

  return (
    <div className="app">
      <Cabecalho pendentes={ produtosFaltantes.length } />
      <Router>
        <Switch>
            <Route exact path="/">
              <ListaCompras/>
            </Route>
            <Route exact path="/produto">
              <Produto/>
            </Route>
            <Route exact path="/produto/novo">
              <ProdutoFormulario/>
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
