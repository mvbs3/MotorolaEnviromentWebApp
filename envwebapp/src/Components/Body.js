import React, {useState}  from "react";
import style from './Body.module.css'
import EnviromentDetail from "./EnviromentDetail";

function Body(){
    const [status5g,setStatus5g] = useState({"AMF":"Offline", "SMF":"Offline", "UPF":"Offline",
     "NRF":"Offline", "UDM":"Offline", "UDR":"Offline", "AUSF":"Offline", "MYSQL":"Offline"})
    const set5gGeneralStatus = ()=>{
        
    }
return(
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
                    Title = "4g Enviroment"
                    Status = "Offline"
                />
                <EnviromentDetail
                    Title = "5g Enviroment"
                    Status = "Offline"
                />
                <EnviromentDetail
                    Title = "OAI Gnb"
                    Status = "Offline"
                />
            </div>
        </div>
    </div>
)
}

export default Body;