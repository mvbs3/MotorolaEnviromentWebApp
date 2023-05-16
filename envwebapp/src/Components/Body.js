import React from "react";
import style from './Body.module.css'
import EnviromentDetail from "./EnviromentDetail";

function Body(){
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

            </div>
        </div>
    </div>
)
}

export default Body;