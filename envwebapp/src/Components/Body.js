import React, { useState } from "react";
import style from "./Body.module.css";
import EnviromentDetail from "./EnviromentDetail";
import DevicesConnected from "./DevicesConnected";

function Body() {
  const [status5g, setStatus5g] = useState("Offline");
  const [status4g, setStatus4g] = useState("Offline");
  const [statusGnbSA, setStatusGnbSA] = useState("Offline");
  const [statusGnbNSA, setStatusGnbNSA] = useState("Offline");
  const [statusEnb, setStatusEnb] = useState("Offline");

  const [statusCore5g, setStatusCore5g] = useState({
    AMF: "Offline",
    SMF: "Offline",
    UPF: "Offline",
    NRF: "Offline",
    UDM: "Offline",
    UDR: "Offline",
    AUSF: "Offline",
    MYSQL: "Offline",
  });

  const [statusCore4g, setStatusCore4g] = useState({
    MME: "Offline",
    SGWC: "Offline",
    SGWU: "Offline",
    UPF: "Offline",
    SMF: "Offline",
    OSMOMSC: "Offline",
    MONGO: "Offline",
    NRF: "Offline",
    SCP: "Offline",
    OSMOHLR: "Offline",
    PCRF: "Offline",
    WEBUI: "Offline",
  });
  function showDevices() {
    if (statusGnbNSA == "Online" && statusGnbSA == "Online") {
      return (
        <div className={style.DevicesBody}>
          <DevicesConnected Status={status4g} setStatus={setStatus4g} />
          <DevicesConnected Status={status5g} setStatus={setStatus5g} />
        </div>
      );
    } else if (statusGnbNSA == "Online") {
      return (
        <div className={style.DevicesBody}>
          <DevicesConnected Status={status5g} setStatus={setStatus5g} />
        </div>
      );
    } else if (statusGnbSA == "Online") {
      return (
        <div className={style.DevicesBody}>
          <DevicesConnected Status={status4g} setStatus={setStatus4g} />
        </div>
      );
    } else {
      return null;
    }
  }
  return (
    <div className={style.body}>
      <div className={style.menu}>
        <nav>
          <button>OAI</button>
          <button>Open5gs</button>
          <button>Statistic</button>
        </nav>
      </div>
      <div className={style.bodyCenter}>
        <h1>OAI 4g/5g enviroment</h1>
        <div className={style.networkFunctions}>
          <EnviromentDetail
            Title="4g Enviroment"
            Status={status4g}
            setStatus={setStatus4g}
            ActualStatus={statusCore4g}
            setStatusActualFunc={setStatusCore4g}
            initialStatus={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
          />
          <EnviromentDetail
            Title="5g Enviroment"
            Status={status5g}
            setStatus={setStatus5g}
            ActualStatus={statusCore5g}
            setStatusActualFunc={setStatusCore5g}
            initialStatus={[0, 0, 0, 0, 0, 0, 0, 0]}
          />
          <EnviromentDetail
            Title="Enb OAI"
            Status={statusEnb}
            setStatus={setStatusEnb}
          />

          <EnviromentDetail
            Title="GnbSA OAI"
            Status={statusGnbSA}
            setStatus={setStatusGnbSA}
          />

          <EnviromentDetail
            Title="GnbNSA OAI"
            Status={statusGnbNSA}
            setStatus={setStatusGnbNSA}
          />
        </div>
        {showDevices()}
      </div>
    </div>
  );
}

export default Body;
