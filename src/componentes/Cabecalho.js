import React from "react";

const Cabecalho = (props) => {
  return (
    <header className="headerBar dark">
      <div className="appName">SuperLista</div>
      <div className="badge warning badgeProdutos">{ props.pendentes + " produto(s) faltante(s)"}</div>
    </header>
  );
};

export default Cabecalho;