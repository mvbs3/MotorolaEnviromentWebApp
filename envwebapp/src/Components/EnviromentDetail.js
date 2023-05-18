import React from "react";
import style from "./EnviromentDetail.module.css";

function EnviromentDetail(props) {
  function colorStatus(status) {
    if (status === "Online") {
      return <b style={{ color: "green" }}>{status}</b>;
    } else if (status === "Offline") {
      return <b style={{ color: "red" }}>{status}</b>;
    } else {
      return <b style={{ color: "yellow" }}>{status}</b>;
    }
  }

  const set5gGeneralStatus = (actualStatus, statusBefore, funcSetStatus) => {
    //copiando o dictionary
    //actual5gStatus eh uma lista com 0 e 1 que 0 indica q a funcao de rede ta offline e 1 online atualmente
    let copiaStatus5g = { ...statusBefore };

    Object.keys(copiaStatus5g).map((key, i) => {
      copiaStatus5g[key] = (() => {
        if (actualStatus[i] === 0) return "Offline";
        else return "Online";
      })();
    });

    funcSetStatus(copiaStatus5g);
  };
  function coreComponents(core) {
    var oai5g = ["AMF", "SMF", "UPF", "NRF", "UDM", "UDR", "AUSF", "MYSQL"];
    oai5g = { ...props.ActualStatus };

    if (core === "5g Enviroment") {
      return Object.keys(oai5g).map((key, i) => {
        return (
          <p className={style.networkFunction}>
            {key}: {colorStatus(oai5g[key])}
          </p>
        );
      });
    }
  }
  return (
    <div className={style.enviromentBlock}>
      <h1>{props.Title}</h1>
      <p>Status: {colorStatus(props.Status)}</p>
      <div className="">{coreComponents(props.Title)}</div>
      <button
        onClick={() =>
          set5gGeneralStatus(
            props.ComponentStatus,
            props.ActualStatus,
            props.setStatusFunc
          )
        }
      >
        {(() => {
          if (props.Status === "Online") {
            return <>Turn Off</>;
          } else {
            return <>Turn On</>;
          }
        })()}
      </button>
    </div>
  );
}

export default EnviromentDetail;
