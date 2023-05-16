import React from "react";
import style from "./EnviromentDetail.module.css"

function EnviromentDetail(props){
    function colorStatus(status){
        if(status === "Online"){
          return(
                <b style={{color:"green"}}>
                {status}
                </b>
            )
        }else if(status === "Offline"){
            return(
                <b style={{color:"red"}}>
                    {status}
                </b>
            )
        }else{
            return(
                <b style={{color:"yellow"}}>
                    {status}
                </b>
            )
        }
    }
    
    function coreComponents(core){
        var oai5g = ["AMF", "SMF", "UPF", "NRF", "UDM", "UDR", "AUSF", "MYSQL"]
        if(core === "5g Enviroment"){
           return(
            oai5g.map(item => {
                return <p className={style.networkFunction}>{item}: </p>;
              })
           ) 
        }
    }
    return (
        <div className = {style.enviromentBlock} >
            <h1>{props.Title}</h1>
            <p>Status: {colorStatus(props.Status)}</p>
            <div>{coreComponents(props.Title)}</div>
        </div>
        
        
    )
};

export default EnviromentDetail;