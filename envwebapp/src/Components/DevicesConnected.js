import React from "react";
import style from "./DevicesConnected.module.css";

function colorStatus(status) {
  if (status === "Online") {
    return <b style={{ color: "green", fontSize: 25 }}>{status}</b>;
  } else if (status === "Offline") {
    return <b style={{ color: "red", fontSize: 25 }}>{status}</b>;
  } else {
    return <b style={{ color: "yellow", fontSize: 25 }}>{status}</b>;
  }
}
function logAccess() {
  file = fopen("amf.log", 0);
  str = fread(file, flength(file));
  return str;
}
function DevicesConnected(props) {
  return (
    <div className={style.DevicesStatus}>
      {/*Devices Connected: {colorStatus(props.Status)}*/}
      {props.Title} Devics Connected: {logAccess()}
    </div>
  );
}
export default DevicesConnected;
