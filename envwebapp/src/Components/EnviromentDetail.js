import React, { useState } from "react";
import style from "./EnviromentDetail.module.css";
import axios from "axios";

const baseUrl = "http://192.168.27.242:5000";
var oai5g = ["AMF", "SMF", "UPF", "NRF", "UDM", "UDR", "AUSF", "MYSQL"];
var open4g = [
  "MME",
  "SGWC",
  "SGWU",
  "UPF",
  "SMF",
  "OSMOMSC",
  "HSS",
  "MONGO",
  "NRF",
  "SCP",
  "OSMOHLR",
  "PCRF,",
  "WEBUI",
];
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function EnviromentDetail(props) {
  const [Status, setStatus] = useState(true);
  const [Status4gActual, setStatus4gActual] = useState({
    MME: "Offline",
    SGWC: "Offline",
    SGWU: "Offline",
    UPF: "Offline",
    SMF: "Offline",
    OSMOMSC: "Offline",
    HSS: "Offline",
    MONGO: "Offline",
    NRF: "Offline",
    SCP: "Offline",
    OSMOHLR: "Offline",
    PCRF: "Offline",
    WEBUI: "Offline",
  });

  const [Status5gActual, setStatus5gActual] = useState({
    AMF: "Offline",
    SMF: "Offline",
    UPF: "Offline",
    NRF: "Offline",
    UDM: "Offline",
    UDR: "Offline",
    AUSF: "Offline",
    MYSQL: "Offline",
  });
  //just paint the colors of the ONLINE or OFFLINE status
  function colorStatus(status) {
    if (status === "Online") {
      return <b style={{ color: "green" }}>{status}</b>;
    } else if (status === "Offline") {
      return <b style={{ color: "red" }}>{status}</b>;
    } else {
      return <b style={{ color: "yellow" }}>{status}</b>;
    }
  }

  function requestStatus(core, status) {
    for (let i = 0; i < 10; i++) {
      console.log(
        //baseUrl + "/" + core.split(" ")[0] + "/" + (Status ? "on" : "off")
        baseUrl + "/" + core.split(" ")[0] + "/" + "Status"
      );
      axios
        .get(baseUrl + "/" + core.split(" ")[0] + "/" + "Status")
        .then((res) => {
          const dados = res.data;
          //console.log(dados);
          set5gGeneralStatus(dados, props.ActualStatus, props.setStatusFunc);

          console.log(dados);
        });
      sleep(5000);
    }
  }
  function requestOnOff(core) {
    setStatus(!Status);
    console.log(
      //baseUrl + "/" + core.split(" ")[0] + "/" + (Status ? "on" : "off")
      baseUrl + "/" + core.split(" ")[0] + "/" + (Status ? "on" : "off")
    );
    axios
      .get(baseUrl + "/" + core.split(" ")[0] + "/" + (Status ? "on" : "off"))
      .then((res) => {
        const dados = res.data;
        console.log(dados);
        set5gGeneralStatus(dados, props.ActualStatus, props.setStatusFunc);

        requestStatus(core, Status);
        console.log(dados);
      });
  }
  const set5gGeneralStatus = (actualStatus, statusBefore, funcSetStatus) => {
    //copiando o dictionary
    //actual5gStatus eh uma lista com 0 e 1 que 0 indica q a funcao de rede ta offline e 1 online atualmente
    let copiaStatus5g = { ...statusBefore };

    Object.keys(copiaStatus5g).map((key, i) => {
      return (copiaStatus5g[key] = (() => {
        if (actualStatus[i] === 0) return "Offline";
        else return "Online";
      })());
    });
    funcSetStatus(copiaStatus5g);
  };
  function coreComponents(core) {
    oai5g = { ...props.ActualStatus };
    open4g = { ...props.ActualStatus };
    if (core === "5g Enviroment") {
      return Object.keys(oai5g).map((key, i) => {
        return (
          <p key={i} className={style.networkFunction}>
            {key}: {colorStatus(oai5g[key])}
          </p>
        );
      });
    } else if (core === "4g Enviroment") {
      return Object.keys(ActualStatus).map((key, i) => {
        return (
          <p key={i} className={style.networkFunction}>
            {key}: {colorStatus(ActualStatus[key])}
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
      <button onClick={() => requestOnOff(props.Title)}>
        {Status ? <>Turn On</> : <>Turn Off</>}
      </button>
    </div>
  );
}

export default EnviromentDetail;
