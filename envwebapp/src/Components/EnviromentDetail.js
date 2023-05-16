import React from "react";

function EnviromentDetail(props){
    function colorStatus(status){
        if(status === "Online"){
            <b style={{color:"green"}}>
                {status}
            </b>
        }else if(status === "Offline"){
            <b style={{color:"red"}}>
                {status}
            </b>
        }else{
            <b style={{color:"yellow"}}>
                {status}
            </b>
        }
    }
    return (
        <>
        <h1>{props.Title}</h1>
        <p>Status:{colorStatus(props.Title)}</p>
        </>
    )
};

export default EnviromentDetail;