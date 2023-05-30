const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const port = 5000;
const { exec } = require("node:child_process");
const execSync = require('child_process').execSync;

const subtitles5g = [
  "oai-amf",
  "oai-smf",
  "oai-spgwu",
  "oai-nrf",
  "oai-udm",
  "oai-udr",
  "oai-ausf",
  "mysql",
];
const base5gJson = [0, 0, 0, 0, 0, 0, 0, 0];
const base4gJson = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var generalOutput=[];
var status5g =[]

function check5gStatus(output) {
  var status5g = [...base5gJson];
  // Essa funcao passa pelo nome de todas as funcoes da rede (um for dentro de subtitles 5g.map)
  //SE existir alguma linha que tenha o nome dessa funcao no comando "docker ps" ele checa se nessa linha esta escrito healthy
  // SE tiver healthy significa q a funcao esta pronta e pode ser usada.
  subtitles5g.map((func5g) => {
    //console.log(func5g);
    output.map((outputLine) => {
      //console.log(
      //  outputLine.indexOf(func5g) != -1 &&
      //    outputLine.includes("healthy") == true
      //);
      if (
        outputLine.indexOf(func5g) != -1 &&
        outputLine.includes("healthy") == true
      ) {
        status5g[subtitles5g.indexOf(func5g)] = 1;
        //console.log(status5g);
      }
    });
  });
  //console.log(status5g)
  return status5g;
}

function resultTerminal(err, output) {
  // once the command has completed, the callback function is called
  if (err) {
    // log and return if we encounter an error
    console.error("could not execute command: ", err);
    return;
  }
  // log the output received from the command
  console.log("Output:,\n", output.split("\n"));
  output = output.split("\n");
   
  return check5gStatus(output);
}

app.get("/5g/on", (req, res) => {
  generalOutput = [...base5gJson];
  // run the `ls` command using exec
  exec("docker compose -f /home/serverthree/oai-sdr-cin/oai-cn5g-fed/docker-compose/docker-compose-basic-nrf.yaml up", resultTerminal);
  exec("docker ps", resultTerminal);

  res.json(generalOutput);
  
});

app.get("/5g/off", (req, res) => {
  generalOutput = [...base5gJson];
  // run the `ls` command using exec
  exec("docker compose -f /home/serverthree/oai-sdr-cin/oai-cn5g-fed/docker-compose/docker-compose-basic-nrf.yaml down", resultTerminal);
  exec("docker ps", resultTerminal);
  res.json(generalOutput);
});

app.get("/5g/Status", (req, res) => {
  generalOutput = [...base5gJson];
  // run the `ls` command using exec
  const output = execSync('docker ps', { encoding: 'utf-8' }); 

  generalOutput =check5gStatus(output.split("\n"))
  //console.log(generalOutput)
  console.log("general output: ",output)
  console.log("status5g: ",generalOutput)
  res.json(generalOutput);
});

app.get("/4g/on", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  exec("docker ps", resultTerminal);
  res.json(generalOutput);
});

app.get("/4g/off", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  exec("docker ps", resultTerminal);
  res.json(generalOutput);
});

app.get("/4g/Status", (req, res) => {
  generalOutput = [...base4gJson];
  // run the `ls` command using exec
  exec("docker ps", resultTerminal);
  res.json(generalOutput);
});

app.listen(port, () => {
  console.log("Server started at port ", { port });
});
