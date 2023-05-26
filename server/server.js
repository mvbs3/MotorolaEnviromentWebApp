const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const port = 5000;
const { exec } = require('node:child_process')
const subtitles5g = ["oai-amf", "oai-smf", "oai-spgwu", "oai-nrf", "oai-udm", "oai-udr", "oai-ausf", "mysql"];;
const base5gJson = [0, 0, 0, 0, 0, 0, 0, 0]
var generalOutput;

function check5gStatus(output) {
  var status5g = [...base5gJson]
  // Essa funcao passa pelo nome de todas as funcoes da rede (um for dentro de subtitles 5g.map)
  //SE existir alguma linha que tenha o nome dessa funcao no comando "docker ps" ele checa se nessa linha esta escrito healthy
  // SE tiver healthy significa q a funcao esta pronta e pode ser usada.
  subtitles5g.map(func5g =>{
    console.log(func5g)
      output.map((outputLine)=> {
      console.log(outputLine.indexOf(func5g) != -1 && outputLine.includes("healthy") == true)
      if (outputLine.indexOf(func5g) != -1 && outputLine.includes("healthy") == true) {
         status5g[subtitles5g.indexOf(func5g)] =1
         console.log(status5g)
        } 
      }
    )
  }
  )
  return status5g
}

function resultTerminal(err,output){
// once the command has completed, the callback function is called
  if (err) {
    // log and return if we encounter an error
    console.error("could not execute command: ", err)
    return
}
// log the output received from the command
console.log("Output:,\n", output.split("\n"))
output = output.split("\n")
generalOutput = check5gStatus(output)
}

app.get("/5g", (req, res) => {
  generalOutput = [...base5gJson]
  // run the `ls` command using exec
  exec('docker ps', resultTerminal)
  res.json(generalOutput);
});

app.listen(port, () => {
  console.log("Server started at port ", { port });
});
