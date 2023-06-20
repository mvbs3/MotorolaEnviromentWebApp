import React, { useState, useEffect } from "react";
import style from "./EnviromentDetail.module.css";
import axios from "axios";

const baseUrl = "http://192.168.27.242:5000";
var oai5g;
var open4g;

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function EnviromentDetail(props) {
  var dados;

  const [Status, setStatus] = useState(true);
  useEffect(() => {
   
    var statusIntCopy = []
    var statusStringCopy = {...props.ActualStatus}
    Object.keys(statusStringCopy).map((key,i) => {
      if(statusStringCopy[key] === "Online"){
        statusIntCopy.push(1)
      }else if (statusStringCopy[key] === "Offline"){
        statusIntCopy.push(0)
      }
    })
    console.log("DADOS ",statusIntCopy);
    var flag = 0;
    //false = ligado
    if (
      Status === false &&
      props.Title === "5g Enviroment" &&
      JSON.stringify(statusIntCopy) !== JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1])
    ) {
      flag = 1;
      requestStatus(props.Title);
      sleep(1000);
    } else if (
      Status === true &&
      props.Title === "5g Enviroment" &&
      JSON.stringify(statusIntCopy) !== JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0])
    ) {
      flag = 1;
      requestStatus(props.Title);
      sleep(1000);
      //para o 4g esta quebrado
    } else if (
      Status === false &&
      props.Title === "4g Enviroment" &&
      JSON.stringify(statusIntCopy) !==
        JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    ) {
      flag = 1;
      requestStatus(props.Title);
      sleep(1000);
    } else if (
      Status === true &&
      props.Title === "4g Enviroment" &&
      JSON.stringify(statusIntCopy) !==
        JSON.stringify([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    ) {
      flag = 1;
      requestStatus(props.Title);
      sleep(1000);
     } else if (flag == 1) {
      requestStatus(props.Title);
      flag = 0;
    }
    //for (let i =0; i<10; i++){

    console.log("useEffect");
  });

  //just paint the colors of the ONLINE or OFFLINE status
  function colorStatus(status) {
    if (status === "Online") {
      return <b style={{ color: "green", fontSize: 25 }}>{status}</b>;
    } else if (status === "Offline") {
      return <b style={{ color: "red", fontSize: 25 }}>{status}</b>;
    } else {
      return <b style={{ color: "yellow", fontSize: 25 }}>{status}</b>;
    }
  }

  function requestStatus(core, status) {
    console.log(
      //baseUrl + "/" + core.split(" ")[0] + "/" + (Status ? "on" : "off")
      baseUrl + "/" + core.split(" ")[0] + "/" + "Status"
    );
    axios
      .get(baseUrl + "/" + core.split(" ")[0] + "/" + "Status")
      .then((res) => {
        dados = res.data;
        //console.log(dados);
        set5gGeneralStatus(
          dados,
          props.ActualStatus,
          props.setStatusActualFunc
        );

        console.log(dados);
      });
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
        set5gGeneralStatus(
          dados,
          props.ActualStatus,
          props.setStatusActualFunc
        );
        requestStatus(core, Status);
        console.log(dados);
      });
  }
  const set5gGeneralStatus = (actualStatus, statusBefore = [], funcSetStatus = (()=> [])) => {
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
      return Object.keys(props.ActualStatus).map((key, i) => {
        return (
          <p key={i} className={style.networkFunction}>
            {key}: {colorStatus(props.ActualStatus[key])}
          </p>
        );
      });
    } else if (core === "4g Enviroment") {
      return Object.keys(props.ActualStatus).map((key, i) => {
        return (
          <p key={i} className={style.networkFunction}>
            {key}: {colorStatus(props.ActualStatus[key])}
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
