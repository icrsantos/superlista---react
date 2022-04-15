import React from "react";

const Cabecalho = (props) => {
  return (
    <header className="headerBar dark">
      <div className="appName">SuperLista</div>
      <div className="badge warning">{ props.pendentes }</div>
    </header>
  );
};

export default Cabecalho;