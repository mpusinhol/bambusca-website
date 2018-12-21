import React from 'react';
import LoaderSpinner from 'react-loader-spinner';

const style = {
  zIndex: "99999",
  position: "absolute",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

const Loader = props => (
  <div id="loader" style={style}>
    <h1>Aguarde, estamos buscando os melhores preços para você!</h1>
    <div style={{position: "absolute"}}>
      <LoaderSpinner
        type="Plane"
        color="#346FF1"
        height="200"	
        width="200"
      />
    </div>
  </div>
);

export default Loader;